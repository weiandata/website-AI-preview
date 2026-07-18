"use client";

import {
  BookOpenCheck,
  Building2,
  CircleCheckBig,
  Mail,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { ButtonLink } from "@/components/ui/button";

const principles = [
  {
    icon: CircleCheckBig,
    zh: ["实际用途", "优先收录能够解决明确工作问题的项目。"],
    en: ["Practical use", "We prioritize projects that solve a clear workflow problem."],
  },
  {
    icon: BookOpenCheck,
    zh: ["文档清晰", "安装、使用与限制条件需要能够被复核。"],
    en: ["Clear documentation", "Installation, usage, and constraints must be reviewable."],
  },
  {
    icon: Scale,
    zh: ["许可证明确", "来源、作者与许可证必须清楚标注。"],
    en: ["Clear licensing", "Sources, authors, and licenses must be clearly identified."],
  },
  {
    icon: ShieldCheck,
    zh: ["链接可维护", "定期检查外部地址、版本与项目状态。"],
    en: ["Maintainable links", "External URLs, versions, and project status are reviewed regularly."],
  },
];

export function AboutContent() {
  const { locale, t } = useLanguage();
  return (
    <main className="about-page">
      <section className="container-shell about-hero" id="company">
        <span className="about-mark liquid-glass">
          <Building2 aria-hidden="true" size={26} strokeWidth={1.7} />
        </span>
        <h1>{t("about.title")}</h1>
        <p>{t("about.description")}</p>
      </section>

      <section className="container-shell about-mission">
        <div>
          <h2>{locale === "zh" ? "网站使命" : "Our mission"}</h2>
        </div>
        <p>
          {locale === "zh"
            ? "我们希望通过持续整理和分享高质量开源资源，降低寻找、理解和使用 AI 工具的门槛。这个目录强调透明来源、可复核说明与真实工作价值。"
            : "This library makes high-quality open-source AI resources easier to discover, understand, and use. It emphasizes transparent sources, reviewable guidance, and real workflow value."}
        </p>
      </section>

      <section className="container-shell about-principles">
        <div className="section-heading">
          <h2>{locale === "zh" ? "收录原则" : "Selection principles"}</h2>
          <p>
            {locale === "zh"
              ? "每个项目都应当让使用者知道它来自哪里、如何使用，以及需要承担哪些责任。"
              : "Every project should make its source, usage, and user responsibilities clear."}
          </p>
        </div>
        <div>
          {principles.map((principle) => {
            const [title, description] = principle[locale];
            const Icon = principle.icon;
            return (
              <article key={title}>
                <Icon aria-hidden="true" size={21} strokeWidth={1.7} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-shell attribution-section" id="open-source">
        <div>
          <h2>{locale === "zh" ? "开源归属" : "Open-source attribution"}</h2>
          <p>
            {locale === "zh"
              ? "WEIAN DATA 负责整理和索引信息，并不代表我们维护所有外部项目。项目版权、商标与许可证归原作者或相关权利人所有。"
              : "WEIAN DATA curates and indexes information but does not maintain every external project. Copyright, trademarks, and licenses remain with their respective authors and rights holders."}
          </p>
        </div>
        <div id="privacy">
          <h2>{locale === "zh" ? "免责声明" : "Disclaimer"}</h2>
          <p>
            {locale === "zh"
              ? "下载和使用第三方项目之前，请核对来源、许可证、文件完整性与安全要求。"
              : "Before downloading or using third-party projects, verify the source, license, file integrity, and security requirements."}
          </p>
        </div>
      </section>

      <section className="container-shell contact-section">
        <span className="contact-icon liquid-glass">
          <Mail aria-hidden="true" size={23} strokeWidth={1.7} />
        </span>
        <div>
          <h2>{locale === "zh" ? "联系我们" : "Contact"}</h2>
          <p>
            {locale === "zh"
              ? "欢迎推荐项目、报告失效链接或提出目录改进建议。"
              : "Recommend projects, report broken links, or suggest improvements to the directory."}
          </p>
        </div>
        <ButtonLink href="mailto:hello@weian-data.example" variant="secondary" external>
          hello@weian-data.example
        </ButtonLink>
      </section>
    </main>
  );
}
