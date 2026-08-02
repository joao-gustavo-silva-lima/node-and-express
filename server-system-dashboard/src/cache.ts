import { readFileSync } from "node:fs";
import path from "node:path";
import ejs, { cache } from "ejs";

const stylingFilePath = path.join(import.meta.dirname, "../public/styles.css");
const stylingFileName = path.basename(stylingFilePath);

const scriptFilePath = path.join(import.meta.dirname, "../public/script.js");
const scriptFileName = path.basename(scriptFilePath);

export const indexEJSTemplate = compileTemplate(
  path.join(import.meta.dirname, "index.ejs"),
);

export const notFoundEJSTemplate = compileTemplate(
  path.join(import.meta.dirname, "not-found.ejs"),
);

function compileTemplate(filePath: string) {
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

export const stylingRenderer = (() => {
  try {
    const cachedCSS = readFileSync(stylingFilePath, "utf-8");

    return () => cachedCSS;
  } catch (error) {
    console.log(`Caching '${stylingFileName}' failed:\n\n${error}`);

    return () => {
      throw ".css file not reached";
    };
  }
})();

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
