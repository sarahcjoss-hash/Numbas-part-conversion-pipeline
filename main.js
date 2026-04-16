import { FileReader } from './fileReader.js';
import { ExamFromJSON } from './ExamFromJSON.js';
import { ReportWriter } from './ReportWriter.js';


// Usage
const examFile = 'question-229253-daniel-s-drag-and-drop-test.exam';
const filereader = new FileReader();
const reportWriter = new ReportWriter();
filereader.getSpecifiedLineInFileAsync(examFile, 2).then(line => {
  console.log(`Line 2 of ${examFile}: ${line}`);
  const examData = JSON.parse(line);
  const exam = new ExamFromJSON(examData);
  const report =reportWriter.createReport(exam.exam);
  console.log(report);
  reportWriter.writeReportToFile(report, 'exam_report.txt');
}).catch(err => {
  console.error(err);
});