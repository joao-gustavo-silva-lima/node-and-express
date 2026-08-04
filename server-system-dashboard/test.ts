import { readdirSync } from "node:fs";
import path from "node:path";

type CacheMap = Map<string, string | CacheMap>;

const dirPath = path.join(import.meta.dirname, "public");

const cacheMap: CacheMap = new Map<string, string | CacheMap>();

const rawContent = readdirSync(dirPath, {
  recursive: true,
  withFileTypes: true,
});

const dirName = path.basename(dirPath);
cacheMap.set(dirName, new Map<string, string | CacheMap>());

for (const content of rawContent) {
  const rawPath = path.join(content.parentPath, content.name);
  const nodePath = rawPath.replace(`${dirPath}${path.sep}`, "").split(path.sep);

  console.log(nodePath);

  let head: string | CacheMap = cacheMap.get(dirName)!;

  for (const node of nodePath) {
    if (typeof head === "string") {
      break;
    }

    if (head.has(node)) {
      head = head.get(node)!;
      continue;
    }

    head.set(
      node,
      content.isDirectory() ? new Map<string, string | CacheMap>() : node,
    );
  }
}

console.log("\n", cacheMap);
