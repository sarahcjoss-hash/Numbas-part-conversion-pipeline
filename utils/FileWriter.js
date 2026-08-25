import fs from 'fs';
import fsPromises from 'fs/promises';

class FileWriter {

    constructor(fw, errorReporter) {
        this.folderWorker = fw;
        this.errorReporter = errorReporter;
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
//leave making directories to folderWorker
}








export { FileWriter };


