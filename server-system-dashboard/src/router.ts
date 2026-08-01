import { serveDashboardHTML } from "./controller.js";
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
