import { populateSystemView } from "./index.system-view.script.js";
import {} from "./index.tabs.script.js";

export const DATA = await (async () => {
  try {
    const res = await fetch(`${window.origin}/api/v1/metrics`);

    return await res.json();
  } catch {
    window.location.replace(`${window.origin}/not-found`);
  }
})();

populateSystemView(DATA);
