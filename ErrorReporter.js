class ErrorReporter{
    constructor(logToConsole){
        this._errors=[]
        this._logToConsole = logToConsole;
        
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
        return this.errors.length>0? allErrors = this.errors.map(e => `{e.message} \n`).join(): "";
    }
    get errorReport(){
        let errorString = this._errors.length > 1 ?`!THIS CONVERSION ENCOUNTERED ERRORS`:`No errors found`;
        errorString += this.allErrors;
        return errorString;
    }

}
export {ErrorReporter};