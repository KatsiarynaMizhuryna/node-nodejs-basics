import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("node:fs/promises");
const path = require("path");
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileToRead = "fileToRead.txt";
const filePath = path.join(__dirname, "files", fileToRead);

const read = async () => {
  try {
    await fs.access(filePath);
    const content = await fs.readFile(filePath, "utf-8");
    console.log(`Content of ${fileToRead}:`);
    console.log(content);
  } catch (error) {
    throw new Error(`FS operation failed: File '${fileToRead}' does not exist`);
  }
};

await read();
