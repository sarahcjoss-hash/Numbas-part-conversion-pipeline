import { FileReader } from './fileReader.js';
import { ExamFromJSON } from './ExamFromJSON.js';
import { ReportWriter } from './ReportWriter.js';
import { ErrorReporter } from './ErrorReporter.js';
import { ExamUpdater } from './ExamUpdater.js';
import { JSONFromExam } from './JSONFromExam.js';
import { FileWriter } from './FileWriter.js';
import { FolderWorker } from './FolderWorker.js';
import { Exam } from './existing_parts/Exam.js';


// to do
//create a UI that allows user to browse to a folder
//find all the folder in the path and look for exam files
//or if the folder contains question.exam i.e. single exam files- use those 
//but for single exam files we need to alter converter to read without all the exam, questions groups etc.
//handle no exam files found
//create a folder to outout the new exam files
//create somewhere for files we could not process
const path = "C:/work/sample_exams/";
const folder = "examples-exam-source/";
const examFolder = `${path}${folder}`;
//const examFile = path + folder + 'source.exam';
const filereader = new FileReader();
const filewriter = new FileWriter();
const reportWriter = new ReportWriter();
const errorReporter = new ErrorReporter(true, `${folder}`);
const folderWorker = new FolderWorker(errorReporter);

//open folder and find source.exam files
//copy the directory including all files to a new folder called updated_examname
//create a new exam file in the new folder with the updated JSON

async function processExam() {
  try {
    const examFiles = await folderWorker.findFilesInFolder(examFolder, 'source.exam');
    const line = await filereader.getSpecifiedLineInFileAsync(examFiles[0], 2);
    const success = await folderWorker.copyFolder(examFolder, `${path}updated_exam`);
    const examData = JSON.parse(line);
    const exam = new ExamFromJSON(examData, errorReporter);
    const report = reportWriter.createReport(exam.exam);
    const examUpdater = new ExamUpdater(errorReporter);
    examUpdater.updateExam(exam.exam, errorReporter);//NB! this is the same exam as above not a new object- just a transforamtion process  const updatedJSON = new JSONFromExam(updatedExam, examData, errorReporter)
    const updatedJSONMaker = new JSONFromExam(errorReporter);
    const updatedJsonObj = updatedJSONMaker.processExam(exam.exam, examData);

    const folderName = `${examFolder}/updated_exam`;
    //filewriter.createFolder(`${path}${folder}/${folderName}`);
    //these are async but not dependent
    if (success && updatedJsonObj) {
      filewriter.stringifyJSONAndwriteToFile(examData, `${path}updated_exam/source.exam`);
    } else {
      errorReporter.reportError(new Error('Unable to write updated exam file as either copying folder or creating updated JSON object was unsuccessful'), 'Unable to write updated exam file');
    }
    //filewriter.writeJSONToFile(updatedJSON, `${path}${folder}/${folderName}/source.exam`);
    reportWriter.writeReportToFile(report, 'exam_report.txt');
    reportWriter.writeReportToFile(reportWriter.createErrorReport(examData.name, errorReporter), 'error_report.txt');
    //console.log(report);
  } catch (error) {
    console.error('Error occurred while processing exam:', error);
  }
}   //console.log(report);


processExam()

