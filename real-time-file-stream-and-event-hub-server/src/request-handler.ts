import { createWriteStream } from "fs";
import { IncomingMessage, ServerResponse } from "http";
import path from "path";

const UPLOADS_DIR = path.join(import.meta.dirname, "../uploads");

export type RequestHandlerFunction = (
  url: URL,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => unknown;

export const handleUpload: RequestHandlerFunction = function (
  url: URL,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) {
  const fileName = req.headers["upload-file-name"] as string | undefined;

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

export const handleDownload: RequestHandlerFunction = function (
  url: URL,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) {};
