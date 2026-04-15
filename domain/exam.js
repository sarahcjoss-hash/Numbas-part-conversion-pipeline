class Exam {
    constructor(file) {
        this.fileName = file;
        this.name = "";
        this.numberOfQuestions = 0;
        this.containsCustomParts = false;
        this.customPartsTypes = [];
        this.questions = [];
        this.tags = [];
        this.extensions = [];
    }

    set examName(name) {
        this.name = name;
    }

    get examName() {
        return this.name;
    }

    set numberOfQuestions(n){
        this.numberOfQuestions = n;
    }

    get numberOfQuestions(){
        return this.numberOfQuestions;
    }

    get hasCustomParts(){
        return this.containsCustomParts;
    }

    addCustomPartType(type){
        if (!this.customPartsTypes.includes(type)){
            this.customPartsTypes.push(type);
        }
    }

    get customPartTypes(){
        return this.customPartsTypes;
    }

    addQuestion(question){
        this.questions.push(question);
    }

    get questions(){
        return this.questions;
    }
    addTags(tags){
        this.tags.push(...tags);
    }   
    get examTags(){
        return this.tags;
    }
    addExtensions(extensions){
        this.extensions.push(...extensions);
        this.containsCustomParts = true;
    }
    get examExtensions(){
        return this.extensions;
    }

    examReport() {
        let examString = ` Exam name: ${this.name}\n`;
        examString += this.containsCustomParts?`Contains custom parts: this.customPartsTypes.join()\n`:`Contains NO custom parts\n`;
        examString += `Exam tags: ${this.tags.join()}\n`;
        examString += `Number of questions: ${this.numberOfQuestions}\n\n`

        return examString;
    }
}
export { Exam };