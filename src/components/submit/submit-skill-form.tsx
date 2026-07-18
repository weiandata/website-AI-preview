"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useLanguage } from "@/components/language/language-provider";
import { Button, ButtonLink } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { localize } from "@/lib/i18n";
import {
  validateSubmission,
  type SkillSubmission,
  type SubmissionErrors,
} from "@/lib/submit-validation";

const platforms = ["ChatGPT", "Claude", "Codex", "GitHub", "VS Code", "Cursor", "Python", "R", "Web", "Local"];
const licenses = ["MIT", "Apache-2.0", "BSD-3-Clause", "GPL-3.0", "CC-BY-4.0", "Other"];

const copy = {
  zh: {
    name: "Skill 名称",
    url: "GitHub 或项目地址",
    intro: "简短介绍",
    category: "分类",
    categoryPlaceholder: "选择分类",
    platforms: "支持平台",
    license: "许可证",
    licensePlaceholder: "选择许可证",
    submitter: "提交人姓名",
    email: "提交人邮箱",
    notes: "补充说明",
    optional: "选填",
    submit: "提交推荐",
    submitting: "正在检查...",
    errorSummary: "请检查表单中的必填项",
    successTitle: "推荐信息已准备完成",
    successDescription: "当前演示不会将数据发送到服务器。正式接入提交接口后，这些信息将进入人工审核流程。",
    another: "继续推荐",
    library: "浏览 Skill 库",
  },
  en: {
    name: "Skill name",
    url: "GitHub or project URL",
    intro: "Short introduction",
    category: "Category",
    categoryPlaceholder: "Select a category",
    platforms: "Supported platforms",
    license: "License",
    licensePlaceholder: "Select a license",
    submitter: "Submitter name",
    email: "Submitter email",
    notes: "Additional notes",
    optional: "Optional",
    submit: "Submit recommendation",
    submitting: "Checking...",
    errorSummary: "Check the required form fields",
    successTitle: "Recommendation details are ready",
    successDescription: "This demonstration does not send data to a server. Once a submission service is connected, these details will enter a human review workflow.",
    another: "Recommend another",
    library: "Browse Skill Library",
  },
} as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} className="field-error">
      {message}
    </span>
  );
}

export function SubmitSkillForm() {
  const { locale } = useLanguage();
  const t = copy[locale];
  const [errors, setErrors] = useState<SubmissionErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values: SkillSubmission = {
      skillName: String(form.get("skillName") ?? ""),
      sourceUrl: String(form.get("sourceUrl") ?? ""),
      introduction: String(form.get("introduction") ?? ""),
      category: String(form.get("category") ?? ""),
      platforms: form.getAll("platforms").map(String),
      license: String(form.get("license") ?? ""),
      submitterName: String(form.get("submitterName") ?? ""),
      email: String(form.get("email") ?? ""),
      notes: String(form.get("notes") ?? ""),
    };
    const nextErrors = validateSubmission(values, locale);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("submitting");
    await new Promise((resolve) => window.setTimeout(resolve, 80));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="submission-success" aria-live="polite">
        <span className="success-icon liquid-glass">
          <CheckCircle2 aria-hidden="true" size={32} strokeWidth={1.7} />
        </span>
        <h2>{t.successTitle}</h2>
        <p>{t.successDescription}</p>
        <div>
          <Button variant="secondary" onClick={() => setStatus("idle")}>
            {t.another}
          </Button>
          <ButtonLink href="/skills">{t.library}</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form className="submit-form" noValidate onSubmit={handleSubmit}>
      {Object.keys(errors).length ? (
        <div className="form-error-summary" role="alert">
          {t.errorSummary}
        </div>
      ) : null}

      <div className="form-grid">
        <label className="form-field">
          <span>{t.name}</span>
          <input
            name="skillName"
            aria-invalid={Boolean(errors.skillName)}
            aria-describedby={errors.skillName ? "skillName-error" : undefined}
          />
          <FieldError id="skillName-error" message={errors.skillName} />
        </label>

        <label className="form-field">
          <span>{t.url}</span>
          <input
            name="sourceUrl"
            type="url"
            placeholder="https://"
            aria-invalid={Boolean(errors.sourceUrl)}
            aria-describedby={errors.sourceUrl ? "sourceUrl-error" : undefined}
          />
          <FieldError id="sourceUrl-error" message={errors.sourceUrl} />
        </label>

        <label className="form-field form-field-wide">
          <span>{t.intro}</span>
          <textarea
            name="introduction"
            rows={4}
            aria-invalid={Boolean(errors.introduction)}
            aria-describedby={errors.introduction ? "introduction-error" : undefined}
          />
          <FieldError id="introduction-error" message={errors.introduction} />
        </label>

        <label className="form-field">
          <span>{t.category}</span>
          <select
            name="category"
            defaultValue=""
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? "category-error" : undefined}
          >
            <option value="" disabled>
              {t.categoryPlaceholder}
            </option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {localize(category.name, locale)}
              </option>
            ))}
          </select>
          <FieldError id="category-error" message={errors.category} />
        </label>

        <label className="form-field">
          <span>{t.license}</span>
          <select
            name="license"
            defaultValue=""
            aria-invalid={Boolean(errors.license)}
            aria-describedby={errors.license ? "license-error" : undefined}
          >
            <option value="" disabled>
              {t.licensePlaceholder}
            </option>
            {licenses.map((license) => (
              <option value={license} key={license}>
                {license}
              </option>
            ))}
          </select>
          <FieldError id="license-error" message={errors.license} />
        </label>

        <fieldset className="form-field form-field-wide platform-fieldset">
          <legend>{t.platforms}</legend>
          <div>
            {platforms.map((platform) => (
              <label key={platform}>
                <input type="checkbox" name="platforms" value={platform} />
                <span>{platform}</span>
              </label>
            ))}
          </div>
          <FieldError id="platforms-error" message={errors.platforms} />
        </fieldset>

        <label className="form-field">
          <span>{t.submitter}</span>
          <input
            name="submitterName"
            autoComplete="name"
            aria-invalid={Boolean(errors.submitterName)}
            aria-describedby={errors.submitterName ? "submitterName-error" : undefined}
          />
          <FieldError id="submitterName-error" message={errors.submitterName} />
        </label>

        <label className="form-field">
          <span>{t.email}</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={errors.email} />
        </label>

        <label className="form-field form-field-wide">
          <span>
            {t.notes} <small>{t.optional}</small>
          </span>
          <textarea name="notes" rows={4} />
        </label>
      </div>

      <div className="form-submit-row">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          <Send aria-hidden="true" size={16} strokeWidth={1.8} />
          {status === "submitting" ? t.submitting : t.submit}
        </Button>
      </div>
    </form>
  );
}
