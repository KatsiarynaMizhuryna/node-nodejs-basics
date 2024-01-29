import { createRequire } from "module";
const require = createRequire(import.meta.url);
const path = require("path");
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { spawn } = require("child_process");

const filePath = path.join(__dirname, "files", "script.js");

const spawnChildProcess = async (args) => {
  const child = spawn("node", [filePath, ...args], {
    stdio: ["pipe", "pipe", "pipe", "ipc"],
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
    process.exit(code);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([
  "someArgument1",
  "someArgument2",
  "someArgument3",
  "someArgument4",
]);
