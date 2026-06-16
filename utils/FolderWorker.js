import fs from 'fs';
import fsPromises from 'fs/promises';

class FolderWorker {
    constructor(errorReporter) {
        this._errorReporter = errorReporter;
    }
    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'FolderWorker'}: ${additional} : ${err.message}`
        this._errorReporter.reportError(err);
    }

    //function to copy a folder and all its contents to a new location
    async copyFolder(source, destination) {
        try {
            await fsPromises.cp(source, destination, { recursive: true });
            return true;
        } catch (err) {
            this.reportError(err, `Error copying folder from ${source} to ${destination}`);
            throw new Error(`Error copying folder from ${source} to ${destination}`);
            return false;
        }
    }
    //function to open a folder find all files with a certain name and return an array of their paths
    async findFilesInFolder(folderPath, fileName) {
        try {
            const files = await fsPromises.readdir(folderPath);
            const matchingFiles = files.filter(file => file === fileName);
            return matchingFiles.map(file => `${folderPath}/${file}`);
        } catch (err) {
            this.reportError(err, `Error finding files in folder ${folderPath}`);
            throw new Error(`Error finding files in folder ${folderPath}`);
        }
    }
    //function to copy all files in a folder to a new location
    async copyFilesInFolder(sourceFolder, destinationFolder) {
        try {
            const files = await fsPromises.readdir(sourceFolder);
            for (const file of files) {
                const sourcePath = `${sourceFolder}/${file}`;
                const destinationPath = `${destinationFolder}/${file}`;
                await fsPromises.copyFile(sourcePath, destinationPath);
            }
        } catch (err) {
            this.reportError(err, `Error copying files from folder ${sourceFolder} to ${destinationFolder}`);
            throw new Error(`Error copying files from folder ${sourceFolder} to ${destinationFolder}`);
        }

    }

}
export { FolderWorker };