const fs = require('fs').promises;
const path = require('path');

const create = async () => {
    try {
        const filePath = path.join(__dirname, 'files', 'fresh.txt');

        try {
            await fs.access(filePath);
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