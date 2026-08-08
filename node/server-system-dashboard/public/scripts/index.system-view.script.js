import { VIEW_ELEMENTS } from "./index.tabs.script.js";

export function populateSystemView(DATA) {
  const VIEW_CONTENT_CONTAINER = document.querySelector(
    ".container__view--system__data-list",
  );

  for (const property of [
    "host",
    "arquitetura",
    "plataforma",
    "tempo de atividade",
  ]) {
    let value = DATA[property];

    if (property === "tempo de atividade") {
      value = formatUpTime(value);
    }

    VIEW_CONTENT_CONTAINER.innerHTML += `
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

  const VIEW_ELEMENT = VIEW_CONTENT_CONTAINER.parentElement;

  VIEW_ELEMENT.classList.add("container__view--active");

  VIEW_ELEMENTS.push(VIEW_ELEMENT);
}

function formatUpTime(upTime) {
  return `${Math.floor(upTime / 3600)} horas, ${Math.floor((upTime / 60) % 60)} minutos, ${Math.floor(upTime % 60)} segundos`;
}
