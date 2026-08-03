import { indexRenderer } from "../cache/views.cache.js";

export function renderView(
  pathName: string,
): [
  number,
  { "content-type": "text/html; charset=utf-8" | "application/json" },
  string,
] {
  const renderer = (() => {
    switch (pathName) {
      case "/":
        return indexRenderer;

      default:
        return () => {
          throw "404 Página Não Encontrada";
        };
    }
  })();

  try {
    const view = renderer();

    return [200, { "content-type": "text/html; charset=utf-8" }, view];
  } catch (error) {
    return [
      404,
      { "content-type": "application/json" },
      JSON.stringify({ error: error }),
    ];
  }
}
