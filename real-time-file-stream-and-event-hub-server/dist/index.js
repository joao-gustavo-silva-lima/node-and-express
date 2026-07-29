import http from "http";
import { ROUTES as routes } from "./router.js";
const PORT = 2409;
const server = http
    .createServer(async (req, res) => {
    const host = req.headers.host ?? "localhost";
    const url = new URL(req.url ?? "/", `http://${host}`);
    const route = routes[url.pathname] ?? undefined;
    if (route === undefined) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Path Not Found" }));
        return;
    }
    if (req.method !== route.method) {
        res.writeHead(405);
        res.end(JSON.stringify({
            error: `Method Not Allowed. Expected ${route.method}`,
        }));
        return;
    }
    route["handle-req"](req, res, url);
})
    .listen(PORT);
server.on("listening", () => console.log(`Server listening at port ${PORT}`));
//# sourceMappingURL=index.js.map