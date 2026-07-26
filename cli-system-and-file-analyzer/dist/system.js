import { cpus, uptime, totalmem, freemem } from "node:os";
function getSystemDetails() {
    return {
        "Modelo da CPU": cpus()[0]?.model ?? "Não Reconhecido",
        "Tempo de Atividade do Sistema (Segs.)": uptime().toFixed(0),
        "Memória Total (GB)": (totalmem() / 1024 ** 3).toFixed(2),
        "Memória Livre (GB)": (freemem() / 1024 ** 3).toFixed(2),
    };
}
module.exports = getSystemDetails;
//# sourceMappingURL=system.js.map