import { serveCSS, serveHTML } from "./controller.js";
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
  "/styles.css": {
    method: "GET",
    handle: serveCSS,
  },
  "/api/v1/metrics": {
    method: "GET",
    handle: () => undefined,
  },
};
