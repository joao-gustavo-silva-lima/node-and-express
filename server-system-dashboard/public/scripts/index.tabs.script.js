const TABS_CONTAINER = document.querySelector(".container__tabs");

const TAB_ELEMENTS = [];
export const VIEW_ELEMENTS = [];

function activeTargetElement(elementCollection, baseClass, classModifier) {
  const targetClass = `${baseClass}--${classModifier}`;

  elementCollection.forEach((element) => {
    const isTarget = element.classList.contains(targetClass);

    element.classList[isTarget ? "add" : "remove"](`${baseClass}--active`);
  });
}

[
  ["Sistema", "system", "desktop-outline"],
  ["CPU", "cpus", "hardware-chip-outline"],
  ["RAM", "ram", "stats-chart-outline"],
].forEach(([tabName, classModifier, ionIconName], index) => {
  TABS_CONTAINER.insertAdjacentHTML(
    "beforeend",
    `
    <a 
      class="
        container__tabs__tab container__tabs__tab--${classModifier}
        ${index === 0 ? "container__tabs__tab--active" : ""}
      " 
      href="#${tabName.toLowerCase()}"
    >
      <ion-icon 
        class="container__tabs__tab__icon" 
        name="${ionIconName}"
      >
      </ion-icon>
      <p class="container__tabs__tab__name">${tabName}</p>
    </a>
  `,
  );

  TABS_CONTAINER.lastElementChild.addEventListener("click", () => {
    activeTargetElement(TAB_ELEMENTS, "container__tabs__tab", classModifier);
    activeTargetElement(VIEW_ELEMENTS, "container__view", classModifier);
  });

  TAB_ELEMENTS.push(TABS_CONTAINER.lastElementChild);
});
