import fs from 'fs';
import fsPromises from 'fs/promises';
import pathModule from 'path';

class FolderWorker {
    constructor(folderPath, errorReporter) {
        this._folderPath = folderPath;
        this._errorReporter = errorReporter;
    }
    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'FolderWorker'}: ${additional} : ${err.message}`
        this._errorReporter.reportError(err);
    }

    set folderPath(folderPath) {
        this._folderPath = folderPath;
    }
    get folderPath() {
        return this._folderPath;
    }
    get outputFolderPath() {
        return pathModule.join(this._folderPath, 'output');
    }   
    get errorFolderPath() {
        return pathModule.join(this._folderPath, 'error_files');
    }
    get reportFolderPath() {
        return pathModule.join(this._folderPath, 'reports');
    }
    get overviewReportsPath(){
        return this.folderPath;
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
    async findFoldersInFolder(folderPath) {
        try {
            const files = await fsPromises.readdir(folderPath);
            const matchingFiles = files.filter(file => fsPromises.stat(`${folderPath}/${file}`).then(stat => stat.isDirectory()));
            return matchingFiles.map(file => `${folderPath}/${file}`);
        } catch (err) {
            this.reportError(err, `Error finding folders in folder ${folderPath}`);
            throw new Error(`Error finding folders in folder ${folderPath}`);
        }
    }
    async createNewFolderStructure(folderPath) {
        //create 3 folders within the target folder, output, error_files, reports
        try {
            const fp = this._folderPath;
            const outputPath = pathModule.join(fp, 'output');
            const errorFilePath = pathModule.join(fp, 'error_files');
            const reportFilePath = pathModule.join(fp, 'reports');
            Promise.all([
                fsPromises.mkdir(`${outputPath}`, { recursive: true }),
                fsPromises.mkdir(`${errorFilePath}`, { recursive: true }),
                fsPromises.mkdir(`${reportFilePath}`, { recursive: true })]);
            return true;

        } catch (err) {
            this.reportError(err, `Error creating new folder structure ${folderPath}`);
            throw new Error(`Error creating new folder structure ${folderPath}`);
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