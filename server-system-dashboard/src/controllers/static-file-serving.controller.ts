import path from "node:path";
import { getStaticFile, StaticType } from "../cache/static.cache.js";

export function serveStaticFile(
  url: URL,
): [
  number,
  { "content-type": `text/${"css" | "javascript"}` | "application/json" },
  string,
] {
  const strURL = url.toString();
  const fileName = path.basename(strURL);
  const typeDir = path.basename(path.join(strURL, "..")) as StaticType;

  console.log(typeDir, fileName);

  try {
    const file = getStaticFile(typeDir, fileName);

    return [200, { "content-type": getStaticFileMIMEType(typeDir) }, file];
  } catch (error) {
    return [
      404,
      { "content-type": "application/json" },
      JSON.stringify({ error: error }),
    ];
  }
}

function getStaticFileMIMEType(staticType: StaticType) {
  switch (staticType) {
    case "styles":
      return "text/css";

    case "scripts":
      return "text/javascript";
  }
}
