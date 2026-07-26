"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_os_1 = require("node:os");
function getSystemDetails() {
    return {
        "Modelo da CPU": (0, node_os_1.cpus)()[0]?.model ?? "Não Reconhecido",
        "Tempo de Atividade do Sistema (Segs.)": (0, node_os_1.uptime)().toFixed(0),
        "Memória Total (GB)": ((0, node_os_1.totalmem)() / 1024 ** 3).toFixed(2),
        "Memória Livre (GB)": ((0, node_os_1.freemem)() / 1024 ** 3).toFixed(2),
    };
}
module.exports = getSystemDetails;
//# sourceMappingURL=system.js.map