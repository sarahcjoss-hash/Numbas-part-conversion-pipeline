import { FileReader } from './utils/FileReader.js';
import { ExamFromJSON } from './JSON_providers_and_workers/ExamFromJSON.js';
import { JSONFromExam } from './JSON_providers_and_workers/JSONFromExam.js';
import { ReportWriter } from './utils/ReportWriter.js';
import { ErrorReporter } from './utils/ErrorReporter.js';
import { ExamUpdater } from './ExamUpdater.js';
import { FileWriter } from './utils/FileWriter.js';
import { FolderWorker } from './utils/FolderWorker.js';
import fs from 'fs';
import fsPromises from 'fs/promises';



// to do
//create a UI that allows user to browse to a folder

//create somewhere for files we could not process
//create somewhere for the reports
const path = "C:/work/sample_exams/";
const folder = "files_to_convert/";
const inputFolder = `${path}${folder}`;

const outputPath = `${path}output`;
const errorFilePath = `${path}error_files`;
const reportFilePath = `${path}reports`;
const errorReporter = new ErrorReporter(true, `${folder}`);
const filereader = new FileReader(errorReporter);
const filewriter = new FileWriter(errorReporter);
const reportWriter = new ReportWriter();
const folderWorker = new FolderWorker(errorReporter);
const folders = await folderWorker.findFoldersInFolder(inputFolder);//find the folders first
//set up output folder structure
await fsPromises.mkdir(`${outputPath}`, { recursive: true });
await fsPromises.mkdir(`${errorFilePath}`, { recursive: true });
await fsPromises.mkdir(`${reportFilePath}`, { recursive: true });

//open folder and find source.exam files
//copy the directory including all files to a new folder called updated_examname
//create a new exam file in the new folder with the updated JSON

async function processExam(workingFolder) {
  try {
    const examFolderName = `${workingFolder}`.replace(`${inputFolder}/`,'');
    const updatedExamFolderName =`${outputPath}/${examFolderName}`
    const examFiles = await folderWorker.findFilesInFolder(workingFolder, 'source.exam');
    const line = await filereader.getSpecifiedLineInFileAsync(examFiles[0], 2);
    const success = await folderWorker.copyFolder(workingFolder, updatedExamFolderName);
    const examJSONObj = JSON.parse(line);
    const exam = new ExamFromJSON(examJSONObj, errorReporter);
    const report = reportWriter.createReport(exam.exam);
    const examUpdater = new ExamUpdater(errorReporter);
    examUpdater.updateExam(exam.exam, errorReporter);//NB! this is the same exam as above not a new object- just a transforamtion process  const updatedJSON = new JSONFromExam(updatedExam, examData, errorReporter)
    const examJSONStitcher = new JSONFromExam(errorReporter);
    const processSuccess =examJSONStitcher.processExam(exam.exam, examJSONObj);//this is probably hte same JSON object
    console.log(`Exam processing ${processSuccess ? 'succeeded' : 'failed'}`);

 
    //these are async but not dependent
    if (success && processSuccess) {
      filewriter.stringifyJSONAndwriteToFile(examJSONObj, `${updatedExamFolderName}/source.exam`);
    } else {
      errorReporter.reportError(new Error('Unable to write updated exam file as either copying folder or creating updated JSON object was unsuccessful'), 'Unable to write updated exam file');
    }
  
    reportWriter.writeReportToFile(report, `${reportFilePath}\\${examFolderName}_report.txt`);
    reportWriter.writeReportToFile(reportWriter.createErrorReport(examJSONObj.name, errorReporter), errorFilePath+`/${examFolderName}_error.txt`);
    //console.log(report);
  } catch (error) {
    console.error('Error occurred while processing exam:', error);
    return false;
  }
  return true;
}   //console.log(report);
//could do this as a promise but it is not going to be so slow we need to run synchronoulsy


for (const examFolder of folders) {
    const processed = await await processExam(examFolder);
    console.log(processed);
    //add an overall log here
  }


