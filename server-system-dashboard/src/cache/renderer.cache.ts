import ejs from "ejs";
import { readFileSync } from "node:fs";
import path from "node:path";

export const indexRenderer = cacheTemplate("index.view.ejs");
export const notFoundRenderer = cacheTemplate("not-found.view.ejs");

function cacheTemplate(fileName: string) {
  try {
    const template = readFileSync(
      path.join(import.meta.dirname, `../views/${fileName}`),
      "utf-8",
    );

    return ejs.compile(template);
  } catch (error) {
    console.error(error);

    throw `Erro Interno do Servidor: O template '${fileName}' não foi compilado em cache`;
  }
}
