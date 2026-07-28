interface Router {
  [path: string]: {
    method: "GET" | "POST";
    content: string;
    "req-method": () => unknown;
  };
}

export const ROUTES: Router = {
  "/file": {
    method: "GET",
    content: "[WIP]",
    "req-method": () => undefined,
  },
  "/upload": {
    method: "POST",
    content: "[WIP]",
    "req-method": () => undefined,
  },
};
