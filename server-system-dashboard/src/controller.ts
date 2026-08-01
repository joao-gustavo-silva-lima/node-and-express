import { IncomingMessage, ServerResponse } from "node:http";
import { dashboardRenderer } from "./renderer.js";

export type ControllerFunction = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => unknown;

export const serveDashboardHTML: ControllerFunction = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
): void => {
  try {
    const data = dashboardRenderer();

    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(data);
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Internal Server Error: ${error}`,
      }),
    );
  }
};
