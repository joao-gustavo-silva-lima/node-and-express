import { createReadStream, createWriteStream, constants } from "fs";
import { IncomingMessage, ServerResponse } from "http";
import { access } from "fs/promises";
import path from "path";

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
    res.writeHead(400, "Missing Upload File Name");
    res.end();
    return;
  }

  const sanitizedFileName = path.basename(fileName);
  const targetFileName = path.join(UPLOADS_DIR, sanitizedFileName);
  const writeStream = createWriteStream(targetFileName);

  req.pipe(writeStream);

  req.on("error", (_) => {
    writeStream.destroy();
    res.writeHead(400, "Client Side Upload Failed");
    res.end();
  });

  writeStream.on("error", (_) => {
    req.destroy();
    res.writeHead(500, "Server Disk Writing Failed");
    res.end();
  });

  writeStream.on("finish", () => {
    res.writeHead(200, "Server Disk Writing Succeded");
    res.end();
  });
};

export const handleDownload: RequestHandlerFunction = async function (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  url: URL,
) {
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
  } catch {
    res.writeHead(404, "File Name Not Found");
    res.end();
    return;
  }

  const readStream = createReadStream(targetFileName);

  readStream.pipe(res);

  readStream.on("error", (_) => {
    if (!res.headersSent) {
      res.writeHead(500, "Server Disk Reading Failed");
      res.end();
    }
  });

  res.on("error", (_) => {
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
