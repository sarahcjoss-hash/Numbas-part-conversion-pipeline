class Builder {
    constructor() {
        this._builderString = "";
        this._partLetter = "";
        this._type = "";
        this._variableName = "";
        //should variable value go here or in hte part?
    }
    set builderString(string) {
        this._builderString = string;    
    }

    get builderString() {
        return this._builderString;
    }   
    set partLetter(letter) {
        this._partLetter = letter;
    }   
    get partLetter() {
        return this._partLetter;
    }   
    set builderType(type) {
        this._type = type;
    }   
    get builderType() {
        return this._type;
    }   
    set variableName(name) {
        this._variableName = name;
    }   
    get variableName() {
        return this._variableName;
    }
}
export { Builder };