class Exam {
    constructor() {
        this._name = "";
        this._numOfQuestions = 0;
        this._containsCustomParts = false;
        this._customPartsTypes = [];
        this._qs = [];
        this._qTags = [];
        this._extensions = [];
    }

    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set numberOfQuestions(n){
        this._numOfQuestions = n;
    }

    get numberOfQuestions(){
        return this._numOfQuestions;
    }

    get hasCustomParts(){
        return this._containsCustomParts;
    }

    addCustomPartType(type){
        if (!this._customPartsTypes.includes(type)){
            this._customPartsTypes.push(type);
        }
    }

    get customPartTypes(){
        return this._customPartsTypes;
    }

    addQuestion(question){
        this._qs.push(question);
    }

    get questions(){
        return this._qs;
    }
    addqTags(qTags){
        this._qTags.push(...qTags);
    }   
    get qTags(){
        return this._qTags;
    }
    addExtensions(extensions){
        this._extensions.push(...extensions);
        this._containsCustomParts = true;
    }
    get extensions(){
        return this._extensions;
    }

    examReport() {
        let examString = ` Exam name: ${this._name}\n`;
        examString += this._containsCustomParts?`Contains custom parts: this._customPartsTypes.join()\n`:`Contains NO custom parts\n`;
        examString += `Exam qTags: ${this._qTags.join()}\n`;
        examString += `Number of questions: ${this._numOfQuestions}\n\n`

        return examString;
    }
}
export { Exam };