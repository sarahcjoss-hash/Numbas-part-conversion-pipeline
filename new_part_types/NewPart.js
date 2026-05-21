import {PartJSONFileReader} from './PartJSONFileReader.js';

class NewPart {
    //although all parts have a prompt and 0 to many gaps 
    // for most parts we only need to know type, number, and we might as well get marks
    //for now leave prompt and gaps for teh parts where that matters
    constructor(errorLogger) {
        this._type = "";
        this._marks = 1;
        this._errorReporter = errorLogger;
        this._fileReader = new PartJSONFileReader(errorLogger);
        this._customPartFileName = '';
        this._templateJsonFileName = '';
        this._settings = {};
    }
    reportError(err, additional){
        err.message= `${this.constructor && this.constructor.name ? this.constructor.name : 'NewPart'}: ${additional} : ${err.message}`
        this._errorReporter.reportError(err);
}

    set type(type) {
        this._type = type;
    }
    get type() {
        return this._type;
    }
    get customPartFileName(){
        return this.__customPartFileName;
    }
    get templateJsonFileName(){
        return this._templateJsonFileName
    }

    get templateJsonAsObject(){
        //function here to get filereader to open read and parse correct JSONFile
    }
    set marks(mark){
        this._marks = mark;
    }
    get marks (){
        return this._marks;
    }
    set prompt (p){
    this._prompt = p;
 }
 get prompt(){
    return this._prompt;
 }

updateSetting(setting, val) {
        //check the setting exists and if so update it otherwise report an error
        if (this._settings.hasOwnProperty(setting)) {
            this._settings[setting] = val;
        } else {
            this._errorReporter.reportError(new Error(`Setting '${setting}' does not exist`));
        }
}
 get settings(){
    return this._settings;
 }
    createNewFromExisting(part){
        let newPart = new NewPart()
        newPart.marks = part.marks;
        return newPart;
    }


    partReport() {
        let partString = `Replacement Part \npart number: ${this._pNumber}\n`;
        partString += `part type: ${this._type} marks: ${this._marks}\n`; 
        return partString;
    }
}
export { NewPart };