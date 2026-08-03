import { TemplateFunction } from "ejs";
import { indexRenderer, notFoundRenderer } from "../cache/renderer.cache.js";

export function renderView(
  pathName: string,
): [
  number,
  { "content-type": "text/html; charset=utf-8" | "application/json" },
  string,
] {
  const renderers: { [path: string]: TemplateFunction } = {
    "/": indexRenderer,
  };

  try {
    const view = (renderers[pathName] ?? notFoundRenderer)();

    return [200, { "content-type": "text/html; charset=utf-8" }, view];
  } catch (error) {
    return [
      404,
      { "content-type": "application/json" },
      JSON.stringify({ error: error }),
    ];
  }
}
