import { FileReader } from './utils/FileReader.js';
import { ExamFromJSON } from './JSON_providers_and_workers/ExamFromJSON.js';
import { JSONFromExam } from './JSON_providers_and_workers/JSONFromExam.js';
import { ReportWriter } from './utils/ReportWriter.js';
import { ErrorReporter } from './utils/ErrorReporter.js';
import { ExamUpdater } from './ExamUpdater.js';
import { FileWriter } from './utils/FileWriter.js';
import { FolderWorker } from './utils/FolderWorker.js';
import { execFileSync } from 'child_process';
import fs from 'fs';
import fsPromises from 'fs/promises';
import pathModule from 'path';

//the folderWorker takes responsibility for selecting folder and creating the output folder structure
const errorReporter = new ErrorReporter(true);
let folderWorker = new FolderWorker(errorReporter);
const filereader = new FileReader(errorReporter);
const reportWriter = new ReportWriter();//initialisingthe report writer creates the master report and batch report and CSV report ready to append

let folders = await folderWorker.findFoldersInFolder();//find the folders first
while (folders.length === 0) {
  console.warn('No folders containing a source.exam file were found. Please select another directory.');
  folderWorker = new FolderWorker(errorReporter);
  folders = await folderWorker.findFoldersInFolder();
}

const filewriter = new FileWriter(folderWorker, errorReporter);

const overviewReportsPath = folderWorker.overviewReportsPath;
const postfix = folderWorker.postfix;
const masterErrorReportPath = `${overviewReportsPath}/master_error_report_${postfix}.txt`;
const masterReportPath = `${overviewReportsPath}/master_report_${postfix}.csv`;
const batchReportPath = `${overviewReportsPath}/batch_report_${postfix}.txt`;
filewriter.createNewErrorReportFile(masterErrorReportPath);
filewriter.writeReportToFile(reportWriter.outputCSV, masterReportPath);
filewriter.writeReportToFile(reportWriter.appendToBatchReport(`Batch report for files in ${overviewReportsPath}`), batchReportPath);
folderWorker.createNewFolderStructure(folderWorker.outputPath);



//set up output folder structure
await folderWorker.createNewFolderStructure();


//open folder and find source.exam files
//copy the directory including all files to a new folder called updated_examname
//create a new exam file in the new folder with the updated JSON

async function processExam(workingFolder) {
  try {
    folderWorker.workingFolder = workingFolder;
    const examFolderName = folderWorker.examFolderName;
    const updatedExamFolderName = folderWorker.outputExamFolderName;
    const examFiles = await folderWorker.findFilesInFolder(workingFolder, 'source.exam');
    const line = await filereader.getSpecifiedLineInFileAsync(examFiles[0], 2);

    const examJSONObj = JSON.parse(line);
    const examErrorReporter = new ErrorReporter(true);
    const exam = new ExamFromJSON(examJSONObj, examErrorReporter);    
    examErrorReporter.name = exam.exam.name;//although it has already been used we cannot rename it until after the exam has been created as the name is not known until then
    const report = reportWriter.createReport(exam.exam);
    const examUpdater = new ExamUpdater(examErrorReporter);
    examUpdater.updateExam(exam.exam, examErrorReporter);//NB! this is the same exam as above not a new object- just a transforamtion process  const updatedJSON = new JSONFromExam(updatedExam, examData, errorReporter)
    const examJSONStitcher = new JSONFromExam(examErrorReporter);
    const processSuccess = examJSONStitcher.processExam(exam.exam, examJSONObj);//this is probably hte same JSON object
    console.log(`Exam processing ${processSuccess ? 'succeeded' : 'failed'}`);
     console.log('errors tally ' + examErrorReporter.errors.length)
    let hasCustomPartsFlag = false;
    if (!processSuccess) {
      reportWriter.appendToBatchReport("\n There was an issue processing this exam\n");
    } else {
      reportWriter.appendToBatchReport(`\n Exam contains ${exam.exam.numberOfQuestions} questions\n`);
      if (exam.exam.extensionsFromQuestions && exam.exam.extensionsFromQuestions.length > 0) {
        hasCustomPartsFlag = true;
        reportWriter.appendToBatchReport(`\n Exam contains custom parts\n ${exam.exam.extensionsFromQuestions}\n`);
      }

    }

   

    //these are async but not dependent
    if (processSuccess && hasCustomPartsFlag) {
      const success = await folderWorker.copyFolder(workingFolder, updatedExamFolderName);
      //only do this if the folder actually contins cusomt parts
      reportWriter.appendToCSV(`${examFolderName},${exam.exam.name},${exam.exam.numberOfQuestions},${hasCustomPartsFlag},${hasCustomPartsFlag ? exam.data.extensions.join(';') : 'N/A'},${hasCustomPartsFlag ? exam.exam.questionsWithCustomParts.join(';') : 'N/A'},${examErrorReporter.errors.length > 0 ? 'Errors reported' : 'No errors reported'}\n`);
      //${exam.exam.extensionsFromQuestions.join(',')},${exam.exam.questionsWithCustomParts.join(',')},${examErrorReporter.errorReport ? 'Errors reported' : 'No errors reported'}\n`);
      if (success) {
        filewriter.stringifyJSONAndwriteToFile(examJSONObj, `${updatedExamFolderName}/source.exam`);

      }
    } else {
      if (!hasCustomPartsFlag) {
        reportWriter.appendToBatchReport("Exam bypassed- no conversion required\n");
        reportWriter.appendToCSV(`${examFolderName},${exam.exam.name},${exam.exam.numberOfQuestions},${hasCustomPartsFlag},,,\n`);
      } else {
        examErrorReporter.reportError(new Error('Unable to write updated exam file as either copying folder or creating updated JSON object was unsuccessful'), 'Unable to write updated exam file');

      }
    }

    filewriter.writeReportToFile(report, `${folderWorker.reportFolderPath}\\${examFolderName}_report.txt`);
    filewriter.appendToErrorReportFile(examErrorReporter.errorReport, masterErrorReportPath);
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
  //console.log(processed);
  reportWriter.appendToBatchReport(`${processed ? '' : 'ERROR:'}Exam folder ${examFolder} processed ${processed ? 'successfully\n' : 'with errors'}\n`);
  //add an overall log here
}
//output the report at teh end
filewriter.writeReportToFile(reportWriter.batchReport, batchReportPath);
filewriter.writeReportToFile(reportWriter.outputCSV, masterReportPath);




