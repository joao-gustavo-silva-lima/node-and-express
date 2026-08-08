import { applicationCache } from "../cache/cache.js";

const pathToViewName = new Map([["/", "index.view.ejs"]]);

export function renderView(
  pathName: string,
): [
  number,
  { "content-type": "text/html; charset=utf-8" | "application/json" },
  string,
] {
  try {
    const viewName = pathToViewName.get(pathName) ?? "not-found.view.ejs";
    const view = applicationCache.get(viewName)!();

    return [200, { "content-type": "text/html; charset=utf-8" }, view];
  } catch (error) {
    return [
      404,
      { "content-type": "application/json" },
      JSON.stringify({ error: error }),
    ];
  }
}
