class Exam {
    constructor() {
        this.name = "";
        this.numOfQuestions = 0;
        this.containsCustomParts = false;
        this.customPartsTypes = [];
        this.qs = [];
        this.qTags = [];
        this.extensions = [];
    }

    set examName(name) {
        this.name = name;
    }

    get examName() {
        return this.name;
    }

    set numberOfQuestions(n){
        this.numOfQuestions = n;
    }

    get numberOfQuestions(){
        return this.numOfQuestions;
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
        this.qs.push(question);
    }

    get questions(){
        return this.qs;
    }
    addqTags(qTags){
        this.qTags.push(...qTags);
    }   
    get examqTags(){
        return this.qTags;
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
        examString += `Exam qTags: ${this.qTags.join()}\n`;
        examString += `Number of questions: ${this.numOfQuestions}\n\n`

        return examString;
    }
}
export { Exam };