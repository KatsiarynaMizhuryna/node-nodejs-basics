import path, { dirname } from "path";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const aPath = path.join(__dirname, "files", "a.json");
const bPath = path.join(__dirname, "files", "b.json");

const random = Math.random();
const a = await readFile(aPath);
const b = await readFile(bPath);

let unknownObject;

if (random > 0.5) {
  unknownObject = JSON.parse(a);
} else {
  unknownObject = JSON.parse(b);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
