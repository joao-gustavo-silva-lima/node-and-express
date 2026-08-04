import ejs from "ejs";
import { readFileSync } from "node:fs";
import path from "node:path";

export function cacheView(fileName: string) {
  try {
    const viewTemplate = readFileSync(
      path.join(import.meta.dirname, `../views/${fileName}`),
      "utf-8",
    );

    return () => ejs.render(viewTemplate);
  } catch (error) {
    console.error(error);

    throw `Erro Interno do Servidor: O template '${fileName}' não foi compilado em cache`;
  }
}
