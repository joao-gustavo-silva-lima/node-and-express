import { readFileSync } from "node:fs";
import path from "node:path";
import ejs from "ejs";

const scriptFilePath = path.join(import.meta.dirname, "../public/script.js");
const scriptFileName = path.basename(scriptFilePath);

export const indexTemplate = compileTemplate("index");
export const notFoundTemplate = compileTemplate("not-found");

export const indexStyle = cacheCSS("index");
export const notFoundStyle = cacheCSS("not-found");

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

function cacheCSS(styleName: string) {
  const filePath = path.join(
    import.meta.dirname,
    `../public/styles/${styleName}.style.css`,
  );

  try {
    const cachedCSS = readFileSync(filePath, "utf-8");

    return () => cachedCSS;
  } catch (error) {
    const fileName = path.basename(filePath);
    console.log(`Caching '${fileName}' failed:\n\n${error}`);

    return () => {
      throw ".css file not reached";
    };
  }
}

export const scriptServer = (() => {
  try {
    const cachedScript = readFileSync(scriptFilePath, "utf-8");

    return () => cachedScript;
  } catch (error) {
    console.log(`Caching '${scriptFileName}' failed:\n\n${error}`);

    return () => {
      throw ".js file not reached";
    };
  }
})();
