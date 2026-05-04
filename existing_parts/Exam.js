class Exam {
    constructor(name, tags, description, errorReporter) {
        this._name = name;
        this._numOfQuestions = 0;
        this._questions = [];
        this._tags = tags;
        this._description = description;
        this._extensions = [];
        this.errorLog = errorReporter;
    }



    get name() {
        return this._name;
    }

    get numberOfQuestions(){
        return this._numOfQuestions;
    }





    addQuestion(question){
        this._questions.push(question);
        this._numOfQuestions = this._questions.length;
    }

    get questions(){
        return this._questions;
    }
 
    get tags(){
        return this._tags;
    }


    examReport() {
        let examString = ` Exam name: ${this._name}\n`;       
        examString += this._tags?`Exam tags: ${this._tags.join()}\n`:`Exam tags: None\n`;
        examString += this._description?`Exam description: ${this._description}\n`:`Exam description: None\n`;
        examString += `Number of questions: ${this._numOfQuestions}\n\n`
        examString += `QUESTIONS\n ________________________________\n`

        return examString;
    }
}
export { Exam };