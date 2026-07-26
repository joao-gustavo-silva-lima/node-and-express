interface CPU_COLLECTION {
  [index: number]: {
    model: string;
    speed: number;
    times: {};
  };
}

const {
  cpus: CPUs,
  uptime: ACTIVITY_TIME,
  freemem: FREE_MEMORY,
  totalmem: TOTAL_MEMORY,
}: {
  cpus: () => CPU_COLLECTION;
  uptime: () => number;
  freemem: () => number;
  totalmem: () => number;
} = require("node:os");

function getSystemDetails() {
  const details = {
    "Modelo da CPU": CPUs()[0]?.model ?? "Não Reconhecido",
    "Tempo de Atividade do Sistema (Segs.)": ACTIVITY_TIME().toFixed(0),
    "Memória Total (GB)": (TOTAL_MEMORY() / 1024 ** 3).toFixed(2),
    "Memória Livre (GB)": (FREE_MEMORY() / 1024 ** 3).toFixed(2),
  };

  return JSON.stringify(details);
}

module.exports = getSystemDetails;
