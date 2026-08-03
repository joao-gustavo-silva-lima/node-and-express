import { readFileSync } from "node:fs";
import path from "node:path";
import ejs from "ejs";

export const indexTemplate = compileTemplate("index");
export const notFoundTemplate = compileTemplate("not-found");

export const indexStyle = cacheStatic("styles", "index");
export const notFoundStyle = cacheStatic("styles", "not-found");

export const indexScript = cacheStatic("scripts", "index");

function compileTemplate(viewName: string) {
  const filePath = path.join(import.meta.dirname, `views/${viewName}.view.ejs`);

  try {
    const template = readFileSync(filePath, "utf-8");

    return ejs.compile(template);
  } catch (error) {
    const fileName = path.basename(filePath);
    console.log(`Compiling template '${fileName}' failed:\n\n${error}`);

    return (...args: unknown[]) => {
      throw "template rendering failed";
    };
  }
}

type PublicDirectory = "styles" | "scripts";

function getStaticExtension(publicDir: PublicDirectory) {
  switch (publicDir) {
    case "styles":
      return "style.css";

    case "scripts":
      return "script.js";
  }
}

function cacheStatic(publicDir: PublicDirectory, fileName: string) {
  const filePath = path.join(
    import.meta.dirname,
    `../public/${publicDir}/${fileName}.${getStaticExtension(publicDir)}`,
  );

  try {
    const cachedFile = readFileSync(filePath, "utf-8");

    return () => cachedFile;
  } catch (error) {
    const fileName = path.basename(filePath);
    console.log(`Caching '${fileName}' failed:\n\n${error}`);

    return () => {
      throw `'${fileName}' not found`;
    };
  }
}
