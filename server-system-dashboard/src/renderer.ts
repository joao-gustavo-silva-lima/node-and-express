import { readFileSync } from "node:fs";
import path from "node:path";
import ejs from "ejs";

export const dashboardRenderer = (() => {
  try {
    const template = readFileSync(
      path.join(import.meta.dirname, "index.ejs"),
      "utf-8",
    );

    return ejs.compile(template);
  } catch (error) {
    console.log(`Compiling template 'index.ejs' failed:\n\n${error}`);

    return (...args: unknown[]) => {
      throw "template rendering failed";
    };
  }
})();
