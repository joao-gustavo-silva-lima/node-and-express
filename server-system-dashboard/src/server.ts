import { createServer } from "node:http";

const PORT = 5000;

const STATIC_FILE_PATH = /^\/public\/(styles|scripts)\/.+$/;

const server = createServer((req, res) => {
  const url = new URL(
    req.url ?? "/",
    `http://${req.headers.host ?? `localhost:${PORT}`}`,
  );

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "OK" }));
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/v1/metrics") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "OK" }));
    return;
  }

  if (req.method === "GET" && STATIC_FILE_PATH.test(url.pathname)) {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "OK" }));
    return;
  }

  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ message: "404: Page Not Found" }));
}).listen(PORT);

server.on("listening", () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
