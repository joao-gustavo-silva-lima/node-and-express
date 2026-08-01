import { createServer } from "http";
import { ROUTES } from "./router.js";

const PORT = 5000;

const server = createServer((req, res) => {
  const host = req.headers.host ?? `localhost:${PORT}`;
  const path = req.url ?? "/";
  const url = new URL(path, `http://${host}`);

  const route = ROUTES[url.pathname];

  if (route === undefined) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
    return;
  }

  if (req.method !== route.method) {
    res.writeHead(405, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Method Not Allowed. Expected '${route.method}'. Received '${req.method}'`,
      }),
    );
    return;
  }

  route.handle(req, res);
}).listen(PORT);

server.on("listening", () => {
  console.log(`\nServer running at http://localhost:${PORT}`);
});
