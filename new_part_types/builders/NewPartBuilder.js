class NewPartBuilder {
    constructor(errorLogger) {
        this._type = "generic";
        this._errorLogger = errorLogger;
    }

    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'partBuilder'}: ${additional} : ${err.message}`
        this._errorReporter.reportError(err);
    }
}
export { NewPartBuilder };