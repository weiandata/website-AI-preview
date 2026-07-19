import path from "node:path";
import matter from "gray-matter";
import type {
  List,
  ListItem,
  PhrasingContent,
  Root,
  RootContent,
} from "mdast";
import { unified } from "unified";
import remarkParse from "remark-parse";
import type {
  LocalizedText,
  LocalizedTextList,
  SkillChangelog,
  SkillFaq,
} from "@/types/content";
import {
  skillFrontmatterSchema,
  type SkillDocument,
  type SkillFrontmatter,
} from "./schema";

const requiredSections = [
  "Description",
  "Long Description",
  "Features",
  "Use Cases",
  "Installation",
  "Usage",
  "Workflow",
  "Changelog",
  "FAQ",
] as const;

type ErrorDetails = {
  fileName: string;
  field?: string;
  section?: string;
  line?: number;
};

/** One problem in a Skill file, described well enough to fix without guessing. */
export type SkillContentIssue = {
  message: string;
  /** Chinese guidance naming the exact edit that resolves the problem. */
  hint: string;
  field?: string;
  section?: string;
  line?: number;
};

/**
 * A validation failure carrying *every* problem found in the file. Parsing
 * collects issues rather than stopping at the first one, so an administrator
 * can repair the whole file in a single pass instead of re-importing after
 * each fix.
 */
export class SkillContentError extends Error {
  fileName: string;
  field?: string;
  section?: string;
  line?: number;
  issues: SkillContentIssue[];

  constructor(message: string, details: ErrorDetails);
  constructor(fileName: string, issues: SkillContentIssue[]);
  constructor(
    messageOrFileName: string,
    detailsOrIssues: ErrorDetails | SkillContentIssue[],
  ) {
    const aggregate = Array.isArray(detailsOrIssues);
    const fileName = aggregate ? messageOrFileName : detailsOrIssues.fileName;
    const issues: SkillContentIssue[] = aggregate
      ? detailsOrIssues
      : [
          {
            message: messageOrFileName,
            hint: hintFor(messageOrFileName, detailsOrIssues),
            field: detailsOrIssues.field,
            section: detailsOrIssues.section,
            line: detailsOrIssues.line,
          },
        ];
    super(
      issues.length > 1
        ? `${fileName}: 发现 ${issues.length} 个问题\n${issues
            .map((issue, index) => `${index + 1}. ${describeIssue(issue)}`)
            .join("\n")}`
        : `${fileName}: ${issues[0]?.message ?? "invalid Skill file"}`,
    );
    this.name = "SkillContentError";
    this.fileName = fileName;
    this.issues = issues;
    // The first issue stays on the error itself so single-problem callers and
    // the existing API shape keep working unchanged.
    this.field = issues[0]?.field;
    this.section = issues[0]?.section;
    this.line = issues[0]?.line;
  }
}

/** Renders one issue as a single line: where it is, what is wrong, how to fix it. */
export function describeIssue(issue: SkillContentIssue): string {
  const where = [
    issue.line ? `第 ${issue.line} 行` : undefined,
    issue.section ? `区块「${issue.section}」` : undefined,
    issue.field ? `字段 ${issue.field}` : undefined,
  ].filter(Boolean);
  const location = where.length ? `${where.join(" · ")}：` : "";
  return `${location}${issue.message}${issue.hint ? ` — ${issue.hint}` : ""}`;
}

/** Field-specific repair instructions; zod's own wording is too terse to act on. */
const fieldHints: Record<string, string> = {
  schemaVersion: "写成 schemaVersion: 1",
  status: "只能是 draft 或 published",
  slug: "只能用小写字母、数字和连字符，例如 my-skill，并且要和文件名一致",
  name: "填写英文名称，不能为空",
  nameZh: "填写中文名称，不能为空",
  category:
    "只能是 development、data-analytics、research-writing、content-creation、automation、image-design、files-pdf、productivity 之一",
  tags: "写成字符串数组，例如 tags: [\"a\", \"b\"]，每项不能为空",
  platforms: "写成字符串数组，例如 platforms: [\"claude-code\"]，每项不能为空",
  author: "填写作者名，不能为空",
  version: "填写版本号，例如 1.0.0",
  license: "填写许可证，例如 MIT",
  addedAt: "使用 YYYY-MM-DD 格式的日期",
  updatedAt: "使用 YYYY-MM-DD 格式的日期",
  githubUrl: "填写完整网址（含 https://）或留空字符串",
  officialUrl: "填写完整网址（含 https://）或留空字符串",
  downloadUrl: "填写完整网址（含 https://）或留空字符串",
  featured: "写成 true 或 false",
  featuredRank: "写成 0 或正整数",
  verified: "写成 true 或 false",
  icon: "只能是 analysis、automation、code、document、image、productivity、research、writing 之一",
  stars: "写成 0 或正整数",
  downloads: "写成 0 或正整数",
};

