import {
  handleUpload,
  handleDownload,
  RequestHandlerFunction,
} from "./request-handler.js";

interface Router {
  [path: string]: {
    method: "GET" | "POST";
    "handle-req": RequestHandlerFunction;
  };
}

export const ROUTES: Router = {
  "/file": {
    method: "GET",
    "handle-req": handleDownload,
  },
  "/upload": {
    method: "POST",
    "handle-req": handleUpload,
  },
};
