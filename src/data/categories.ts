import type { Category } from "@/types/content";

export const categories: Category[] = [
  {
    id: "development",
    name: { zh: "编程开发", en: "Development" },
    description: {
      zh: "代码审查、仓库维护与工程工作流。",
      en: "Code review, repository maintenance, and engineering workflows.",
    },
    icon: "code",
  },
  {
    id: "data-analytics",
    name: { zh: "数据分析", en: "Data Analytics" },
    description: {
      zh: "数据质量、统计分析与可视化规划。",
      en: "Data quality, statistical analysis, and visualization planning.",
    },
    icon: "analysis",
  },
  {
    id: "research-writing",
    name: { zh: "研究与写作", en: "Research & Writing" },
    description: {
      zh: "文献整理、研究设计与学术表达。",
      en: "Literature review, research design, and academic communication.",
    },
    icon: "research",
  },
  {
    id: "content-creation",
    name: { zh: "内容创作", en: "Content Creation" },
    description: {
      zh: "专业内容改写、编辑与多渠道发布。",
      en: "Professional rewriting, editing, and multi-channel publishing.",
    },
    icon: "writing",
  },
  {
    id: "automation",
    name: { zh: "工作流自动化", en: "Workflow Automation" },
    description: {
      zh: "把重复任务整理为可靠的自动化流程。",
      en: "Turn repetitive tasks into reliable automated workflows.",
    },
    icon: "automation",
  },
  {
    id: "image-design",
    name: { zh: "图像与设计", en: "Image & Design" },
    description: {
      zh: "视觉生成、设计评审与创意制作。",
      en: "Visual generation, design review, and creative production.",
    },
    icon: "image",
  },
  {
    id: "files-pdf",
    name: { zh: "文件与 PDF", en: "Files & PDF" },
    description: {
      zh: "提取、整理与转换复杂文档内容。",
      en: "Extract, organize, and transform complex documents.",
    },
    icon: "document",
  },
  {
    id: "productivity",
    name: { zh: "效率工具", en: "Productivity" },
    description: {
      zh: "减少上下文切换，提升日常工作效率。",
      en: "Reduce context switching and improve everyday focus.",
    },
    icon: "productivity",
  },
];
