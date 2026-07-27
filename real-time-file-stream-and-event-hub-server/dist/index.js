import http from "http";
import routes from "./routes.json" with { type: "json" };
const PORT = 2409;
const server = http.createServer((request, response) => {
    const url = request.url;
    const route = routes[url] ?? routes["/error"];
    if (request.method === route.method) {
        response.end(route.content);
    }
    else {
        response.end(`Unexpected Request Method: '${request.method}'`);
    }
});
server.listen(PORT);
server.on("listening", () => console.log(`Server listening at port ...${PORT}...`));
//# sourceMappingURL=index.js.map