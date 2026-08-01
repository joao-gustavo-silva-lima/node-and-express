import { IncomingMessage, ServerResponse } from "node:http";
import { dashboardRenderer } from "./views.utils.js";

export type ControllerFunction = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => unknown;

export const serveDashboardHTML: ControllerFunction = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
): void => {
  if (dashboardRenderer === undefined) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Template Error" }));
    return;
  }

  const data = dashboardRenderer();

  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(data);
};
