class Builder {
    constructor(str) {
        function processbuilderString(str) {
            //parse the string to get the part letter, type and variable name
            let partLetter = "";
            let type = "";
            let variableName = "";
            try {
                const bitInBrackets = /\(.+?\)/.exec(str);

                if (bitInBrackets) {
                    const contents = bitInBrackets[0].split(',').map(s => s.trim());
                    partLetter = contents[0].replace(/(\(|\))/g, '').trim();
                    type = contents.length > 1 ? contents[1].trim() : '';
                    variableName = contents.length > 2 ? contents[2].replace(')', '').trim() : '';
                }

            } catch (error) {
                console.error("Error processing builder string:", error);
                this._partLetter = "";
                this._type = "";
                this._variableName = "";
            }
            return { partLetter: partLetter, type: type, variableName: variableName };
        }
        const result = processbuilderString(str);
        this._partLetter = result.partLetter;
        this._type = result.type;
        this._variableName = result.variableName;
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