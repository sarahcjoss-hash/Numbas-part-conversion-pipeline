class Builder {
    constructor(builderString, partLetter, type, variableName) {
        this._builderString = builderString;
        this._partLetter = partLetter;
        this._type = type;
        this._variableName = variableName;
        //should variable value go here or in hte part?
    }
   

    get builderString() {
        return this._builderString;
    }   

    get partLetter() {
        return this._partLetter;
    }   
  
    get builderType() {
        return this._type;
    }   
 
    get variableName() {
        return this._variableName;
    }
}
export { Builder };