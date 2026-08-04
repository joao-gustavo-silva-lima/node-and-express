import path from "node:path";
import { applicationCache } from "../cache/cache.js";

export function serveStaticFile(url: URL): [
  number,
  {
    "content-type":
      | `text/${"css" | "javascript"}; charset=utf-8`
      | "application/json";
  },
  string,
] {
  const [fileType, fileName] = getFileLocationData(url);

  try {
    if (!applicationCache.has(fileName)) {
      throw `O caminho 'public/${fileType}/${fileName}' não direciona a um arquivo estático válido no servidor`;
    }

    const file = applicationCache.get(fileName)!();

    return [200, { "content-type": getStaticFileMIMEType(fileType) }, file];
  } catch (error) {
    return [
      404,
      { "content-type": "application/json" },
      JSON.stringify({ error: error }),
    ];
  }
}

function getFileLocationData(url: URL): [string, string] {
  const stringfiedURL = url.toString();

  return [
    path.basename(path.join(stringfiedURL, "..")),
    path.basename(stringfiedURL),
  ];
}

function getStaticFileMIMEType(staticType: string) {
  switch (staticType) {
    case "styles":
      return "text/css; charset=utf-8";

    case "scripts":
      return "text/javascript; charset=utf-8";

    default:
      return "application/json";
  }
}
