import path from "node:path";
import { getPublishedSkills } from "@/lib/skills/repository";

/**
 * Discovery tests assert against a fixed catalogue rather than `content/skills`.
 * Editors add and remove real Skills routinely, and a filtering test that breaks
 * because a Skill was retired is testing the content, not the selector.
 */
export const loadTestSkills = () =>
  getPublishedSkills(path.join(process.cwd(), "tests/fixtures/skills"));
