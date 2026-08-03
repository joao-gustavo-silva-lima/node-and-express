import path from "node:path";
import { getStaticFile, StaticType } from "../cache/static.cache.js";

export function serveStaticFile(
  url: URL,
): [
  number,
  { "content-type": `text/${"css" | "javascript"}` | "application/json" },
  string,
] {
  const [fileType, fileName] = getFileLocationData(url);

  try {
    const file = getStaticFile(fileType, fileName);

    return [200, { "content-type": getStaticFileMIMEType(fileType) }, file];
  } catch (error) {
    return [
      404,
      { "content-type": "application/json" },
      JSON.stringify({ error: error }),
    ];
  }
}

function getFileLocationData(url: URL): [StaticType, string] {
  const stringfiedURL = url.toString();

  return [
    path.basename(path.join(stringfiedURL, "..")) as StaticType,
    path.basename(stringfiedURL),
  ];
}

function getStaticFileMIMEType(staticType: StaticType) {
  switch (staticType) {
    case "styles":
      return "text/css";

    case "scripts":
      return "text/javascript";
  }
}
