import { readdirSync } from "node:fs";
import path from "node:path";
import { cacheView } from "./renderer.cache.js";
import { cacheStaticFile } from "./static.cache.js";

type CachedFileFunction = (fileName: string) => string;

export const cachingMap = new Map<string, CachedFileFunction>([
  ...cacheDir("public", cacheStaticFile),
  ...cacheDir("src/views", cacheView),
]);

function cacheDir(
  rootBasedDirPath: string,
  cachingFunction: (fileName: string) => CachedFileFunction,
) {
  const dirPath = path.join(import.meta.dirname, "../..", rootBasedDirPath);
  const newCachingMap: [string, CachedFileFunction][] = [];
  const dirEntries = readdirSync(dirPath, {
    recursive: true,
    withFileTypes: true,
  });

  for (const entryPath of dirEntries) {
    const fullPath = path.join(entryPath.parentPath, entryPath.name);

    if (entryPath.isDirectory()) {
      continue;
    }

    newCachingMap.push([entryPath.name, cachingFunction(fullPath)]);
  }

  return newCachingMap;
}
