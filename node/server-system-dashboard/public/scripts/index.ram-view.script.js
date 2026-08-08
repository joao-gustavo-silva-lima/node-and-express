import { VIEW_ELEMENTS } from "./index.tabs.script.js";

export function populateRAMView(DATA) {
  const VIEW_CONTENT_CONTAINER = document.querySelector(
    ".container__view--ram__ranged-data",
  );

  const totalMemory = DATA["memória total"] / 1024 ** 3;
  const freeMemory = DATA["memória livre"] / 1024 ** 3;
  const consume = totalMemory - freeMemory;
  const percentage = Math.floor((consume * 100) / totalMemory);

  VIEW_CONTENT_CONTAINER.innerHTML = `
    <input
      class="container__view--ram__ranged-data__usage-bar"
      type="range"
      value="${percentage}"
      max="100"
      min="0"
      disabled
    />
    <p class="container__view--ram__ranged-data__fraction">
      ${consume.toFixed(2)} GB / ${totalMemory.toFixed(2)} GB
    </p>
  `;

  const VIEW_ELEMENT = VIEW_CONTENT_CONTAINER.parentElement;

  VIEW_ELEMENTS.push(VIEW_ELEMENT);
}
