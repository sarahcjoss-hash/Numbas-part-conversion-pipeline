import {FileReader} from '../utils/FileReader.js';
class PartJSONFileReader extends FileReader {
    constructor(errorReporter) {
        super(errorReporter);
       
    }


    async readPartJSONFile(fileName){
        const pathToJSON = `./custom_part_json/${fileName}`;
        try {
            const json = await this.readFileAsync(pathToJSON);
            return json;
        } catch (err) {
            this.reportError(err, `Unable to read JSON file ${fileName}`);
            return null;
        }

    }

}
export { PartJSONFileReader };