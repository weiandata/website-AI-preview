"use client";

import { useLanguage } from "@/components/language/language-provider";
import { SkillCard } from "@/components/skills/skill-card";
import { skills } from "@/data/skills";

export function FeaturedSkills() {
  const { t } = useLanguage();

  return (
    <section className="featured-section container-shell">
      <div className="section-heading">
        <h2>{t("home.featuredTitle")}</h2>
        <p>{t("home.featuredDescription")}</p>
      </div>
      <div className="featured-grid">
        {skills
          .filter((skill) => skill.featured)
          .slice(0, 6)
          .map((skill) => (
            <SkillCard skill={skill} key={skill.id} />
          ))}
      </div>
    </section>
  );
}
