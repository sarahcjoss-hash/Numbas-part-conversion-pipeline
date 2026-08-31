import { execFileSync } from 'child_process';
import fs from 'fs';
import fsPromises from 'fs/promises';
import pathModule from 'path';

class FolderWorker {
    constructor(errorReporter) {
        this._errorReporter = errorReporter;
        function browseForDirectory() {
        const powershellScript = `
        Add-Type -AssemblyName System.Windows.Forms
        $dialog = New-Object System.Windows.Forms.FolderBrowserDialog
        $dialog.Description = 'Select the folder containing files_to_convert'
        $dialog.ShowNewFolderButton = $false
        if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
      [Console]::WriteLine($dialog.SelectedPath)
        }
        `;

            return execFileSync('powershell.exe', ['-NoProfile', '-STA', '-Command', powershellScript], {
                encoding: 'utf8'
            }).trim();
        }

        const selectedDirectory = browseForDirectory();
        if (!selectedDirectory) {
            console.log('No folder selected. Exiting.');
            process.exit(0);
        }
        this._folderPath = pathModule.resolve(selectedDirectory);
        this._reportsPath = pathModule.dirname(selectedDirectory);
        
    }
    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'FolderWorker'}: ${additional} : ${err.message}`
        this._errorReporter.reportError(err);
    }
    set workingFolder(wf) {
        this._workingFolder = wf;
    }
    get workingFolder() {
        return this._workingFolder;
    }
    get examFolderName(){
        if (!this._workingFolder) {
            throw new Error('Working folder is not set');
        }
         return pathModule.relative(this._folderPath, this._workingFolder);
           
    }
    get outputExamFolderName(){
        return pathModule.join(this.outputFolderPath, this.examFolderName);
    }
    get reportsPath() {
        return pathModule.join(this._reportsPath, 'reports');
    }

    set folderPath(folderPath) {
        this._folderPath = folderPath;
    }
    get folderPath() {
        return this._folderPath;
    }
    get outputFolderPath() {
        return pathModule.join(this._reportsPath, 'output');
    }
    get errorFolderPath() {
        return pathModule.join(this._reportsPath, 'error_files');
    }
    get reportFolderPath() {
        return pathModule.join(this._reportsPath, 'reports');
    }
    get overviewReportsPath() {
        return this._reportsPath;
    }
    createNewFolderStructure() {
        //create 3 folders within the reportsPath folder, output, error_files, reports
        try {
            const outputPath = this.outputFolderPath;
            const errorFilePath = this.errorFolderPath;
            const reportFilePath = this.reportFolderPath;   
        Promise.all([
            fsPromises.mkdir(`${outputPath}`, { recursive: true }),
            fsPromises.mkdir(`${errorFilePath}`, { recursive: true }),
            fsPromises.mkdir(`${reportFilePath}`, { recursive: true })]);
        return true;    
        } catch (err) {
            this.reportError(err, `Error creating new folder structure ${this._folderPath}`);
            throw new Error(`Error creating new folder structure ${this._folderPath}`);
        }  
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
    async findFoldersInFolder() {
        try {
            const files = await fsPromises.readdir(this._folderPath);
            const folders = await Promise.all(files.map(async (file) => {
                const folderPath = pathModule.join(this._folderPath, file);
                try {
                    const stat = await fsPromises.stat(folderPath);
                    if (!stat.isDirectory()) {
                        return null;
                    }

                    await fsPromises.access(pathModule.join(folderPath, 'source.exam'));
                    return folderPath;
                } catch {
                    return null;
                }
            }));

            return folders.filter(folderPath => folderPath !== null);
        } catch (err) {
            this.reportError(err, `Error finding folders in folder ${this._folderPath}`);
            throw new Error(`Error finding folders in folder ${this._folderPath}`);
        }
    }
    async createNewFolderStructure() {
        //create 3 folders within the target folder, output, error_files, reports
        try {
            const fp = this._reportsPath;
            const outputPath = pathModule.join(fp, 'output');
            const errorFilePath = pathModule.join(fp, 'error_files');
            const reportFilePath = pathModule.join(fp, 'reports');
            Promise.all([
                fsPromises.mkdir(`${outputPath}`, { recursive: true }),
                fsPromises.mkdir(`${errorFilePath}`, { recursive: true }),
                fsPromises.mkdir(`${reportFilePath}`, { recursive: true })]);
            return true;

        } catch (err) {
            this.reportError(err, `Error creating new folder structure ${fp}`);
            throw new Error(`Error creating new folder structure ${fp}`);
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