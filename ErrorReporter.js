class ErrorReporter{
    constructor(logToConsole, file){
        this._errors=[]
        this._logToConsole = logToConsole;
        this._name = file;
        
    }
    
    reportError(err){
        if (this.logToConsole){
            console.error(`Error via logger : ${err.message}`);
        }
        this._errors.push(err)

    }
    get errors(){
        return this._errors;
    }
    get allErrorMessages(){
        return this._errors.length>0? this.errors.map(e => `{e.message} \n`).join(): "";
    }
    get errorReport(){
        let errorString = `Log file for ${this._name}`;
        errorString = this._errors.length > 1 ?`!THIS CONVERSION ENCOUNTERED ERRORS`:`No errors found`;
        errorString += this.allErrorMessages;
        return errorString;
    }

}
export {ErrorReporter};