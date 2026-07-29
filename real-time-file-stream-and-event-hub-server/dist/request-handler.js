import { createReadStream, createWriteStream, constants } from "fs";
import { access } from "fs/promises";
import path from "path";
import { serverLogger } from "./logger.js";
const UPLOADS_DIR = path.join(import.meta.dirname, "../uploads");
export const handleUpload = function (req, res, url) {
    const fileName = req.headers["upload-file-name"];
    if (fileName === undefined) {
        res.writeHead(400, "Missing Upload File Name");
        res.end();
        return;
    }
    const sanitizedFileName = path.basename(fileName);
    const targetFileName = path.join(UPLOADS_DIR, sanitizedFileName);
    const writeStream = createWriteStream(targetFileName);
    writeStream.on("pipe", (_) => serverLogger.emit("start upload", fileName));
    req.on("data", (_) => serverLogger.emit("progress upload", fileName));
    req.on("error", (err) => {
        writeStream.destroy();
        serverLogger.emit("error upload", fileName, err);
        res.writeHead(400, "Client Side Upload Failed");
        res.end();
    });
    writeStream.on("error", (err) => {
        req.destroy();
        serverLogger.emit("error upload", fileName, err);
        res.writeHead(500, "Server Disk Writing Failed");
        res.end();
    });
    writeStream.on("finish", () => {
        serverLogger.emit("finish upload", fileName);
        res.writeHead(200, "Server Disk Writing Succeded");
        res.end();
    });
    req.pipe(writeStream);
};
export const handleDownload = async function (req, res, url) {
    const fileName = url.searchParams.get("name");
    if (fileName === null) {
        res.writeHead(400, "Missing File Name as Search Parameter");
        res.end();
        return;
    }
    const sanitizedFileName = path.basename(fileName);
    const targetFileName = path.join(UPLOADS_DIR, sanitizedFileName);
    try {
        await access(targetFileName, constants.F_OK);
    }
    catch {
        res.writeHead(404, "File Name Not Found");
        res.end();
        return;
    }
    const readStream = createReadStream(targetFileName);
    readStream.pipe(res);
    readStream.on("error", (err) => {
        if (!res.headersSent) {
            res.writeHead(500, "Server Disk Reading Failed");
            res.end();
        }
    });
    res.on("error", (err) => {
        readStream.destroy();
        res.writeHead(400, "Download was Interrupted");
        res.end();
    });
    res.on("close", () => {
        if (!res.writableEnded) {
            readStream.destroy();
        }
    });
};
//# sourceMappingURL=request-handler.js.map