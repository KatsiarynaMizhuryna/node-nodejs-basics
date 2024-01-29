import { Worker } from "node:worker_threads";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "worker.js");

const numWorkers = os.cpus().length;
const results = [];
let numberToSend = 10;

const performCalculations = async () => {
  for (let i = 0; i < numWorkers; i++) {
    const workerPromise = new Promise((resolve, reject) => {
      const worker = new Worker(filePath, { workerData: numberToSend++ });
      //worker.postMessage(numberToSend++);
      worker.on("message", (message) => {
        resolve(message);
      });
      worker.on("error", (error) => {
        reject(error);
      });
    });
    const workerResult = await workerPromise;
    results.push({ status: "resolved", data: workerResult });
  }

  results.forEach((result) => console.log(`Result is ${result.data}`));
};

await performCalculations();
