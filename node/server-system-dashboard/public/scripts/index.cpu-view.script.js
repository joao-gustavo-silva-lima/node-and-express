import { VIEW_ELEMENTS } from "./index.tabs.script.js";

export function populateCPUView(DATA) {
  const VIEW_CONTENT_CONTAINER = document.querySelector(
    ".container__view--cpus__data-list",
  );

  DATA["cpus"].forEach((cpu, index) => {
    const model = cpu.model;
    const speed = (cpu.speed / 1000).toFixed(2);

    VIEW_CONTENT_CONTAINER.innerHTML += `
      <li class="container__view--cpus__data-list__container">
        <p class="container__view--cpus__data-list__container__title">
          Núcleo ${index + 1}:
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
  });

  const VIEW_ELEMENT = VIEW_CONTENT_CONTAINER.parentElement;

  VIEW_ELEMENTS.push(VIEW_ELEMENT);
}
