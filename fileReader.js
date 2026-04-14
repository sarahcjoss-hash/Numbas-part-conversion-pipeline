class FileReader {

    constructor() {
        const fs = require('fs').promises;

    }
    async readFileAsync(fileName) {
        try {
            const data = await fs.readFile(fileName, 'utf8');
            return (data);
        } catch (err) {
            if (err.code === 'ENOENT') {
                return new Error(`Config file ${filename} not found`);
            } else if (err.code === 'EACCES') {
                return new Error(`No permission to read ${filename}`);
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
            console.error(`${err} error finding files in folder`);
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
                    return callback(new Error(`Config file ${filename} not found`));
                } else if (err.code === 'EACCES') {
                    return callback(new Error(`No permission to read ${filename}`));
                }
                // For all other errors
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
export { FileReader as default };


