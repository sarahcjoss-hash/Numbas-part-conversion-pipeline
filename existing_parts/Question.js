class Question {
    constructor(data, num) {
        this._name = data.name || "";
        this._tags = data.tags || [];
        this._containsCustomParts = false;
        this._extensions = this.addExtensions (data.extensions) || [];
        this._qNumber = num;
        this._parts = [];
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }

    get number() {
        return this._qNumber;
    }

    get numberOfParts() {
        return this._parts.length;
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