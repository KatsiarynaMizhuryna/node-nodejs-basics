import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("node:fs/promises");
const path = require("path");
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileToRemove = "fileToRemove.txt";
const filePath = path.join(__dirname, "files", fileToRemove);

const remove = async () => {
  try {
    await fs.unlink(filePath);
    console.log(`File deleted successfully: ${fileToRemove}`);
  } catch (error) {
    throw new Error(
      `FS operation failed: File '${fileToRemove}' does not exist`
    );
  }
};

await remove();
