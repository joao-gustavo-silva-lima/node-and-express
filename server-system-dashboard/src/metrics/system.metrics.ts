import os from "os";

export function getSystemMetrics() {
  try {
    return {
      cpus: os.cpus(),
      host: os.hostname(),
      arquitetura: os.arch(),
      plataforma: os.platform(),
      "memória livre": os.freemem(),
      "memória total": os.totalmem(),
      "tempo de atividade": os.uptime(),
      "horário do relatório": new Date().toISOString(),
    };
  } catch (error) {
    console.error(error);

    return () => {
      throw "Erro Interno do Servidor: Não foi possível reunir as informações do sistema operacional.";
    };
  }
}
