import {
  BookOpenText,
  Bot,
  ChartNoAxesCombined,
  Code2,
  FileText,
  ImageIcon,
  PenLine,
  TimerReset,
} from "lucide-react";
import type { SkillIconKey } from "@/types/content";

const iconMap = {
  analysis: ChartNoAxesCombined,
  automation: Bot,
  code: Code2,
  document: FileText,
  image: ImageIcon,
  productivity: TimerReset,
  research: BookOpenText,
  writing: PenLine,
};

export function SkillIcon({ icon, size = 22 }: { icon: SkillIconKey; size?: number }) {
  const Icon = iconMap[icon];
  return <Icon aria-hidden="true" size={size} strokeWidth={1.7} />;
}
