import { FileReader } from './fileReader.js';
import { ExamFromJSON } from './ExamFromJSON.js';
import { ReportWriter } from './ReportWriter.js';
import { ErrorReporter } from './ErrorReporter.js';
import { ExamUpdater } from './ExamUpdater.js';
import { JSONFromExam } from './JSONFromExam.js';
import { FileWriter } from './FileWriter.js';


// to do
//create a UI that allows user to browse to a folder
//find all the folder in the path and look for exam files
//or if the folder contains question.exam i.e. single exam files- use those 
//but for single exam files we need to alter converter to read without all the exam, questions groups etc.
//handle no exam files found
//create a folder to outout the new exam files
//create somewhere for files we could not process
const path = "C:/work/UTL-Numbas_Part_Converter/";
const folder = "sample_exams/";

const examFile = path + folder + 'source.exam';
const filereader = new FileReader();
const filewriter = new FileWriter();
const reportWriter = new ReportWriter();
const errorReporter = new ErrorReporter(true, `${examFile}`);

filereader.getSpecifiedLineInFileAsync(examFile, 2).then(line => {

  const examData = JSON.parse(line);
  /*const exam = new ExamFromJSON(examData, errorReporter);
  const report = reportWriter.createReport(exam.exam);
  //console.log(report);

  const examUpdater = new ExamUpdater(errorReporter);
  examUpdater.updateExam(exam.exam, errorReporter);//NB! this is the same exam as above not a new object- just a transforamtion process  const updatedJSON = new JSONFromExam(updatedExam, examData, errorReporter)
  const updatedJSONMaker = new JSONFromExam(errorReporter);
  const updatedJsonObj = updatedJSONMaker.processExam(exam.exam, examData);*/
 
  const folderName = `updated_${examData.name}`;
  filewriter.createFolder(`${path}${folder}/${folderName}`);
  //these are async but not dependent    
  filewriter.stringifyJSONAndwriteToFile(examData, `${path}${folder}/${folderName}/source.exam`);
  //filewriter.writeJSONToFile(updatedJSON, `${path}${folder}/${folderName}/source.exam`);
  //reportWriter.writeReportToFile(report, 'exam_report.txt');
  //reportWriter.writeReportToFile(reportWriter.createErrorReport(examData.name, errorReporter), 'error_report.txt');
  console.log(`Finished processing exam ${examData.name}. Updated exam file, report and error report (if applicable) can be found in folder ${folderName}`);  


}).catch(err => {
  console.error(err);
});