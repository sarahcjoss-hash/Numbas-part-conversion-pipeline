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
    writeReportToFile(reportString, filePath) {
        fs.writeFile(filePath, reportString, (err) => {
            if (err) {
                console.error('Error writing report to file:', err);
            } else {
                console.log('Report successfully written to file:', filePath);
            }
        });
    }

    createNewErrorReportFile(filePath) {
        const timestamp = new Date().toISOString();
        const initialContent = `Error report file created: ${timestamp}\n`;
        fs.writeFile(filePath, initialContent, (err) => {
            if (err) {  
                console.error('Error writing report to file:', err);
            } else {
                console.log('Report successfully written to file:', filePath);
            }
        });

    }
    appendToErrorReportFile(reportString, filePath) {
        fs.appendFile(filePath, reportString, 'utf8', (err) => {
            if (err) {
                console.error('Error appending to error report file:', err);
            } else {
                console.log('Successfully appended to error report file:', filePath);
            }
        });
    }

}








export { FileWriter };


