import { readFileSync } from "node:fs";
import path from "node:path";
import ejs, { cache } from "ejs";

const ejsFilePath = path.join(import.meta.dirname, "index.ejs");
const ejsFileName = path.basename(ejsFilePath);

const stylingFilePath = path.join(import.meta.dirname, "../public/styles.css");
const stylingFileName = path.basename(stylingFilePath);

const scriptFilePath = path.join(import.meta.dirname, "../public/script.js");
const scriptFileName = path.basename(scriptFilePath);

export const layoutRenderer = (() => {
  try {
    const template = readFileSync(ejsFilePath, "utf-8");

    return ejs.compile(template);
  } catch (error) {
    console.log(`Compiling template '${ejsFileName}' failed:\n\n${error}`);

    return (...args: unknown[]) => {
      throw "template rendering failed";
    };
  }
})();

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
