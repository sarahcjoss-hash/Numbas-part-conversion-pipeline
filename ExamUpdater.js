import { PartUpdater } from './PartUpdater.js';

class ExamUpdater{
    constructor(errorlogger){        
        this._errorReporter = errorlogger;
        this._partUpdater= new PartUpdater(errorlogger);
    }


reportError(err, additional){
    err.message= `${this.constructor && this.constructor.name ? this.constructor.name : 'ExamUpdater'}: ${additional} : ${err.message}`
    this._errorReporter.reportError(err);
}
updateExam(exam){
    try{
    if (exam.questions){
        this._findAndReplaceParts(exam.questions);
        console.log(`Finished replacing parts in exam ${exam.name}. This exam contains the following new extensions: ${exam.extensionsFromQuestions.join(', ')}`);
        
    } else{
        this.reportError(new Error('ExamUpdater: No questions found trying to update exam. Process terminates'));
        return;
    }

    }catch(err){
        err.message = `ExamUpdater: Unable to update exam ${exam.name} : ${err.message}`;
        this.reportError(err, `Unable to update exam ${exam.name}`);
    }



}
_findAndReplaceParts(questions){

    questions.forEach(question => {
        try{
        let parts = question.parts;
        const length = parts?parts.length:0;

        for (var i=0; i<length; i++){
            const part = parts[i];
            if (part.needsReplacing){
                const newPart = this._partUpdater.convertPart(part); 
                if (newPart){  
                parts[i] = newPart;  
                console.log(`replaced part ${part.number} in question ${question.number} with new part type ${newPart.type}`); 
                question.addExtension(newPart.type);  
                } else{
                    this.reportError(new Error(`PartUpdater was not able to convert part ${part.number} in question ${question.number}. Original part retained`), `PartUpdater was not able to convert part ${part.number} in question ${question.number}`);
                }        
            }
        }
    }catch(err){
        err.message = `ExamUpdater: Unable to finish finding parts to replace Q${question.number}; ${err.message}`;
        this.reportError(err);
    }
    });


}
}
export {ExamUpdater};