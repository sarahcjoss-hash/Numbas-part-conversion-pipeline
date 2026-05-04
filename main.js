import { FileReader } from './fileReader.js';
import { ExamFromJSON } from './ExamFromJSON.js';
import { ReportWriter } from './ReportWriter.js';
import { ErrorReporter } from './ErrorReporter.js';


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
const reportWriter = new ReportWriter();
const errorReporter = new ErrorReporter(true, `${examFile}`);
filereader.getSpecifiedLineInFileAsync(examFile, 2).then(line => {
  
  const examData = JSON.parse(line);
  const exam = new ExamFromJSON(examData, errorReporter);
  const report =reportWriter.createReport(exam.exam);
  //console.log(report);
  reportWriter.writeReportToFile(report, 'exam_report.txt');
  reportWriter.writeReportToFile(reportWriter.createErrorReport(examData.name, errorReporter), 'error_report.txt');
}).catch(err => {
  console.error(err);
});