const sectionHints: Record<string, string> = {
  Description: "该区块需要 ## zh 和 ## en 两个子标题，各自写一段非空文字",
  "Long Description": "该区块需要 ## zh 和 ## en 两个子标题，各自写一段非空文字",
  Usage: "该区块需要 ## zh 和 ## en 两个子标题，各自写一段非空文字",
  Features: "该区块需要 ## zh 和 ## en，每个下面各写一个以 - 开头的无序列表",
  "Use Cases": "该区块需要 ## zh 和 ## en，每个下面各写一个以 - 开头的无序列表",
  Workflow: "该区块需要 ## zh 和 ## en，每个下面各写一个以 1. 开头的有序列表",
  Installation: "该区块只能放 bash 代码块（三个反引号加 bash 开头），不能有正文段落",
  Changelog:
    "每条用 ## 版本 | YYYY-MM-DD 作标题，下面再写 ### zh 和 ### en",
  FAQ: "每条用 ## 任意标题，下面写 ### question.zh、### question.en、### answer.zh、### answer.en 四个子标题",
};

function hintFor(message: string, details: Omit<ErrorDetails, "fileName">): string {
  if (details.field) {
    // Nested paths such as `tags.0` still point at their top-level field.
    const root = details.field.split(".")[0];
    if (fieldHints[root]) return fieldHints[root];
  }
  if (details.section && sectionHints[details.section]) {
    return sectionHints[details.section];
  }
  if (message.includes("unknown top-level section")) {
    return `顶级标题只能是：${requiredSections.join("、")}，请删除或改名`;
  }
  if (message.includes("missing top-level section")) {
    return "补上这个一级标题（# 标题）及其内容";
  }
  return "对照 content/skill-template.md 修正这一处";
}

function nodeText(node: RootContent | PhrasingContent | ListItem): string {
  if ("value" in node && typeof node.value === "string") return node.value;
  if ("children" in node) {
    return node.children.map((child) => nodeText(child)).join("");
  }
  return "";
}

function errorAt(
  message: string,
  fileName: string,
  node?: RootContent,
  details: Omit<ErrorDetails, "fileName" | "line"> = {},
): never {
  throw new SkillContentError(message, {
    fileName,
    line: node?.position?.start.line,
    ...details,
  });
}

function splitByHeading(
  nodes: RootContent[],
  depth: number,
  fileName: string,
  section: string,
): Map<string, RootContent[]> {
  const result = new Map<string, RootContent[]>();
  let current: string | undefined;

  for (const node of nodes) {
    if (node.type === "heading" && node.depth === depth) {
      current = nodeText(node).trim();
      if (!current || result.has(current)) {
        errorAt(`duplicate or empty heading "${current ?? ""}"`, fileName, node, {
          section,
        });
      }
      result.set(current, []);
      continue;
    }
    if (!current) {
      errorAt(`content appears before the first level-${depth} heading`, fileName, node, {
        section,
      });
    }
    result.get(current)!.push(node);
  }
  return result;
}

/** Turns a caught parsing failure into issues on the shared collector. */
function collectIssues(issues: SkillContentIssue[], error: unknown): void {
  if (error instanceof SkillContentError) {
    issues.push(...error.issues);
    return;
  }
  throw error;
}

/**
 * Splits the document into its level-one sections, reporting every unknown and
 * every missing section at once. Returns undefined only when the heading
 * structure is too broken to attribute later problems to a section.
 */
