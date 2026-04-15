import fs from 'fs';

class ReportWriter {
    constructor() {

    }

    createReport(exam) {

        let reportString = `Exam file report: ${exam.name}\n`;
        let questions = exam.questions;

        reportString += `Number of questions: ${exam.numberOfQuestions}\n\n`;
        reportString += questions.map((q, i) => {
            console.log(q)
            let questionString = `Question ${i} : ${q.name}\n Tags ${q.tags} \nExtensions ${q.extensions}\n\n`;
            let parts = q.parts;
            questionString += `Number of parts : ${parts.length}\n`;
            questionString += parts.map((p, i) => {

                //to do
                //pull out the drag and drop values
                //this will include having to find the varaible name and then get teh varaible values
                let partString = `Part ${i}: type ${p.type} `;
                partString += p.type === 'manual_marking' ? 'manual marking\n' : '\n';
                partString += p.type === 'drag_and_drop' ? 'drag and drop\n' : '\n';
                partString += p.type === 'manual_marking' || p.type === 'drag_and_drop' ? ` ${p.prompt}\n` : '';
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