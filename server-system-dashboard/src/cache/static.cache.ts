import { readFileSync } from "node:fs";
import path from "node:path";

export type StaticType = "styles" | "scripts";

export const indexStyle = cacheStaticFile("styles", "index.style.css");
export const indexScript = cacheStaticFile("scripts", "index.script.js");

export const globalStyle = cacheStaticFile("styles", "global.style.css");

export const notFoundStyle = cacheStaticFile("styles", "not-found.style.css");

function cacheStaticFile(typeDir: StaticType, fileName: string) {
  try {
    const data = readFileSync(
      path.join(import.meta.dirname, `../../public/${typeDir}/${fileName}`),
      "utf-8",
    );

    return () => data;
  } catch (error) {
    console.error(error);

    return () => {
      throw `Erro Interno do Servidor: O arquivo '${fileName}' não está em cache`;
    };
  }
}

export function getStaticFile(typeDir: StaticType, fileName: string) {
  if (typeDir === "scripts" && fileName === "index.script.js") {
    return indexScript();
  }

  if (typeDir === "styles" && fileName === "index.style.css") {
    return indexStyle();
  }

  if (typeDir === "styles" && fileName === "not-found.style.css") {
    return notFoundStyle();
  }

  if (typeDir === "styles" && fileName === "global.style.css") {
    return globalStyle();
  }

  throw `O caminho 'public/${typeDir}/${fileName}' não direciona a um arquivo estático válido no servidor`;
}
