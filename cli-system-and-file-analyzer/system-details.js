const DETAILS = {
  Sistema: process.platform,
  "Arquitetura do Sistema": process.arch,
  "Ambiente Node de Execução": process.version,
  "Diretório de alocação da CLI": __dirname,
};

function logDetails() {
  for (const [property, value] of Object.entries(DETAILS)) {
    console.log(`${property}: ${value}`);
  }
}

module.exports = logDetails;
