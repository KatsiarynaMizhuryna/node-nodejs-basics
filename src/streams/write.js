import { createWriteStream } from "node:fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const path = require("path");
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files", "fileToWrite.txt");

const write = async () => {
  const writeStream = createWriteStream(filePath, { encoding: "utf-8" });

  process.stdin.pipe(writeStream);
  process.stdin.end();

  writeStream.on("finish", () => {
    console.log(`Data written to ${filePath}`);
  });

  writeStream.on("error", (error) => {
    console.error(`Error writing to file: ${error.message}`);
  });
};

await write();
