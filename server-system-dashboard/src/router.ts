import {
  serveJS,
  serveCSS,
  serveHTML,
  serveSystemMetrics,
  serveStatic,
} from "./controller.js";
import { ControllerFunction } from "./controller.js";

interface Routes {
  [path: string]: {
    method: "GET";
    handle: ControllerFunction;
  };
}

export const ROUTES: Routes = {
  "/": {
    method: "GET",
    handle: serveHTML,
  },
  "/public/styles/index": {
    method: "GET",
    handle: serveStatic,
  },
  "/public/scripts/index": {
    method: "GET",
    handle: serveStatic,
  },
  "/api/v1/metrics": {
    method: "GET",
    handle: serveSystemMetrics,
  },
};
