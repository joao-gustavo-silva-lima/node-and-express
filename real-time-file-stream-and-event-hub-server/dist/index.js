import http from "http";
const server = http.createServer((request, response) => {
    response.end("Home Page");
});
const PORT = 2409;
server.listen(PORT);
server.on("listening", () => console.log(`Server listening at port ...${PORT}...`));
//# sourceMappingURL=index.js.map