function splitLevelOneSections(
  root: Root,
  fileName: string,
  issues: SkillContentIssue[],
): Map<string, RootContent[]> | undefined {
  let sections: Map<string, RootContent[]>;
  try {
    sections = splitByHeading(root.children, 1, fileName, "document");
  } catch (error) {
    collectIssues(issues, error);
    return undefined;
  }
  const expected = new Set<string>(requiredSections);
  for (const section of sections.keys()) {
    if (!expected.has(section)) {
      issues.push({
        message: `unknown top-level section "${section}"`,
        hint: `顶级标题只能是：${requiredSections.join("、")}，请删除或改名`,
        section,
      });
    }
  }
  for (const section of requiredSections) {
    if (!sections.has(section)) {
      issues.push({
        message: `missing top-level section "${section}"`,
        hint: sectionHints[section] ?? "补上这个一级标题（# 标题）及其内容",
        section,
      });
    }
  }
  return sections;
}

function textFromNodes(nodes: RootContent[]): string {
  return nodes
    .map((node) => nodeText(node).trim())
    .filter(Boolean)
    .join("\n\n");
}

function readLocalizedText(
  nodes: RootContent[],
  fileName: string,
  section: string,
): LocalizedText {
  const languages = splitByHeading(nodes, 2, fileName, section);
  const unknown = [...languages.keys()].filter(
    (language) => language !== "zh" && language !== "en",
  );
  if (unknown.length || !languages.has("zh") || !languages.has("en")) {
    throw new SkillContentError("localized section requires exactly zh and en", {
      fileName,
      section,
    });
  }
  const zh = textFromNodes(languages.get("zh")!);
  const en = textFromNodes(languages.get("en")!);
  if (!zh || !en) {
    throw new SkillContentError("localized text cannot be empty", {
      fileName,
      section,
    });
  }
  return { zh, en };
}

function listValues(nodes: RootContent[], fileName: string, section: string): string[] {
  const lists = nodes.filter((node): node is List => node.type === "list");
  if (lists.length !== 1 || nodes.some((node) => node.type !== "list")) {
    throw new SkillContentError("expected exactly one Markdown list", {
      fileName,
      section,
    });
  }
  const values = lists[0].children.map((item) => nodeText(item).trim()).filter(Boolean);
  if (!values.length) {
    throw new SkillContentError("list cannot be empty", { fileName, section });
  }
  return values;
}

function readLocalizedList(
  nodes: RootContent[],
  ordered: boolean,
  fileName: string,
  section: string,
): LocalizedTextList {
  const languages = splitByHeading(nodes, 2, fileName, section);
  if (
    languages.size !== 2 ||
    !languages.has("zh") ||
    !languages.has("en")
  ) {
    throw new SkillContentError("localized list requires exactly zh and en", {
      fileName,
      section,
    });
  }
  for (const language of ["zh", "en"] as const) {
    const list = languages.get(language)?.[0];
    if (list?.type !== "list" || Boolean(list.ordered) !== ordered) {
      throw new SkillContentError(
        `expected an ${ordered ? "ordered" : "unordered"} ${language} list`,
        { fileName, section },
      );
    }
  }
  return {
    zh: listValues(languages.get("zh")!, fileName, section),
    en: listValues(languages.get("en")!, fileName, section),
  };
}

function readInstallation(nodes: RootContent[], fileName: string): string[] {
  if (!nodes.length || nodes.some((node) => node.type !== "code")) {
    throw new SkillContentError("Installation must contain only fenced code blocks", {
      fileName,
      section: "Installation",
    });
  }
  return nodes.map((node) => {
    if (node.type !== "code" || node.lang !== "bash" || !node.value.trim()) {
      errorAt("Installation requires non-empty bash blocks", fileName, node, {
        section: "Installation",
      });
    }
    return node.value.trim();
  });
}

function readChangelog(nodes: RootContent[], fileName: string): SkillChangelog[] {
  const entries = splitByHeading(nodes, 2, fileName, "Changelog");
  if (!entries.size) {
    throw new SkillContentError("Changelog requires at least one entry", {
      fileName,
      section: "Changelog",
    });
  }
  return [...entries].map(([heading, entryNodes]) => {
    const match = /^(.+?)\s*\|\s*(\d{4}-\d{2}-\d{2})$/.exec(heading);
    if (!match) {
      throw new SkillContentError(
        `invalid changelog heading "${heading}"; expected version | YYYY-MM-DD`,
        { fileName, section: "Changelog" },
      );
    }
    const localized = splitByHeading(entryNodes, 3, fileName, "Changelog");
    if (localized.size !== 2 || !localized.has("zh") || !localized.has("en")) {
      throw new SkillContentError("changelog entry requires exactly zh and en", {
        fileName,
        section: "Changelog",
      });
    }
    return {
      version: match[1].trim(),
      date: match[2],
      notes: {
        zh: textFromNodes(localized.get("zh")!),
        en: textFromNodes(localized.get("en")!),
      },
    };
  });
}

