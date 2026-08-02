fetch(`${window.origin}/api/v1/metrics`)
  .then(async (res) => await res.json())
  .then((data) => {
    console.log(data);
    handleDOM(data);
  })
  .catch((error) => console.log(error));

const TABS_CONTAINER = document.querySelector(".container__tabs");
const SYSTEM_CONTENT_CONTAINER = document.querySelector(
  ".container__view--system__data-list",
);
const CPUS_CONTENT_CONTAINER = document.querySelector(
  ".container__view--cpus__data-list",
);
const RAM_USAGE_TEXT = document.querySelector(
  ".container__view--ram__ranged-data__fraction",
);
const RAM_USAGE_BAR = document.querySelector(
  ".container__view--ram__ranged-data__usage-bar",
);

function handleDOM(data) {
  for (const [tabName, ionIconName] of [
    ["Sistema", "desktop-outline"],
    ["CPU", "hardware-chip-outline"],
    ["RAM", "stats-chart-outline"],
  ]) {
    TABS_CONTAINER.innerHTML += `
      <a class="container__tabs__tab" href="#${tabName.toLowerCase()}">
        <ion-icon class="container__tabs__tab__icon" name="${ionIconName}"></ion-icon>
        <p class="container__tabs__tab__name">${tabName}</p>
      </a>
    `;
  }

  for (const property of [
    "host",
    "arquitetura",
    "plataforma",
    "tempo de atividade",
  ]) {
    const value = data[property];

    SYSTEM_CONTENT_CONTAINER.innerHTML += `
      <li class="container__view--system__data-list__kv-pair">
        <p class="container__view--system__data-list__kv-pair__key">
          ${property}:
        </p>
        <p class="container__view--system__data-list__kv-pair__value">
          ${value}
        </p>
      </li>
    `;
  }

  for (let i = 0; i < data["cpus"].length; i++) {
    const cpu = data["cpus"][i];
    const model = cpu["model"];
    const speed = (cpu["speed"] / 1000).toFixed(2);

    CPUS_CONTENT_CONTAINER.innerHTML += `
      <li class="container__view--cpus__data-list__container">
        <p class="container__view--cpus__data-list__container__title">
          Núcleo ${i + 1}:
        </p>
        <ul class="container__view--cpus__data-list__container__infos">
          <li     
            class="container__view--cpus__data-list__container__infos__kv-pair"
          >
            <p 
              class="container__view--cpus__data-list__container__infos__kv-pair__key"
            >
              Modelo: 
            </p>
            <p 
              class="container__view--cpus__data-list__container__infos__kv-pair__value"
            >
              ${model} 
            </p>
          </li>
          <li 
            class="container__view--cpus__data-list__container__infos__kv-pair"
          >
            <p 
              class="container__view--cpus__data-list__container__infos__kv-pair__key"
            >
              Velocidade: 
            </p>
            <p 
              class="container__view--cpus__data-list__container__infos__kv-pair__value"
            >
              ${speed} GHz 
            </p>
          </li>
        </ul>
      </li>
    `;
  }

  const totalMemory = (data["memória total"] / 1024 ** 3).toFixed(2);
  const usedMemory = (
    (data["memória total"] - data["memória livre"]) /
    1024 ** 3
  ).toFixed(2);
  const usagePercentage = Math.floor(
    (Number(usedMemory) * 100) / Number(totalMemory),
  );

  RAM_USAGE_TEXT.innerHTML = `${usedMemory} GB / ${totalMemory} GB`;
  RAM_USAGE_BAR.value = usagePercentage;
}
