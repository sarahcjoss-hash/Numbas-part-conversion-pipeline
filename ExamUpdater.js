import { PartUpdater } from './PartUpdater.js';

class ExamUpdater{
    constructor(errorlogger){        
        this._errorLog = errorlogger;
        this._partUpdater= new PartUpdater(errorlogger);
    }


reportError(err, additional){
        err.message= `${additional} : ${err.message}`
        this._errorLog.reportError(err);
}
updateExam(exam){
    if (exam.questions){
    this._findPartsToReplace(exam.questions)
    } else{
        this.reportError(new Error('No questions found trying to update exam. Process terminates'));
        return;
    }



}
_findPartsToReplace(questions){

    questions.forEach(question => {
        try{
        let parts = question.parts;
        const length = parts?parts.length:0;

        for (var i=0; i<length; i++){
            const part = parts[i];
            if (part.needsReplacing){
                const newPart = this._partUpdater.convertPart(part);   
                parts[i] = newPart;             
            }
        }
    }catch(err){
        err.message = `Unable to finish finding parts to repalce ${question.number}; ${err.message}`;
        this.reportError(err);
    }
    });


}
}
export {ExamUpdater};