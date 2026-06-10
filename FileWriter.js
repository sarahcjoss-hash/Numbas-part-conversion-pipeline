import fs from 'fs';
import fsPromises from 'fs/promises';

class FileWriter {

    constructor() {
    }
    async stringifyJSONAndwriteToFile(jsonData, fileName) {
        try {
           const stringifiedData = JSON.stringify(jsonData, null, 2);
           //console.log(stringifiedData);
           const data = "// Numbas version: finer_feedback_settings\n" + stringifiedData;
            await fsPromises.writeFile(fileName, data, 'utf8');
        } catch (err) {
            console.error(`${err} error writing file`);
            throw new Error(`Error writing file ${fileName}`);
        }
    }
    //synchronous make directory
    createFolder(folderName) {
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }
        } catch (err) {
            console.error(`${err} error creating folder ${folderName}`);
            throw new Error(`Error creating folder ${folderName}`);
        }
    }
}








export { FileWriter };