function readFaq(nodes: RootContent[], fileName: string): SkillFaq[] {
  const entries = splitByHeading(nodes, 2, fileName, "FAQ");
  if (!entries.size) {
    throw new SkillContentError("FAQ requires at least one entry", {
      fileName,
      section: "FAQ",
    });
  }
  const keys = ["question.zh", "question.en", "answer.zh", "answer.en"] as const;
  return [...entries.values()].map((entryNodes) => {
    const fields = splitByHeading(entryNodes, 3, fileName, "FAQ");
    if (fields.size !== keys.length || keys.some((key) => !fields.has(key))) {
      throw new SkillContentError(
        `FAQ entry requires ${keys.join(", ")}`,
        { fileName, section: "FAQ" },
      );
    }
    return {
      question: {
        zh: textFromNodes(fields.get("question.zh")!),
        en: textFromNodes(fields.get("question.en")!),
      },
      answer: {
        zh: textFromNodes(fields.get("answer.zh")!),
        en: textFromNodes(fields.get("answer.en")!),
      },
    };
  });
}

function normalizeFrontmatterDates(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value instanceof Date ? value.toISOString().slice(0, 10) : value,
    ]),
  );
}

/** Reports every frontmatter problem at once; zod already found them all. */
function parseFrontmatter(
  data: Record<string, unknown>,
  issues: SkillContentIssue[],
): SkillFrontmatter | undefined {
  const result = skillFrontmatterSchema.safeParse(normalizeFrontmatterDates(data));
  if (result.success) return result.data;
  for (const issue of result.error.issues) {
    const field = issue.path.join(".") || undefined;
    issues.push({
      message: issue.message,
      hint: hintFor(issue.message, { field }),
      field,
    });
  }
  return undefined;
}

function optionalUrl(value: string | undefined): string | undefined {
  return value || undefined;
}

export function parseSkillMarkdown(source: string, fileName: string): SkillDocument {
  let parsedMatter: matter.GrayMatterFile<string>;
  try {
    parsedMatter = matter(source);
  } catch (error) {
    throw new SkillContentError(
      error instanceof Error ? error.message : "invalid frontmatter",
      { fileName },
    );
  }
  // Everything below accumulates into `issues` so a single import surfaces the
  // whole repair list, rather than one problem per round trip.
  const issues: SkillContentIssue[] = [];
  const metadata = parseFrontmatter(parsedMatter.data, issues);
  const expectedSlug = path.basename(fileName, path.extname(fileName));
  if (metadata && metadata.slug !== expectedSlug) {
    issues.push({
      message: `slug "${metadata.slug}" does not match filename "${expectedSlug}"`,
      hint: `把 slug 改成 ${expectedSlug}，或把文件重命名为 ${metadata.slug}.md`,
      field: "slug",
    });
  }

  const root = unified().use(remarkParse).parse(parsedMatter.content) as Root;
  const sections = splitLevelOneSections(root, fileName, issues);

  /** Parses one section, recording its failure instead of aborting the rest. */
  const read = <T>(section: string, parse: (nodes: RootContent[]) => T): T | undefined => {
    const nodes = sections?.get(section);
    // A missing section was already reported; do not blame it twice.
    if (!nodes) return undefined;
    try {
      return parse(nodes);
    } catch (error) {
      collectIssues(issues, error);
      return undefined;
    }
  };

  const body = {
    description: read("Description", (nodes) =>
      readLocalizedText(nodes, fileName, "Description"),
    ),
    longDescription: read("Long Description", (nodes) =>
      readLocalizedText(nodes, fileName, "Long Description"),
    ),
    features: read("Features", (nodes) =>
      readLocalizedList(nodes, false, fileName, "Features"),
    ),
    useCases: read("Use Cases", (nodes) =>
      readLocalizedList(nodes, false, fileName, "Use Cases"),
    ),
    installation: read("Installation", (nodes) => readInstallation(nodes, fileName)),
    usage: read("Usage", (nodes) => readLocalizedText(nodes, fileName, "Usage")),
    workflow: read("Workflow", (nodes) =>
      readLocalizedList(nodes, true, fileName, "Workflow"),
    ),
    changelog: read("Changelog", (nodes) => readChangelog(nodes, fileName)),
    faq: read("FAQ", (nodes) => readFaq(nodes, fileName)),
  };

  if (issues.length || !metadata) {
    throw new SkillContentError(fileName, issues);
  }

  return {
    ...metadata,
    id: metadata.slug,
    githubUrl: optionalUrl(metadata.githubUrl),
    officialUrl: optionalUrl(metadata.officialUrl),
    downloadUrl: optionalUrl(metadata.downloadUrl),
    description: body.description!,
    longDescription: body.longDescription!,
    features: body.features!,
    useCases: body.useCases!,
    installation: body.installation!,
    usage: body.usage!,
    workflow: body.workflow!,
    changelog: body.changelog!,
    faq: body.faq!,
  };
}

