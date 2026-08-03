import { IncomingMessage, ServerResponse } from "node:http";
import {
  indexTemplate,
  notFoundTemplate,
  indexStyle,
  notFoundStyle,
  indexScript,
} from "./cache.js";
import { getSystemMetrics } from "./system-metrics.js";
import path from "node:path";

export type ControllerFunction = (
  url: URL,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => unknown;

export const serveHTML: ControllerFunction = (
  url: URL,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
): void => {
  try {
    const cachedHTML = indexTemplate();

    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(cachedHTML);
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Internal Server Error: ${error}`,
      }),
    );
  }
};

export function serveStatic(
  url: URL,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) {
  const publicDir = path.join(url.toString(), "..");

  try {
    const cachedStatic = indexStyle();

    res.writeHead(200, { "content-type": "text/css; charset=utf-8" });
    res.end(cachedStatic);
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Internal Server Error: ${error}`,
      }),
    );
  }
}

export const serveCSS: ControllerFunction = (
  url: URL,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
): void => {
  try {
    const cachedCSS = indexStyle();

    res.writeHead(200, { "content-type": "text/css; charset=utf-8" });
    res.end(cachedCSS);
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Internal Server Error: ${error}`,
      }),
    );
  }
};

export const serveJS: ControllerFunction = (
  url: URL,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
): void => {
  try {
    const cachedScript = indexScript();

    res.writeHead(200, { "content-type": "text/javascript" });
    res.end(cachedScript);
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Internal Server Error: ${error}`,
      }),
    );
  }
};

export const serveSystemMetrics: ControllerFunction = (
  url: URL,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
): void => {
  const metrics = getSystemMetrics();

  if (metrics === undefined) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Server Internal Error: fetching system metrics failed",
      }),
    );
  }

  res.writeHead(200, {
    "content-type": "application/json",
    "cache-control": "no-store",
  });
  res.end(JSON.stringify(metrics, null, 2));
};
