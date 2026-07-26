"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const path = require("node:path");
const LOG_DIRECTORY = path.join(__dirname, "..", "logs");
function chaseLogDirectory() {
    if ((0, node_fs_1.existsSync)(LOG_DIRECTORY)) {
        return;
    }
    //CREATE IF DIR DOESN'T EXIST
}
//# sourceMappingURL=reporter.js.map