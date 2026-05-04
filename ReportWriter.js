import fs from 'fs';

class ReportWriter {
    constructor() {

    }

    createErrorReport(name, logger){
        let errReportString = `Error report for: ${name}\n`;
        errReportString += logger.errorReport;
        return errReportString;



    }

    createReport(exam) {

        let reportString = `Exam file report: ${exam.name}\n`;
        let questions = exam.questions;
        reportString += exam.examReport();
        reportString += questions.map((q, i) => {
           //console.log(q.questionReport());
            let questionString = q.questionReport();
            let parts = q.parts;
            questionString += parts.map((p, i) => {

        
                let partString = p.partReport();
                partString += `\n`;
                return partString;
            });
            questionString += `\n-------------------------------------\n`
            return questionString;
        });

        return reportString;
    };

    writeReportToFile(reportString, filePath) {
        fs.writeFile(filePath, reportString, (err) => {
            if (err) {
                console.error('Error writing report to file:', err);
            } else {
                console.log('Report successfully written to file:', filePath);
            }
        });
    }


}
export { ReportWriter };