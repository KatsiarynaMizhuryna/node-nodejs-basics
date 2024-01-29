import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("node:fs/promises");
const path = require("path");
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFileName = "properFilename.md";
const destinationFileName = "wrongFilename.txt";
const sourceFilePath = path.join(__dirname, "files", sourceFileName);
const destinationFilePath = path.join(__dirname, "files", destinationFileName);

const rename = async () => {
  try {
    await fs.access(sourceFilePath, fs.constants.F_OK);
    await fs.rename(sourceFilePath, destinationFilePath);
    console.log(
      "File renamed successfully: wrongFilename.txt -> properFilename.md"
    );
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("FS operation failed: Source file does not exist");
    } else if (error.code === "EEXIST") {
      console.error("FS operation failed: Destination file already exists");
    } else {
      console.error(error.message);
    }
  }
};

await rename();
