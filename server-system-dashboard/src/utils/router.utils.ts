import { IncomingMessage, ServerResponse } from "http";

type Handler = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => unknown;

interface Routes {
  [path: string]: {
    method: "GET";
    handle: Handler;
  };
}

export const ROUTES: Routes = {
  "/": {
    method: "GET",
    handle: () => undefined,
  },
  "/api/v1/metrics": {
    method: "GET",
    handle: () => undefined,
  },
  "/styles.css": {
    method: "GET",
    handle: () => undefined,
  },
};
