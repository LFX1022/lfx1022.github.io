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

const command = process.platform === "win32"
  ? [process.env.ComSpec ?? "cmd.exe", ["/d", "/s", "/c", "npm.cmd run build"]]
  : ["npm", ["run", "build"]];
const build = spawnSync(command[0], command[1], {
  cwd: source,
  stdio: "inherit",
});

if (build.error) {
  console.error(build.error);
}

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

await rm(destination, { recursive: true, force: true });
await mkdir(path.dirname(destination), { recursive: true });
await cp(exported, destination, { recursive: true });

console.log(`Daytona archive exported to ${path.relative(workspace, destination)}`);
