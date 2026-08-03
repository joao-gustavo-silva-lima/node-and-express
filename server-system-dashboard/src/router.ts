import {
  serveJS,
  serveCSS,
  serveHTML,
  serveSystemMetrics,
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
  "/index.style.css": {
    method: "GET",
    handle: serveCSS,
  },
  "/index.script.js": {
    method: "GET",
    handle: serveJS,
  },
  "/api/v1/metrics": {
    method: "GET",
    handle: serveSystemMetrics,
  },
};
