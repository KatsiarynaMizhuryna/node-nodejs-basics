import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const path = require("path");
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files", "fileToCalculateHashFor.txt");
const hash = createHash("sha256");

const calculateHash = async () => {
  const readableStream = createReadStream(filePath);

  return new Promise((resolve, reject) => {
    readableStream.on("data", (chunk) => {
      hash.update(chunk);
    });
    readableStream.on("error", (error) => {
      reject(error);
    });
    readableStream.on("end", () => {
      const hashResult = hash.digest("hex");
      console.log(`HASHRESULT: ${hashResult}`);
      resolve(hashResult);
    });
  });
};

await calculateHash();
