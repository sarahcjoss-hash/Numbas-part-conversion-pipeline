import fs from 'fs';

class ReportWriter {
    constructor() {

    }

    createErrorReport(name, logger){
        let errReportString = `Error report for: ${name}\n`;
        errReportString += logger.errorReport;
        return errReportString;



    }
    createMasterErrorReport(loc){
        this._masterErrorReport = "";
    
    }
    createBatchReport(loc){
        this._batchReport = "";

    }
    createCSV(loc){
        this._outputCSV = "files,exam name,Number of questions,contains CP,custom part types,question numbers with CPs,errors\n";
    }
    appendToBatchReport(reportString){
        this._batchReport += reportString;
    }
    appendToMasterErrorReport(reportString){
        this._masterErrorReport += reportString;
    }
    appendToCSV(reportString){
        //this may require more finesse to get it inot the correct format
        this._outputCSV += reportString;
    }
    get outputCSV(){
        return this._outputCSV;
    }
    get batchReport(){
        return this._batchReport;
    }
    get masterErrorReport(){
        return this._masterErrorReport;
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
    createBatchReport(folders, entries){
        let batchReportString = `Batch report for ${folders.length} folders\n`;
        batchReportString += `-------------------------------------\n`;
        batchReportString += entries;
        return batchReportString;
    }




}
export { ReportWriter };