import fs from 'fs';
import fsPromises from 'fs/promises';

class FileWriter {

    constructor() {
    }
    async writeJSONToFile(jsonData, fileName) {
        try {
            const data = JSON.stringify(jsonData, null, 2);
            await fsPromises.writeFile(fileName, data, 'utf8');
        } catch (err) {
            console.error(`${err} error writing file`);
            throw new Error(`Error writing file ${fileName}`);
        }
    }
}
           







export { FileWriter };


