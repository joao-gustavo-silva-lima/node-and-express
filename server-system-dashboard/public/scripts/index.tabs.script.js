const TABS_CONTAINER = document.querySelector(".container__tabs");

const TAB_ELEMENTS = [];

function focusView(classModifier) {
  const focusedTabClass = `container__tabs__tab--${classModifier}`;

  TAB_ELEMENTS.forEach((tab) => {
    const isFocusedTab = tab.classList.contains(focusedTabClass);

    tab.classList[isFocusedTab ? "add" : "remove"](
      "container__tabs__tab--active",
    );
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

  TABS_CONTAINER.lastElementChild.addEventListener("click", () =>
    focusView(classModifier),
  );

  TAB_ELEMENTS.push(TABS_CONTAINER.lastElementChild);
});
