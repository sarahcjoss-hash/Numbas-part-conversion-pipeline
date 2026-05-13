import {FileReader} from '../fileReader.js';
class PartJSONFileReader{
    constructor(){
        this._fileReader = new FileReader();
    }
    reportError(err, additional){
        err.message= `${additional} : ${err.message}`
        this._errorLog.reportError(err);
    }

    _readPartJSONFile(fileName){

    }

}
export { PartJSONFileReader };