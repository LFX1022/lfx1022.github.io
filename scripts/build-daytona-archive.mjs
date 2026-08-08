import { cp, mkdir, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(workspace, "archives", "triumph-daytona-archive");
const exported = path.join(source, "out");
const destination = path.join(
  workspace,
  "public",
  "archives",
  "triumph-daytona-archive",
);

const npm = process.platform === "win32"
  ? [process.env.ComSpec ?? "cmd.exe", ["/d", "/s", "/c", "npm.cmd"]]
  : ["npm", []];

for (const args of [["ci"], ["run", "build"]]) {
  const result = spawnSync(npm[0], [...npm[1], ...args], {
    cwd: source,
    stdio: "inherit",
  });

  if (result.error) {
    console.error(result.error);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

await rm(destination, { recursive: true, force: true });
await mkdir(path.dirname(destination), { recursive: true });
await cp(exported, destination, { recursive: true });

console.log(`Daytona archive exported to ${path.relative(workspace, destination)}`);
