import fs from 'fs';
import fsPromises from 'fs/promises';

class FileReader {

    constructor(errorReporter) {
        this._errorReporter = errorReporter;    
    }
    
reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'FileReader'}: ${additional} : ${err.message}`
        this._errorReporter.reportError(err);
    }
    
    async readFileAsync(fileName) {
        try {
            const data = await fsPromises.readFile(fileName, 'utf8');
            return (data);
        } catch (err) {
            if (err.code === 'ENOENT') {
                this._errorReporter.reportError(new Error(`Config file ${fileName} not found`), 'File not found');
            } else if (err.code === 'EACCES') {
                this._errorReporter.reportError(new Error(`No permission to read ${fileName}`), 'Permission denied');
            }
            return err;
        }
    }

    //returns a array of string
    getFilesInFolder(folderName) {

        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
                return [];
            } else {
                return fs.readdirSync(folderName);
            }
        } catch (err) {
            this.reportError(err, 'Error finding files in folder');
            return [];
        }
    }

    async getSpecifiedLineInFileAsync(fileName, lineNumber) {
        try {
            const data = await this.readFileAsync(fileName);
            if (data instanceof Error) {
                return data; // Return the error if readFile failed
            }
            const lines = data.split('\n');
            if (lineNumber < 1 || lineNumber > lines.length) {
                return new Error(`Line number ${lineNumber} is out of range`);
            }
            return lines[lineNumber - 1];
        } catch (err) {
            console.error(`${err} error reading file`);
            return new Error(`Error reading file ${fileName}`);
        }
    }


    //non async version uses callback
    readConfigFileAndCallback(filename, callback) {
        console.log('here')
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                // Handle specific error types
                if (err.code === 'ENOENT') {
                    this._errorReporter.reportError(new Error(`Config file ${filename} not found`), 'File not found');
                    return callback(err);
                } else if (err.code === 'EACCES') {
                    this._errorReporter.reportError(new Error(`No permission to read ${filename}`), 'Permission denied');
                    return callback(err);
                }
                // For all other errors
                this._errorReporter.reportError(new Error(`Error reading file ${filename}`), 'Error reading file');
                return callback(err);
            }

            // Process data if no error
            try {
                parseThisJSON(data, callback)

            } catch (parseError) {
                callback(new Error(`Invalid JSON in ${filename}`));
            }
        });
    }
}
export { FileReader};


