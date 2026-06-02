import { FileReader } from './fileReader.js';
import { CustomPartJsonProvider } from './custom_part_json/CustomPartJsonProvider.js';
import { ExtensionNameProvider } from './custom_part_json/ExtensionNameProvider.js';

class JSONFromExam {
    constructor(errorReporter) {

        this._errorReporter = errorReporter;
        this.fileReader = new FileReader();
    }



    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'JSONFromExam'}: ${additional} : ${err.message}`
        this._errorReporter.reportError(err);
    }
    addNewExtensionsToJSON(exam, examData) {
        const newExtensions = exam.extensionsFromQuestions;
        const pathToJSON = "./custom_part_jsons/";
        try {
            newExtensions.forEach(ext => {

                const extensionsName = ExtensionNameProvider.getExtensionName(ext);
                const CPJSON = CustomPartJsonProvider.getCustomPartJson(ext);
                if (extensionsName) {
                    examData.extensions.push(extensionsName);
                }
                if (CPJSON) {
                    examData.custom_part_types.push(CPJSON);
                }
       
        });
        return examData;
        } catch (err) {
            this.reportError(err, `Unable to add extension ${ext} to JSON`);
        }

    }

    processExam(exam, examData) {
        this.addNewExtensionsToJSON(exam, examData);
        const questions = exam.questions;//need flat here as the questions are themselves an array
        try {
            questions.map((q, i) => {
                if (q.hasCustomParts) {
//add code in here to add the CPs and ext names to each question
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
            return examData;
        } catch (err) {

            this.reportError(err, "");
        }
    }
}
export { JSONFromExam };