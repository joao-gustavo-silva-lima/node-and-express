import { populateCPUView } from "./index.cpu-view.script.js";
import { populateRAMView } from "./index.ram-view.script.js";
import { populateSystemView } from "./index.system-view.script.js";
import { populateTabsContainer } from "./index.tabs.script.js";

export const DATA = await (async () => {
  try {
    const res = await fetch(`${window.origin}/api/v1/metrics`);

    return await res.json();
  } catch {
    window.location.replace(`${window.origin}/not-found`);
  }
})();

populateTabsContainer();

populateSystemView(DATA);
populateCPUView(DATA);
populateRAMView(DATA);
