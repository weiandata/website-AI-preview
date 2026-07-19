"use client";

import { Check, Download, MessageSquare, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";

const steps = [
  { icon: Download, title: "start.step1Title", body: "start.step1Body" },
  { icon: Sparkles, title: "start.step2Title", body: "start.step2Body" },
  { icon: MessageSquare, title: "start.step3Title", body: "start.step3Body" },
] as const;

const tips = ["start.tip1", "start.tip2", "start.tip3", "start.tip4"] as const;

/** Closes the loop for readers who have never installed a Skill before. */
export function GettingStarted() {
  const { t } = useLanguage();

  return (
    <section className="getting-started">
      <div className="section-heading">
        <div>
          <span className="section-kicker">{t("start.kicker")}</span>
          <h2>{t("start.title")}</h2>
          <p>{t("start.description")}</p>
        </div>
      </div>

      <ol className="start-steps">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li className="start-step" key={step.title}>
              <span className="start-step-mark">
                <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
                <em>{index + 1}</em>
              </span>
              <strong>{t(step.title)}</strong>
              <p>{t(step.body)}</p>
            </li>
          );
        })}
      </ol>

      <div className="start-tips">
        <h3>{t("start.tipsTitle")}</h3>
        <ul>
          {tips.map((tip) => (
            <li key={tip}>
              <Check aria-hidden="true" size={16} strokeWidth={2.1} />
              <span>{t(tip)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
