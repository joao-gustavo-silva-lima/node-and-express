import { createWriteStream } from "fs";
import path from "path";
const UPLOADS_DIR = path.join(import.meta.dirname, "../uploads");
export const handleUpload = function (url, req, res) {
    const fileName = req.headers["x-file-name"];
    if (!fileName) {
        res.writeHead(400);
        res.end("Foi esperado o nome do arquivo de upload em 'x-file-name' no cabecalho da requisicao.");
        return;
    }
    const uploadingFilePath = path.join(UPLOADS_DIR, `./${fileName}`);
    const writeStream = createWriteStream(uploadingFilePath, "utf-8");
    writeStream.on("open", (_) => {
        console.log(`O upload do arquivo ${fileName} foi iniciado.`);
    });
    req;
    writeStream.on("finish", () => {
        writeStream.close();
        res.writeHead(200);
        console.log(`O upload do arquivo ${fileName} foi finalizado com êxito.`);
        res.end();
    });
    writeStream.on("error", (err) => {
        console.log(`O upload do arquivo ${fileName} apresentou um erro:\n\n${err}`);
        writeStream.close();
        res.writeHead(409);
        res.end();
    });
    req.on("data", async (chunk) => {
        writeStream.write(chunk);
    });
    req.on("end", () => { });
};
export const handleDownload = function (url, req, res) { };
//# sourceMappingURL=request-handler.js.map