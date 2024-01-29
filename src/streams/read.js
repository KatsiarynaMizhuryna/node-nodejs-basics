import { createReadStream } from "node:fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const path = require("path");
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files", "fileToRead.txt");

const read = async () => {
  const readStream = createReadStream(filePath, { encoding: "utf-8" });

  readStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on("end", () => {
    process.stdout.write("\n");
  });

  readStream.on("error", (error) => {
    console.error(`Error reading file: ${error.message}`);
  });
};

await read();
