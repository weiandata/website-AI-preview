import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillDetail } from "@/components/skills/skill-detail";
import { categories } from "@/data/categories";
import { absoluteUrl } from "@/lib/site-config";
import {
  getPublishedSkillBySlug,
  getPublishedSkills,
} from "@/lib/skills/repository";

type SkillPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const skills = await getPublishedSkills();
  return skills.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: SkillPageProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = await getPublishedSkillBySlug(slug);
  if (!skill) return {};
  const canonical = `/skills/${skill.slug}`;

  return {
    title: `${skill.nameZh ?? skill.name}｜开源 AI Skill｜惟安数据科技`,
    description: skill.description.zh,
    alternates: {
      canonical,
    },
    openGraph: {
      title: skill.name,
      description: skill.description.en,
      type: "article",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: skill.name,
      description: skill.description.en,
    },
  };
}

function safeJson(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function SkillPage({ params }: SkillPageProps) {
  const { slug } = await params;
  const skills = await getPublishedSkills();
  const skill = skills.find((item) => item.slug === slug);
  if (!skill) notFound();
  const category = categories.find((item) => item.id === skill.category)!;
  const url = absoluteUrl(`/skills/${skill.slug}`);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
      { "@type": "ListItem", position: 2, name: "Skills", item: absoluteUrl("/skills") },
      { "@type": "ListItem", position: 3, name: skill.name, item: url },
    ],
  };
  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: skill.name,
    alternateName: skill.nameZh,
    description: skill.description.en,
    author: { "@type": "Organization", name: skill.author },
    license: skill.license,
    dateModified: skill.updatedAt,
    version: skill.version,
    url,
    genre: category.name.en,
    keywords: skill.tags.join(", "),
    isAccessibleForFree: true,
    codeRepository: skill.githubUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(creativeWorkJsonLd) }}
      />
      <SkillDetail skill={skill} skills={skills} />
    </>
  );
}
