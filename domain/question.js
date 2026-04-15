class Question {
    constructor() {
        this.name = "";
        this.tags = [];
        this.extensions = [];
        this.qNumber = 0;
        this.numberOfParts = 0;
        this.containsCustomParts = false;
        this.customPartsTypes = [];
        this.parts = [];
    }
    set questionName(name) {
        this.name = name;
    }
    get questionName() {
        return this.name;
    }

    set questionNumber(n) {
        this.qNumber = n;
    }
    get questionNumber() {
        return this.qNumber;
    }
    set questionNumberOfParts(n) {
        this.numberOfParts = n;
    }
    get questionNumberOfParts() {
        return this.numberOfParts;
    }
    set hasCustomParts(bool) {
        this.containsCustomParts = bool;
    }
    get hasCustomParts() {
        return this.containsCustomParts;
    }
    addTags(tags) {
        this.tags.push(...tags);
    }
    get questionTags() {
        return this.tags;
    }
    addExtensions(extensions) {
        this.extensions.push(...extensions);
        this.containsCustomParts = true;
    }
    get questionExtensions() {
        return this.extensions;
    }

    addCustomPartType(type) {
        if (!this.customPartsTypes.includes(type)) {
            this.customPartsTypes.push(type);
        }
    }
    get customPartTypes() {
        return this.customPartsTypes;
    }
    addPart(part) {
        this.parts.push(part);
    }
    get questionParts() {
        return this.parts;
    }

    questionReport() {
        const q = this;
        let questionString = `Question ${q.qNumber} : ${q.name}\n Tags ${q.tags.join()} \nExtensions ${q.extensions.join()}\n\n`;
        questionString += `Number of parts : ${q.parts.length}\n`;
        return questionString;
    }
}
export { Question };