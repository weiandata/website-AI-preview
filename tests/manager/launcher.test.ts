import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

const run = promisify(execFile);
const launcher = path.join(process.cwd(), "tools/skill-manager/launcher.sh");

/** Headless keeps the script off `osascript`, which would block on a dialog. */
const env = { ...process.env, MANAGER_HEADLESS: "1" };

async function launch(action: string) {
  return run("/bin/zsh", [launcher, action], { env });
}

/**
 * The launcher is what a non-programmer double-clicks, so its failure modes are
 * invisible: no terminal, no output. These cover the paths that need no running
 * server; starting one is exercised by hand.
 */
describe("Skill manager launcher", () => {
  it("reports a stopped manager rather than assuming one is running", async () => {
    const { stdout } = await launch("status");

    // Either state is legitimate depending on the machine; the contract is that
    // it answers with one of them instead of erroring.
    expect(["running", "stopped"]).toContain(stdout.trim());
  });

  it("treats stopping an already-stopped manager as success", async () => {
    if ((await launch("status")).stdout.trim() === "running") return;

    // Double-clicking Stop twice must not surface an error to the administrator.
    const { stdout } = await launch("stop");
    expect(stdout).toContain("本来就没有在运行");
  });

  it("rejects an unknown action instead of silently doing nothing", async () => {
    await expect(launch("restart")).rejects.toMatchObject({ code: 64 });
  });
});
