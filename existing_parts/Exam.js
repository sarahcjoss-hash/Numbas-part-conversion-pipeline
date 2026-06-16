class Exam {
    constructor(name, tags, description, errorReporter) {
        this._name = name;
        this._numOfQuestions = 0;
        this._questions = [];
        this._tags = tags;
        this._description = description;
        this._existingExtensions = [];
        this._newExtensions = [];
        this._errorReporter = errorReporter;
    }


 
    get name() {
        return this._name;
    }

    get numberOfQuestions(){
        return this._numOfQuestions;
    }
    set existingExtensions(exts){
        this._existingExtensions = exts;
    }
    get extensionsFromQuestions(){
        const extensions = new Set();   
        this._questions.forEach(q => {
            q.extensions.forEach(ext => extensions.add(ext));
        });
        this._newExtensions = Array.from(extensions);
        return Array.from(extensions);
    }
    addExtension(name){
        if (!this._extensions.includes(name)){
            this._extensions.push(name);
        }
        
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