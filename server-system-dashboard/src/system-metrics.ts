import {
  arch,
  cpus,
  uptime,
  version,
  machine,
  freemem,
  totalmem,
  hostname,
  platform,
} from "os";

export function getSystemMetrics() {
  try {
    return {
      "horário do relatório": new Date().toISOString(),

      host: hostname(),
      arquitetura: arch(),
      plataforma: platform(),
      "tempo de atividade": uptime(),

      "memória livre": freemem(),
      "memória total": totalmem(),

      cpus: cpus(),
    };
  } catch (error) {
    console.log(
      `Error encountered while trying to fetch system metrics: ${error}`,
    );
  }
}
