import { existsSync, createWriteStream } from "fs";
import { writeFile } from "fs/promises";
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
) {};

export const handleDownload: RequestHandlerFunction = function (
  url: URL,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) {};
