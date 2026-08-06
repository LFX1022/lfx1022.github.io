import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(workspace, "out");
const missing = new Set();

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(item));
    else files.push(item);
  }
  return files;
}

for (const file of await walk(output)) {
  if (!file.endsWith(".html")) continue;
  const html = await readFile(file, "utf8");
  const references = html.matchAll(/(?:src|href)="(\/[^"]+)"/g);
  for (const match of references) {
    const pathname = decodeURIComponent(match[1].split(/[?#]/, 1)[0]);
    const target = path.join(output, pathname.replace(/^\/+/, ""));
    try {
      await access(target);
    } catch {
      missing.add(pathname);
    }
  }
}

if (missing.size) {
  console.error("Static export contains missing local assets:");
  for (const item of [...missing].sort()) console.error(`- ${item}`);
  process.exit(1);
}

console.log("Static asset references verified.");
