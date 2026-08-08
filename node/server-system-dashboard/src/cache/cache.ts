import { cacheData } from "./functions.cache.js";
import { readdirSync } from "node:fs";
import path from "node:path";
import ejs from "ejs";

type CachedFileFunction = () => string;

export const applicationCache = new Map<string, CachedFileFunction>([
  ...cacheDir("public"),
  ...cacheDir("src/views", ejs.render),
]);

function cacheDir(
  rootBasedDirPath: string,
  preCachingModifierFunction: (data: string) => string = (data) => data,
) {
  const dirPath = path.join(import.meta.dirname, "../..", rootBasedDirPath);

  const cachedDir: [string, CachedFileFunction][] = [];

  const dirEntries = readdirSync(dirPath, {
    recursive: true,
    withFileTypes: true,
  });

  for (const entry of dirEntries) {
    if (entry.isDirectory()) {
      continue;
    }

    const fullPath = path.join(entry.parentPath, entry.name);

    cachedDir.push([
      entry.name,
      cacheData(fullPath, preCachingModifierFunction),
    ]);
  }

  return cachedDir;
}
