import { Transform } from "node:stream";

const transform = async () => {
  const newTransform = new Transform({
    transform(chunk, encoding, callback) {
      const newText = chunk.toString().split("").reverse().join("");
      this.push(newText);
      callback();
    },
  });
  process.stdin.pipe(newTransform).pipe(process.stdout);
};

await transform();
