import { createReadStream, createWriteStream } from "node:fs";
import { createGunzip } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const path = require("path");
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFilePath = path.join(__dirname, "files", "archive.gz");
const outputFilePath = path.join(__dirname, "files", "fileToCompress.txt");

const decompress = async () => {
  const readStream = createReadStream(inputFilePath);
  const writeStream = createWriteStream(outputFilePath);
  const gunzipStream = createGunzip();

  try {
    await pipeline(readStream, gunzipStream, writeStream);
    console.log(`File decompressed successfully to ${outputFilePath}`);
  } catch (error) {
    console.error(`Error decompressing file: ${error.message}`);
  }
};

await decompress();
