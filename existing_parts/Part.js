class Part {
    //although all parts have a prompt and 0 to many gaps 
    // for most parts we only need to know type, number, and we might as well get marks
    //for now leave prompt and gaps for teh parts where that matters
    constructor(data, num, errorReporter) {
        
        this._type = data.type;
        this._prompt = data.prompt;
        this._gaps = data.gaps;
        this._marks = data.marks;
        this._pNumber = num;
        this._errorLog = errorReporter;
        this._errorString = '';


    }
    reportError(err){
        const errMessage = `Error creating part ${this.number}\n ${err.name} ${err.message}`;
        this._errorString += errMessage;
        this._errorLog.reportError(err);//add more detail to this or throw a new Error using a switch (and throw error to question?)

    }

    get needsReplacing(){
        return false;
    }

    get type() {
        return this._type;
    }

    get number() {
        return this._pNumber;
    }
    set marks(m){
        this._marks = m;
    }

    get marks (){
        return this._marks;
    }
    addGap(gap) {
        this._gaps.push(gap);
    }
    get numberOfGaps() {
        return this._gaps.length;
    };
    get prompt() {
        return this._prompt;
    }

    partReport() {
        let partString = `part number: ${this._pNumber}\n`;
        partString += `part type: ${this._type} marks: ${this._marks}\n`; 
        partString += `${this._errorString}`;
        return partString;
    }
}
export { Part };