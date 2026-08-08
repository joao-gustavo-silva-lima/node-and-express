import { createReadStream, createWriteStream, constants } from "fs";
import { IncomingMessage, ServerResponse } from "http";
import { access } from "fs/promises";
import path from "path";
import { serverLogger } from "./logger.js";

const UPLOADS_DIR = path.join(import.meta.dirname, "../uploads");

export type RequestHandlerFunction = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  url: URL,
) => unknown;

export const handleUpload: RequestHandlerFunction = function (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  url: URL,
) {
  const fileName = req.headers["upload-file-name"] as string | undefined;

  if (fileName === undefined) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing Upload File Name" }));
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
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Client Upload Failed" }));
  });

  writeStream.on("error", (err) => {
    req.destroy();
    serverLogger.emit("error upload", fileName, err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Server Disk Writing Failed" }));
  });

  writeStream.on("finish", () => {
    serverLogger.emit("finish upload", fileName);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ OK: "Upload Concluded Successfully" }));
  });

  req.pipe(writeStream);
};

export const handleDownload: RequestHandlerFunction = async function (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  url: URL,
) {
  const fileName = url.searchParams.get("name");

  if (fileName === null || /^\s*$/.test(fileName)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing File Name as Search Parameter" }));
    return;
  }

  const sanitizedFileName = path.basename(fileName);
  const targetFileName = path.join(UPLOADS_DIR, sanitizedFileName);

  try {
    await access(targetFileName, constants.F_OK);
  } catch {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "File Not Found" }));
    return;
  }

  const readStream = createReadStream(targetFileName);

  readStream.on("error", (err) => {
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Server Disk Reading Failed" }));
    }
  });

  res.on("error", (err) => {
    readStream.destroy();
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Download was Interrupted" }));
  });

  res.on("close", () => {
    if (!res.writableEnded) {
      readStream.destroy();
    }
  });

  readStream.on("end", () => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ OK: "Download Finished Successfully" }));
  });
  readStream.pipe(res);
};
