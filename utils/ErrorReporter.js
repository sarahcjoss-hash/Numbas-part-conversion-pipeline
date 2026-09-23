class ErrorReporter{
    constructor(logToConsole){
        this._errors=[]
        this._logToConsole = logToConsole;
        this._name = "Not set yet";
        
    }

    set name(name){
        this._name = name;
    }
    
    reportError(err){
        if (this._logToConsole){
            console.error(`Error via logger : ${err.message}`);
        }
        this._errors.push(err);
        console.log(`errors logged so far for ${this._name}: `, this._errors.length);

    }
    get errors(){
        return this._errors;
    }
    get allErrorMessages(){
        return this._errors.length>0? this.errors.map(e => `${e.message} \n`).join(): "";
    }
    get errorReport(){
        let errorString = `\nLog for ${this._name}\n`;
        errorString += this._errors.length > 1 ?`!THIS CONVERSION ENCOUNTERED ERRORS\n`:`No errors found\n`;
        errorString += this.allErrorMessages;
        return errorString;
    }

}
export {ErrorReporter};