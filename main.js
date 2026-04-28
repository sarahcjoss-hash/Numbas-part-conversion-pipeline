import { FileReader } from './fileReader.js';
import { ExamFromJSON } from './ExamFromJSON.js';
import { ReportWriter } from './ReportWriter.js';


// to do
//teh type for manual amrking etc is coming out as the part type we need to add the custom extension type to teh report and generally finsih writing the part reports
const path = "C:/work/NUMBAS exams for practice/EXAMS downloaded from numbas mathcentre/human biology/"
const folder = "exam-234463-antenatal-and-postnatal-screening-end-of-topic-test/"
const examFile = path + folder + 'source.exam';
const filereader = new FileReader();
const reportWriter = new ReportWriter();
filereader.getSpecifiedLineInFileAsync(examFile, 2).then(line => {
  
  const examData = JSON.parse(line);
  const exam = new ExamFromJSON(examData);
  const report =reportWriter.createReport(exam.exam);
  //console.log(report);
  reportWriter.writeReportToFile(report, 'exam_report.txt');
}).catch(err => {
  console.error(err);
});