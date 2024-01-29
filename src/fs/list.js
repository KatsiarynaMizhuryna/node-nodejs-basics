import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("node:fs/promises");
const path = require("path");
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, "files");

const list = async () => {
  try {
    await fs.access(folderPath);
    const files = await fs.readdir(folderPath);
    console.log("Files in the folder:");
    files.forEach((file) => {
      console.log(file);
    });
  } catch (error) {
    throw new Error("FS operation failed: Folder does not exist");
  }
};

await list();
