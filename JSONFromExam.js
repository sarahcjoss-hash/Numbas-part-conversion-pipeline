import { FileReader } from './fileReader.js';

class JSONFromExam {
    constructor(exam, data, errorReporter) {
        this._examToUpdate = exam;
        this._jsonObjToUpdate = data;
        this._errorReporter = errorReporter;
        this._updatedJSON;
        this.processExam(exam);
        this.fileReader = new FileReader();
    }

    static extensionLookUp(extensionName) {
        //this is where we decide which extensions we need to add to the JSON based on the extensions used in the questions/parts
        switch (
        extensionName
        ) {
            case "cardmatch":
                return "cardMatchCPJson.json";
            case "drag1-2-1":
                return "drag121CPJson.json";
            case "dropInBucket":
                return "dropInBucketCPJson.json";
            case "selfMarkedText":
                return "selfMarkedTextCPJson.json";
            case "sentenceReorder":
                return "sentenceReorderCPJson.json";
            default:
                return null;
        }
    }

    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'JSONFromExam'}: ${additional} : ${err.message}`
        this._errorReporter.reportError(err);
    }
    addNewExtensionsToJSON(exam) {
        const newExtensions = exam.extensionsFromQuestions;
        const pathToJSON = "./custom_part_jsons/";
        try {
            newExtensions.forEach(ext => {

                const CPJson = JSONFromExam.extensionLookUp(ext);
                if (CPJson) {
                    const json = this.fileReader.readJSONFile(pathToJSON + CPJson);
                    this._jsonObjToUpdate.extensions.push(json);
                }
       
        });
        } catch (err) {
            this.reportError(err, `Unable to add extension ${ext} to JSON`);
        }

    }

    processExam(exam) {


        const questions = exam.questions;//need flat here as the questions are themselves an array
        try {
            questions.map((q, i) => {
                if (q.hasCustomParts) {

                    const parts = q.parts;
                    parts.map((p, j) => {
                        let part = p;
                        if (part.needsReplacing) {
                            const type = p.type;
                            const subType = p.newPartTypeMatch;
                            const temlpteJSON = p.templateJsonAsObject;
                            const settings = p.settingsJSON;
                            const prompt = p.prompt;
                        }


                        try {

                        } catch (err) {

                            this.reportError(err, `unable to get information for custom part type ${q.name} part ${j + 1}`);


                        }


                    });
                }


            });
        } catch (err) {

            this.reportError(err, "");
        }
    }
}
export { JSONFromExam };