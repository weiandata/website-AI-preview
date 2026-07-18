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

        <section className="about-compact-overview">
          <article className="about-mission-compact">
            <span className="section-kicker">
              {locale === "zh" ? "网站使命" : "Our mission"}
            </span>
            <h2>
              {locale === "zh"
                ? "让开源 AI 工具更容易被找到、理解和使用。"
                : "Make open-source AI tools easier to find, understand, and use."}
            </h2>
            <p>
              {locale === "zh"
                ? "我们整理具有真实工作价值的项目，并清楚呈现来源、许可证、安装条件与使用边界。"
                : "We curate projects with real workflow value and clearly present their source, license, installation requirements, and usage boundaries."}
            </p>
          </article>
          <div className="about-principles-compact">
            {principles.map((principle) => {
              const [title, description] = principle[locale];
              const Icon = principle.icon;
              return (
                <article className="about-principle-card" key={title}>
                  <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="about-compact-usage" id="usage">
          <div>
            <span className="section-kicker">
              {locale === "zh" ? "使用说明" : "Using the library"}
            </span>
            <h2>{locale === "zh" ? "安装之前，先做三项核对。" : "Three checks before installation."}</h2>
          </div>
          <div className="about-usage-steps">
            {usageSteps.map((step, index) => {
              const [title, description] = step[locale];
              return (
                <article className="about-usage-step" key={title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="about-compact-bottom">
          <div className="about-legal-compact">
            <article id="open-source">
              <h3>{locale === "zh" ? "开源归属" : "Open-source attribution"}</h3>
              <p>
                {locale === "zh"
                  ? "WEIAN DATA 负责整理与索引信息；项目版权、商标和许可证归原作者或相关权利人所有。"
                  : "WEIAN DATA curates and indexes information; project copyrights, trademarks, and licenses remain with their respective rights holders."}
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
          <aside className="about-contact-panel">
            <Mail aria-hidden="true" size={20} strokeWidth={1.7} />
            <div>
              <h2>{locale === "zh" ? "联系我们" : "Contact"}</h2>
              <p>
                {locale === "zh"
                  ? "如需报告失效链接或提出目录改进建议，欢迎通过邮件与我们联系。"
                  : "Contact us by email to report broken links or suggest improvements to the directory."}
              </p>
            </div>
            <ButtonLink href={`mailto:${siteConfig.contactEmail}`} variant="secondary" external>
              {locale === "zh" ? "发送邮件" : "Email us"}
            </ButtonLink>
          </aside>
        </section>
      </div>
    </main>
  );
}
