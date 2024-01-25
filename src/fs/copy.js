import { createRequire } from "module";
import * as fs from "fs";
const require = createRequire(import.meta.url);
const path = require('path');
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFolder = path.join(__dirname, 'files');
const destinationFolder = path.join(__dirname, 'files_copy');

const copy = async () => {
  try {
   await fs.promises.access(sourceFolder);
    if (!fs.existsSync(sourceFolder)) {
     throw new Error('FS operation failed: Source folder does not exists');
    }

    if (fs.existsSync(destinationFolder)) {
     throw new Error('FS operation failed: Destination folder already exists');
    }
     const files = await fs.promises.readdir(sourceFolder, { withFileTypes: true });
     await fs.promises.mkdir(destinationFolder);
      console.log(`Folder ${destinationFolder} created successfully`);

  files.forEach((file) => {
    const sourceFile = path.join(sourceFolder, file.name);
    const destinationFile = path.join(destinationFolder, file.name);

    if (file.isDirectory()) {
      fs.promises.mkdir(destinationFile);
      copy(sourceFile, destinationFile);
     }
     else {
      fs.promises.copyFile(sourceFile, destinationFile);
      }
   })
    console.log('Folder copied successfully: files_copy');
  } catch (err) {
     console.error(err.message);
  }
};

await copy();