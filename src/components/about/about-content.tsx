"use client";

import {
  BookOpenCheck,
  CircleCheckBig,
  Mail,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

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

const usageSteps = [
  {
    zh: ["核对来源", "确认项目来源、维护状态和发布渠道。"],
    en: ["Verify the source", "Confirm the project source, maintenance status, and release channel."],
  },
  {
    zh: ["阅读要求", "阅读许可证、安装说明和运行前提。"],
    en: ["Review requirements", "Read the license, installation guide, and runtime requirements."],
  },
  {
    zh: ["验证输出", "在受控环境测试，再接入正式工作流。"],
    en: ["Validate outputs", "Test in a controlled environment before production use."],
  },
];

export function AboutContent() {
  const { locale, t } = useLanguage();

  return (
    <main className="about-page">
      <div className="container-shell about-content-grid">
        <section className="about-hero about-editorial-hero" id="company">
          <span className="section-kicker">
            {locale === "zh" ? "关于惟安数据科技" : "About WEIAN DATA"}
          </span>
          <h1>{t("about.title")}</h1>
          <p>{t("about.description")}</p>
        </section>

        <section className="about-section about-mission">
          <div className="about-section-heading">
            <h2>{locale === "zh" ? "网站使命" : "Our mission"}</h2>
            <p>
              {locale === "zh"
                ? "让寻找、理解和使用开源 AI 工具变得更直接。"
                : "Make open-source AI tools easier to find, understand, and use."}
            </p>
          </div>
          <p className="about-statement">
            {locale === "zh"
              ? "我们持续整理高质量开源资源，强调透明来源、可复核说明与真实工作价值，让使用者能够更快做出可靠判断。"
              : "We continuously organize high-quality open-source resources with transparent sources, reviewable guidance, and real workflow value so people can make reliable decisions faster."}
          </p>
        </section>

        <section className="about-section about-principles">
          <div className="about-section-heading">
            <h2>{locale === "zh" ? "收录原则" : "Selection principles"}</h2>
            <p>
              {locale === "zh"
                ? "每个项目都应清楚说明来源、用途和使用责任。"
                : "Every project should clearly explain its source, purpose, and user responsibilities."}
            </p>
          </div>
          <div className="about-principles-grid">
            {principles.map((principle) => {
              const [title, description] = principle[locale];
              const Icon = principle.icon;
              return (
                <article className="about-principle-card" key={title}>
                  <Icon aria-hidden="true" size={21} strokeWidth={1.7} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="about-section about-usage" id="usage">
          <div className="about-section-heading">
            <h2>{locale === "zh" ? "使用说明" : "Using the library"}</h2>
            <p>
              {locale === "zh"
                ? "从来源核验开始，把风险判断放在安装之前。"
                : "Start with source verification and assess risk before installation."}
            </p>
          </div>
          <div className="about-usage-steps">
            {usageSteps.map((step) => {
              const [title, description] = step[locale];
              return (
                <article className="about-usage-step" key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="about-section about-legal-section">
          <div className="about-section-heading">
            <h2>{locale === "zh" ? "责任与归属" : "Responsibility and attribution"}</h2>
            <p>
              {locale === "zh"
                ? "目录负责整理信息，项目权利与使用责任仍归各自主体。"
                : "The directory organizes information while project rights and usage responsibilities remain with their respective parties."}
            </p>
          </div>
          <div className="about-legal-grid">
            <article id="open-source">
              <h3>{locale === "zh" ? "开源归属" : "Open-source attribution"}</h3>
              <p>
                {locale === "zh"
                  ? "WEIAN DATA 负责整理和索引信息，并不代表我们维护所有外部项目。项目版权、商标与许可证归原作者或相关权利人所有。"
                  : "WEIAN DATA curates and indexes information but does not maintain every external project. Copyright, trademarks, and licenses remain with their respective authors and rights holders."}
              </p>
            </article>
            <article id="privacy">
              <h3>{locale === "zh" ? "免责声明" : "Disclaimer"}</h3>
              <p>
                {locale === "zh"
                  ? "下载和使用第三方项目之前，请核对来源、许可证、文件完整性与安全要求。"
                  : "Before downloading or using third-party projects, verify the source, license, file integrity, and security requirements."}
              </p>
            </article>
          </div>
        </section>

        <section className="about-contact-panel">
          <Mail aria-hidden="true" size={23} strokeWidth={1.7} />
          <div className="about-section-heading">
            <h2>{locale === "zh" ? "联系我们" : "Contact"}</h2>
            <p>
              {locale === "zh"
                ? "如需报告失效链接或提出目录改进建议，欢迎通过邮件与我们联系。"
                : "Contact us by email to report broken links or suggest improvements to the directory."}
            </p>
          </div>
          <ButtonLink href={`mailto:${siteConfig.contactEmail}`} variant="secondary" external>
            {siteConfig.contactEmail}
          </ButtonLink>
        </section>
      </div>
    </main>
  );
}
