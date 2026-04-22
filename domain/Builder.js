class Builder {
    constructor() {
        this._builderString = "";
        this._partLetter = "";
        this._type = "";
        this._variableName = "";
        //should variable value go here or in hte part?
    }
   
        set builderString(str) {
        this._builderString = str;
        //parse the string to get the part letter, type and variable name
        const bitInBrackets = /\(.+?\)/.exec(str);
        if (bitInBrackets) {
            const contents = bitInBrackets[0].split(',').map(s => s.trim());
            this._partLetter = contents[0].replace(/(\(|\))/g, '').trim();
            this._type = contents.length > 1 ? contents[1].trim() : '';
            this._variableName = contents.length > 2 ? contents[2].replace(')', '').trim() : '';
        }

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
    report() {
        return `builder string: ${this._builderString}\npart letter: ${this._partLetter}\ntype: ${this._type}\nvariable name: ${this._variableName}`;
    }
}
export { Builder };