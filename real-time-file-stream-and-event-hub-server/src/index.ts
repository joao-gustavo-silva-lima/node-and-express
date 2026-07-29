import http from "http";
import { ROUTES as routes } from "./router.js";

const PORT = 2409;

const server = http
  .createServer(async (req, res) => {
    const host = req.headers.host ?? "localhost";
    const url = new URL(req.url ?? "/", `http://${host}`);

    const route = routes[url.pathname] ?? undefined;

    if (route === undefined) {
      res.writeHead(404, "Path Not Found");
      res.end();
      return;
    }

    if (req.method !== route.method) {
      res.writeHead(405, "Method Not Allowed");
      res.end();
      return;
    }

    route["handle-req"](url, req, res);
  })
  .listen(PORT);

server.on("listening", () => console.log(`Server listening at port ${PORT}`));
