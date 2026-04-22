import fs from 'fs';

class ReportWriter {
    constructor() {

    }

    createReport(exam) {

        let reportString = `Exam file report: ${exam.name}\n`;
        let questions = exam.questions;
        reportString += exam.examReport();
        reportString += questions.map((q, i) => {
            console.log(q.questionReport());
            let questionString = q.questionReport();
            let parts = q.parts;
            questionString += parts.map((p, i) => {

        
                let partString = p.partReport();

                try {
                    if (p.type === 'manual_marking') {
                        partString += `width ${p.textAreaWidth}, height ${p.textAreaHeight}\n`;
                        partString += `Marks:${p.answer.marks} Answer ${p.answer.displayAnswer}\n`

                    }
                    if (p.type === 'drag_and_drop') {
                        partString += `SETTINGS number of gaps ${p.numberOfGaps} : builder: ${p.builder}, width: ${p.width}, height: ${p.height}\n`;
                        partString += `drag values ${p.dragValues}\n`
                        partString += p.gaps.map((g, i) => {
                            return `Gap ${i}: answer ${g.answer} Marks: ${g.marks}\n`
                        });

                    }
                } catch (err) {
                    console.log(`unable to get inforamtion for custom part type ${err.message}`);
                    partString += "UNABLE TO GET PART INFORMATION"
                }

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