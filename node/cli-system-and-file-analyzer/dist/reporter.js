import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import { existsSync } from "node:fs";
const path = __require("node:path");
const LOG_DIRECTORY = path.join(__dirname, "..", "logs");
function chaseLogDirectory() {
    if (existsSync(LOG_DIRECTORY)) {
        return;
    }
    //CREATE IF DIR DOESN'T EXIST
}
//# sourceMappingURL=reporter.js.map