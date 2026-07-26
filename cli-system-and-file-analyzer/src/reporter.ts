import { existsSync } from "node:fs";
import path = require("node:path");

const LOG_DIRECTORY = path.join(__dirname, "..", "logs");

function chaseLogDirectory() {
  if (existsSync(LOG_DIRECTORY)) {
    return;
  }
  //CREATE IF DIR DOESN'T EXIST
}
