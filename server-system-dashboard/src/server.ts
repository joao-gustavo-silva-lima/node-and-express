import { createServer } from "node:http";
import { fetchMetricsAPI } from "./controllers/metrics.controller.js";
import { serveStaticFile } from "./controllers/static.controller.js";
import { renderView } from "./controllers/renderer.controller.js";

const PORT = 5000;

const STATIC_FILE_PATH = /^\/public\/(styles|scripts)\/.+$/;

const server = createServer((req, res) => {
  const url = new URL(
    req.url ?? "/",
    `http://${req.headers.host ?? `localhost:${PORT}`}`,
  );

  if (req.method === "GET" && url.pathname === "/api/v1/metrics") {
    const [statusCode, headers, payload] = fetchMetricsAPI();

    res.writeHead(statusCode, headers);
    res.end(payload);
    return;
  }

  if (req.method === "GET" && STATIC_FILE_PATH.test(url.pathname)) {
    const [statusCode, headers, payload] = serveStaticFile(url);

    res.writeHead(statusCode, headers);
    res.end(payload);
    return;
  }

  const [statusCode, headers, payload] = renderView(url.pathname);

  res.writeHead(statusCode, headers);
  res.end(payload);
}).listen(PORT);

server.on("listening", () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
