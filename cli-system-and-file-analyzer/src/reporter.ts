import { existsSync, mkdirSync, writeFile } from "node:fs";
import { getSystemDetails } from "./system.js";
import path from "node:path";

export class Reporter {
  private static outputDirectory = path.join(import.meta.dirname, "..", "logs");

  public static async report(): Promise<void> {
    const fileName = this.getUniqueFileName();

    if (!this.hasOutputDirectory()) {
      console.log("A aplicação encerrou.");
      return;
    }

    await writeFile(fileName, this.getReportData(), "utf-8", (error) => {
      if (error) {
        console.log(
          `Um erro ocorreu durante a criação do arquivo de log:\n\n${error}`,
        );
        return;
      }

      console.log(`O arquivo de log foi criado com sucesso.`);
      console.log("A aplicação encerrou.");
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
        `O diretório de logs foi criado com sucesso:\n${this.outputDirectory}`,
      );

      return true;
    } catch (error: unknown) {
      console.log(
        `Um erro ocorreu durante a criação do diretório de logs:\n${error}`,
      );

      return false;
    }
  }

  private static getReportData() {
    return JSON.stringify({
      Horário: Date(),
      Conteúdo: getSystemDetails(),
    });
  }
}
