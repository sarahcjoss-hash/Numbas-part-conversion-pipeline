import { FileReader } from './fileReader.js';
import { ExtensionNameProvider } from './custom_part_json/ExtensionNameProvider.js';
import { QuestionJSONStitcher } from './QuestionJSONStitcher.js';
import { CustomPartJsonProvider } from './custom_part_json/CustomPartJsonProvider.js';

class JSONFromExam {
    constructor(errorReporter) {

        this._errorReporter = errorReporter;
        this.fileReader = new FileReader();

    }

    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'JSONFromExam'}: ${additional} : ${err.message}`
        this._errorReporter.reportError(err);
    }
    addNewExtensionsToJSON(exam, examJSONObj) {
        const newExtensions = exam.extensionsFromQuestions;
        const pathToJSON = "./custom_part_jsons/";
        try {
            newExtensions.forEach(ext => {

                const extensionsName = ExtensionNameProvider.getExtensionName(ext);
                const CPJSON = CustomPartJsonProvider.getCustomPartJson(ext);
                if (extensionsName) {
                    examJSONObj.extensions.push(extensionsName);
                }
                if (CPJSON) {
                    examJSONObj.custom_part_types.push(CPJSON);
                }

            });
            return true;
        } catch (err) {
            this.reportError(err, `Unable to add extension ${ext} to JSON`);
            return false;
        }

    }


     processExam(exam, examJSONObj) {

        try {
        const success = this.addNewExtensionsToJSON(exam, examJSONObj);
 
        const questions = exam.questions;//need flat here as the questions are themselves an array
            const questionStitcher = new QuestionJSONStitcher(this._errorReporter);
            for (const q of questions) {
                const i = questions.indexOf(q);
                if (q.hasCustomParts) {
                    questionStitcher.addCustomPartInfoToQuestion(q, i, examJSONObj);
                    questionStitcher.findAndReplaceParts(q, i, examJSONObj);             
                }
            };
            return success;
        } catch (err) {

            this.reportError(err, "");
        }
    }
}
export { JSONFromExam };