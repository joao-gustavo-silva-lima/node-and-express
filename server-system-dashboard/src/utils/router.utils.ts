import { IncomingMessage, ServerResponse } from "http";
import { serveDashboardHTML } from "./controller.utils.js";
import { ControllerFunction } from "./controller.utils.js";

interface Routes {
  [path: string]: {
    method: "GET";
    handle: ControllerFunction;
  };
}

export const ROUTES: Routes = {
  "/": {
    method: "GET",
    handle: serveDashboardHTML,
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
