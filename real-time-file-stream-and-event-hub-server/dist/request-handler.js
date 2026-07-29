import { createWriteStream } from "fs";
import path from "path";
const UPLOADS_DIR = path.join(import.meta.dirname, "../uploads");
export const handleUpload = function (url, req, res) {
    const fileName = req.headers["upload-file-name"];
    if (fileName === undefined) {
        console.log("Missing Upload File Name");
        res.writeHead(400, "Missing Upload File Name");
        res.end();
        return;
    }
    const targetFileName = path.join(UPLOADS_DIR, fileName);
    const writeStream = createWriteStream(targetFileName);
    req.pipe(writeStream);
    req.on("error", (_) => {
        writeStream.destroy();
        res.writeHead(400, "Client Side Upload Failed");
        res.end();
    });
    writeStream.on("error", (_) => {
        req.destroy();
        res.writeHead(500, "Server's Disk Writing Failed");
        res.end();
    });
    writeStream.on("finish", () => {
        res.writeHead(200, "Server Disk Writing Succeded");
        res.end();
    });
};
export const handleDownload = function (url, req, res) { };
//# sourceMappingURL=request-handler.js.map