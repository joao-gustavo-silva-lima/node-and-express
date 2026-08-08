import EventEmitter from "node:events";
class Logger extends EventEmitter {
    static log(action, target, status, append = "") {
        console.log(`${action}(${target}): ${status}${append ? `\n\t| ${append}` : ""}`);
    }
}
export const serverLogger = new Logger();
serverLogger.on("start upload", (fileName) => Logger.log("Upload", fileName, "Started"));
serverLogger.on("progress upload", (fileName) => Logger.log("Upload", fileName, "In Progress"));
serverLogger.on("finish upload", (fileName) => Logger.log("Upload", fileName, "Finished"));
serverLogger.on("error upload", (fileName, error) => Logger.log("Upload", fileName, "Error", error.message));
//# sourceMappingURL=logger.js.map