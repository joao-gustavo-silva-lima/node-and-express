import http from "http";
const PORT = 2409;
const server = http.createServer(async (req, res) => {
    const host = req.headers.host ?? "localhost";
    const url = new URL(req.url ?? "/", `http://${host}`);
    if (url.pathname === "/file" && req.method === "GET") {
        res.end("[WIP]");
    }
    if (url.pathname === "/upload" && req.method === "POST") {
        res.end("[WIP]");
    }
});
server.listen(PORT);
server.on("listening", () => console.log(`Server listening at port ...${PORT}...`));
//# sourceMappingURL=index.js.map