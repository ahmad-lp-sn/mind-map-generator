import { install } from "source-map-support";
import fs from "fs";
import "express-async-errors";
import { config } from "./config";

install();

for (let key in config.storage.folders) {
  const folderPath = config.storage.folders[key];
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
}
