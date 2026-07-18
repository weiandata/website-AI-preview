import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const outDir = path.join(root, "out");
const contentDir = path.join(root, "content/skills");

async function assertFile(relativePath) {
  try {
    await access(path.join(root, relativePath));
  } catch {
    throw new Error(`Missing static output: ${relativePath}`);
  }
}

await Promise.all(
  ["out/index.html", "out/skills/index.html", "out/about/index.html", "out/sitemap.xml"].map(
    assertFile,
  ),
);

const fileNames = (await readdir(contentDir)).filter((fileName) =>
  fileName.endsWith(".md"),
);
const records = await Promise.all(
  fileNames.map(async (fileName) => {
    const source = await readFile(path.join(contentDir, fileName), "utf8");
    const { data } = matter(source);
    return { slug: data.slug, status: data.status };
  }),
);

const published = records.filter((record) => record.status === "published");
const drafts = records.filter((record) => record.status === "draft");
await Promise.all(
  published.map(({ slug }) => assertFile(`out/skills/${slug}/index.html`)),
);
for (const { slug } of drafts) {
  try {
    await access(path.join(outDir, "skills", slug, "index.html"));
    throw new Error(`Draft leaked into static output: ${slug}`);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Draft leaked")) throw error;
  }
}

const skillEntries = await readdir(path.join(outDir, "skills"), {
  withFileTypes: true,
});
const detailCount = skillEntries.filter((entry) => entry.isDirectory()).length;
if (detailCount !== published.length) {
  throw new Error(
    `Expected ${published.length} Skill detail routes, found ${detailCount}`,
  );
}

console.log(`Verified ${published.length} published Skill routes and ${drafts.length} drafts.`);
