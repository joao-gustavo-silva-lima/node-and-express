import { readFileSync } from "node:fs";
import path from "node:path";

export function cacheData(
  filePath: string,
  preCachingModifierFunction: (data: string) => string = (data) => data,
): () => string {
  try {
    const data = readFileSync(filePath, "utf-8");

    return () => preCachingModifierFunction(data);
  } catch (error) {
    console.error(error);

    const fileName = path.basename(filePath);

    return () => {
      throw `Erro Interno do Servidor: O arquivo '${fileName}' não está em cache`;
    };
  }
}
