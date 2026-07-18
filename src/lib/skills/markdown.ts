import path from "node:path";
import matter from "gray-matter";
import type {
  Heading,
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

export class SkillContentError extends Error {
  fileName: string;
  field?: string;
  section?: string;
  line?: number;

  constructor(message: string, details: ErrorDetails) {
    super(`${details.fileName}: ${message}`);
    this.name = "SkillContentError";
    this.fileName = details.fileName;
    this.field = details.field;
    this.section = details.section;
    this.line = details.line;
  }
}

function nodeText(node: RootContent | PhrasingContent | ListItem): string {
  if ("value" in node && typeof node.value === "string") return node.value;
  if ("children" in node) {
    return node.children.map((child) => nodeText(child)).join("");
  }
  return "";
}

function headingText(node: RootContent): string | undefined {
  return node.type === "heading" ? nodeText(node).trim() : undefined;
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

function splitLevelOneSections(
  root: Root,
  fileName: string,
): Map<string, RootContent[]> {
  const sections = splitByHeading(root.children, 1, fileName, "document");
  const expected = new Set<string>(requiredSections);
  for (const section of sections.keys()) {
    if (!expected.has(section)) {
      throw new SkillContentError(`unknown top-level section "${section}"`, {
        fileName,
        section,
      });
    }
  }
  for (const section of requiredSections) {
    if (!sections.has(section)) {
      throw new SkillContentError(`missing top-level section "${section}"`, {
        fileName,
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

function parseFrontmatter(
  data: Record<string, unknown>,
  fileName: string,
): SkillFrontmatter {
  const result = skillFrontmatterSchema.safeParse(normalizeFrontmatterDates(data));
  if (!result.success) {
    const issue = result.error.issues[0];
    const field = issue.path.join(".") || undefined;
    throw new SkillContentError(issue.message, { fileName, field });
  }
  return result.data;
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
  const metadata = parseFrontmatter(parsedMatter.data, fileName);
  const expectedSlug = path.basename(fileName, path.extname(fileName));
  if (metadata.slug !== expectedSlug) {
    throw new SkillContentError(
      `slug "${metadata.slug}" does not match filename "${expectedSlug}"`,
      { fileName, field: "slug" },
    );
  }

  const root = unified().use(remarkParse).parse(parsedMatter.content) as Root;
  const sections = splitLevelOneSections(root, fileName);

  return {
    ...metadata,
    id: metadata.slug,
    githubUrl: optionalUrl(metadata.githubUrl),
    officialUrl: optionalUrl(metadata.officialUrl),
    downloadUrl: optionalUrl(metadata.downloadUrl),
    description: readLocalizedText(
      sections.get("Description")!,
      fileName,
      "Description",
    ),
    longDescription: readLocalizedText(
      sections.get("Long Description")!,
      fileName,
      "Long Description",
    ),
    features: readLocalizedList(
      sections.get("Features")!,
      false,
      fileName,
      "Features",
    ),
    useCases: readLocalizedList(
      sections.get("Use Cases")!,
      false,
      fileName,
      "Use Cases",
    ),
    installation: readInstallation(sections.get("Installation")!, fileName),
    usage: readLocalizedText(sections.get("Usage")!, fileName, "Usage"),
    workflow: readLocalizedList(
      sections.get("Workflow")!,
      true,
      fileName,
      "Workflow",
    ),
    changelog: readChangelog(sections.get("Changelog")!, fileName),
    faq: readFaq(sections.get("FAQ")!, fileName),
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
