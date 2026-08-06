import { VIEW_ELEMENTS } from "./index.tabs.script.js";

export function populateRAMView(DATA) {
  const VIEW_CONTENT_CONTAINER = document.querySelector(
    ".container__view--ram__ranged-data",
  );

  VIEW_CONTENT_CONTAINER.innerHTML = `
    <input
      class="container__view--ram__ranged-data__usage-bar"
      type="range"
      value="0"
      max="100"
      min="0"
      disabled
    />
    <p class="container__view--ram__ranged-data__fraction"></p>
  `;

  const VIEW_ELEMENT = VIEW_CONTENT_CONTAINER.parentElement;

  VIEW_ELEMENTS.push(VIEW_ELEMENT);
}
