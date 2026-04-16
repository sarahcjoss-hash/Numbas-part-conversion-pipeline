class Question {
    constructor() {
        this._name = "";
        this._tags = [];
        this._extensions = [];
        this._qNumber = 0;
        this._numberOfParts = 0;
        this._containsCustomParts = false;
        this._customPartsTypes = [];
        this._parts = [];
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }

    set number(n) {
        this._qNumber = n;
    }
    get number() {
        return this._qNumber;
    }
    set numberOfParts(n) {
        this._numberOfParts = n;
    }
    get numberOfParts() {
        return this._numberOfParts;
    }
    set hasCustomParts(bool) {
        this._containsCustomParts = bool;
    }
    get hasCustomParts() {
        return this._containsCustomParts;
    }
    addTags(tags) {
        this._tags.push(...tags);
    }
    get tags() {
        return this._tags;
    }
    addExtensions(extensions) {
        this._extensions.push(...extensions);
        this._containsCustomParts = true;
    }
    get extensions() {
        return this._extensions;
    }

    addCustomPartType(type) {
        if (!this._customPartsTypes.includes(type)) {
            this._customPartsTypes.push(type);
        }
    }
    get customPartTypes() {
        return this._customPartsTypes;
    }
    addPart(part) {
        this._parts.push(part);
    }
    get parts() {
        return this._parts;
    }

    questionReport() {
        const q = this;
        let questionString = `Question ${q._qNumber} : ${q._name}\n Tags ${q._tags.join()} \nExtensions ${q._extensions.join()}\n\n`;
        questionString += `Number of parts : ${q._parts.length}\n`;
        return questionString;
    }
}
export { Question };