function localizedTextSection(title: string, value: LocalizedText): string {
  return `# ${title}\n\n## zh\n\n${value.zh}\n\n## en\n\n${value.en}`;
}

function localizedListSection(
  title: string,
  value: LocalizedTextList,
  ordered: boolean,
): string {
  const format = (items: string[]) =>
    items
      .map((item, index) => `${ordered ? `${index + 1}.` : "-"} ${item}`)
      .join("\n");
  return `# ${title}\n\n## zh\n\n${format(value.zh)}\n\n## en\n\n${format(value.en)}`;
}

function serializeBody(document: SkillDocument): string {
  const installation = document.installation
    .map((command) => `\`\`\`bash\n${command}\n\`\`\``)
    .join("\n\n");
  const changelog = document.changelog
    .map(
      (entry) =>
        `## ${entry.version} | ${entry.date}\n\n### zh\n\n${entry.notes.zh}\n\n### en\n\n${entry.notes.en}`,
    )
    .join("\n\n");
  const faq = document.faq
    .map(
      (entry, index) =>
        `## Question ${index + 1}\n\n### question.zh\n\n${entry.question.zh}\n\n### question.en\n\n${entry.question.en}\n\n### answer.zh\n\n${entry.answer.zh}\n\n### answer.en\n\n${entry.answer.en}`,
    )
    .join("\n\n");

  return [
    localizedTextSection("Description", document.description),
    localizedTextSection("Long Description", document.longDescription),
    localizedListSection("Features", document.features, false),
    localizedListSection("Use Cases", document.useCases, false),
    `# Installation\n\n${installation}`,
    localizedTextSection("Usage", document.usage),
    localizedListSection("Workflow", document.workflow, true),
    `# Changelog\n\n${changelog}`,
    `# FAQ\n\n${faq}`,
  ].join("\n\n");
}

export function serializeSkillMarkdown(document: SkillDocument): string {
  const metadata: SkillFrontmatter = {
    schemaVersion: document.schemaVersion,
    status: document.status,
    slug: document.slug,
    name: document.name,
    nameZh: document.nameZh ?? "",
    category: document.category,
    tags: document.tags,
    platforms: document.platforms,
    author: document.author,
    version: document.version,
    license: document.license,
    addedAt: document.addedAt,
    updatedAt: document.updatedAt,
    githubUrl: document.githubUrl ?? "",
    officialUrl: document.officialUrl ?? "",
    downloadUrl: document.downloadUrl ?? "",
    featured: document.featured,
    featuredRank: document.featuredRank,
    verified: document.verified,
    icon: document.icon,
    stars: document.stars,
    downloads: document.downloads,
  };
  const body = `${serializeBody(document)}\n`;
  return matter.stringify(body, metadata);
}

export function validateSkillDocuments(documents: SkillDocument[]): void {
  const slugs = new Set<string>();
  for (const document of documents) {
    if (slugs.has(document.slug)) {
      throw new SkillContentError(`duplicate slug "${document.slug}"`, {
        fileName: `${document.slug}.md`,
        field: "slug",
      });
    }
    slugs.add(document.slug);
  }
}
