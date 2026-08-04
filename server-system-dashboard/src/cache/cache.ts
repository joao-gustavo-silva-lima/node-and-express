import { readdirSync } from "node:fs";
import path from "node:path";
import { cacheView } from "./renderer.cache.js";

type CachedFileFunction = (fileName: string) => string;

export type CachingMap = Map<string, CachedFileFunction | CachingMap>;

export const cachingMap = createCachingMap([
  ["public", cacheDir("public", (fileName: string) => () => fileName)],
  ["src", cacheDir("src/views", cacheView)],
]);

function createCachingMap(
  prepopulation: [string, CachedFileFunction | CachingMap][] = [],
): CachingMap {
  return new Map(prepopulation);
}

function cacheDir(
  rootBasedDirPath: string,
  cachingFunction: (fileName: string) => CachedFileFunction,
): CachingMap {
  const dirPath = path.join(import.meta.dirname, "../..", rootBasedDirPath);

  const newCachingMap = createCachingMap();

  const dirEntries = readdirSync(dirPath, {
    recursive: true,
    withFileTypes: true,
  });

  for (const pathElement of dirEntries) {
    const rawPath = path.join(pathElement.parentPath, pathElement.name);
    const innerPath = rawPath.replace(`${dirPath}${path.sep}`, "");
    const nodePath = innerPath.split(path.sep);

    let head: CachedFileFunction | CachingMap = newCachingMap;

    for (const node of nodePath) {
      if (!(head instanceof Map)) {
        break;
      }

      if (head.has(node)) {
        head = head.get(node)!;
        continue;
      }

      head.set(
        node,
        pathElement.isDirectory() ? createCachingMap() : cachingFunction(node),
      );
    }
  }

  return newCachingMap;
}
