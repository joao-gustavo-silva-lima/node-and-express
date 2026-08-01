import { IncomingMessage, ServerResponse } from "node:http";
import { layoutRenderer, stylingRenderer } from "./cache.js";

export type ControllerFunction = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => unknown;

export const serveHTML: ControllerFunction = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
): void => {
  try {
    const cachedHTML = layoutRenderer();

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

export const serveCSS: ControllerFunction = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
): void => {
  try {
    const cachedCSS = stylingRenderer();

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
