import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const path = require("path");
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFilePath = path.join(__dirname, "files", "fileToCompress.txt");
const outputFilePath = path.join(__dirname, "files", "archive.gz");

const compress = async () => {
  const readStream = createReadStream(inputFilePath);
  const writeStream = createWriteStream(outputFilePath);
  const gzipStream = createGzip();

  try {
    await pipeline(readStream, gzipStream, writeStream);
    console.log(`File compressed successfully to ${outputFilePath}`);
  } catch (error) {
    console.error(`Error compressing file: ${error.message}`);
  }
};

await compress();
