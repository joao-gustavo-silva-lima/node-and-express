import { existsSync, mkdirSync, writeFile } from "node:fs";
import { getSystemDetails } from "./system.js";
import path from "node:path";

export class Reporter {
  private static outputDirectory = path.join(import.meta.dirname, "..", "logs");

  public static async report(): Promise<void> {
    const fileName = this.getUniqueFileName();

    if (!this.hasOutputDirectory()) {
      console.log("The application exited.");
      return;
    }

    await writeFile(fileName, this.getReportData(), "utf-8", (error) => {
      if (error) {
        console.log(`An error ocurred during log file creation:\n\n${error}`);
        return;
      }

      console.log(`The log file was created successfully.`);
      console.log("The application exited.");
    });
  }

  private static getUniqueFileName(): string {
    const basename = "log";
    const extension = ".json";
    let index = 0;
    let name = basename + extension;

    while (existsSync(path.join(Reporter.outputDirectory, name))) {
      name = `${basename}(${++index})${extension}`;
    }

    return path.join(this.outputDirectory, name);
  }

  private static hasOutputDirectory(): boolean {
    if (existsSync(this.outputDirectory)) {
      return true;
    }

    try {
      mkdirSync(this.outputDirectory);
      console.log(
        `Logs directory created successfully:\n${this.outputDirectory}`,
      );

      return true;
    } catch (error: unknown) {
      console.log(`An error ocurred during logs directory creation:\n${error}`);

      return false;
    }
  }

  private static getReportData() {
    return JSON.stringify({
      time: Date(),
      content: getSystemDetails(),
    });
  }
}
