import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require('node:fs/promises');
const path = require('path');
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    try {
        const filePath = path.join(__dirname,'files', 'fresh.txt');

        try {
            await fs.stat(filePath);
            throw new Error('FS operation failed: File already exists');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.writeFile(filePath, 'I am fresh and young');
                console.log('File created successfully: fresh.txt');
            } else {
                throw err;
            }
        }
    } catch (error) {
        console.error(error.message);
    }
};

await create();
