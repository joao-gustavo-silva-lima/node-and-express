import EventEmitter from "node:events";

interface EventsConstraints {
  "start upload": [fileName: string];
  "progress upload": [fileName: string];
  "finish upload": [fileName: string];
  "error upload": [fileName: string, error: Error];
}

class Logger extends EventEmitter<EventsConstraints> {
  public static log(
    action: "Upload" | "Download",
    target: string,
    status: "Started" | "In Progress" | "Finished" | "Error",
    append: string = "",
  ): void {
    console.log(
      `${action}(${target}): ${status}${append ? `\n\t| ${append}` : ""}`,
    );
  }
}

export const serverLogger = new Logger();

serverLogger.on("start upload", (fileName) =>
  Logger.log("Upload", fileName, "Started"),
);
serverLogger.on("progress upload", (fileName) =>
  Logger.log("Upload", fileName, "In Progress"),
);
serverLogger.on("finish upload", (fileName) =>
  Logger.log("Upload", fileName, "Finished"),
);
serverLogger.on("error upload", (fileName, error) =>
  Logger.log("Upload", fileName, "Error", error.message),
);
