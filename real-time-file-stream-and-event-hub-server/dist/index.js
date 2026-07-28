import http from "http";
import { ROUTES as routes } from "./router.js";
const PORT = 2409;
const server = http.createServer(async (req, res) => {
    const host = req.headers.host ?? "localhost";
    const url = new URL(req.url ?? "/", `http://${host}`);
    const route = routes[url.pathname] ?? undefined;
    if (route === undefined) {
        res.statusCode = 404;
        res.end("404 Pagina Nao Encontrada");
        return;
    }
    if (req.method !== route.method) {
        res.statusCode = 405;
        res.end(`Foi esperado o metodo '${route.method}' na requisicao em '${url.pathname}'. Foi recebido '${req.method ?? ""}'.`);
        return;
    }
    res.end(route.content);
});
server.listen(PORT);
server.on("listening", () => console.log(`Server listening at port ...${PORT}...`));
//# sourceMappingURL=index.js.map