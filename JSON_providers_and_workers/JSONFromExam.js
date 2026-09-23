import { FileReader } from '../utils/FileReader.js';
import { ExtensionNameProvider } from './ExtensionNameProvider.js';
import { QuestionJSONStitcher } from './QuestionJSONStitcher.js';
import { CustomPartJsonProvider } from './CustomPartJsonProvider.js';
import { ExamSettings } from './ExamSettings.js';

class JSONFromExam {
    constructor(errorReporter) {

        this._errorReporter = errorReporter;
        this.fileReader = new FileReader();

    }

    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'JSONFromExam'}: ${additional} : ${err.message}`
        this._errorReporter.reportError(err);
    }
        removeUnwantedExtensions(examData){
        //use splice to remove 'drag_and_drop' and 'card_match' extensions from the question extensions in the JSON, as these are the ones we are replacing with custom parts and don't want the old extensions causing conflicts
        try {
            const extensions = examData.extensions;
            const dragAndDropIndex = extensions.indexOf('drag_and_drop');
            const cardMatchIndex = extensions.indexOf('card_match');
            const sentenceReorderIndex = extensions.indexOf('sentence_reorder');
            const manualMarkingIndex = extensions.indexOf('manual_marking');
            if (sentenceReorderIndex !== -1) {
                extensions.splice(sentenceReorderIndex, 1);
            }
            if (manualMarkingIndex !== -1) {
                extensions.splice(manualMarkingIndex, 1);
            }
            if (dragAndDropIndex !== -1) {
                extensions.splice(dragAndDropIndex, 1);
            }
            if (cardMatchIndex !== -1) {
                extensions.splice(cardMatchIndex, 1);
            }
            return extensions;
        } catch (err) {
            this.reportError(err, `Unable to remove unwanted extensions for question ${index + 1}`);
        }
    }
    addNewExtensionsToJSON(exam, examJSONObj) {
        const newExtensions = exam.extensionsFromQuestions;
        const pathToJSON = "./custom_part_jsons/";
        //remove the existing extensions so we don;t get old extensions causing conflicts
        examJSONObj.extensions = this.removeUnwantedExtensions(examJSONObj);//are here extensions we might want to keep? if so, add code here that just removes the specifics
        examJSONObj.custom_part_types = [];
        try {
            newExtensions.forEach(ext => {

                const extensionsName = ExtensionNameProvider.getExtensionName(ext);
                const CPJSON = CustomPartJsonProvider.getCustomPartJson(ext);
                if (extensionsName) {
                    examJSONObj.extensions.push(extensionsName);
                }else{
                    //we might have ended up here because thre is an extension in  a queston that has had the part that used the extension removed- resulting in conflicting flags about whether the question need replacing
                    throw new Error(`Unable to get extension name for ${ext}`);
                }
                if (CPJSON) {
                    examJSONObj.custom_part_types.push(CPJSON);
                }else{
                    throw new Error(`Unable to get custom part JSON for ${ext}`);   
                }

            });
            return true;
        } catch (err) {
            this.reportError(err, `Unable to add extension ${ext} to JSON`);
            return false;
        }

    }

    replaceExamSettings(exam, examJSONObj) {
        try {
            const examSettings = new ExamSettings(); 
            examJSONObj.navigation = examSettings.navigation;
            examJSONObj.feedback = examSettings.feedback;
            return true;     

        }catch (err) {
            this.reportError(err, `Unable to update ExamSettings in exam JSON`);
        }
    }


     processExam(exam, examJSONObj) {

        try {
        const success = this.addNewExtensionsToJSON(exam, examJSONObj);
        const settingsSuccess = this.replaceExamSettings(exam, examJSONObj);
            //rename exam
        examJSONObj.name = examJSONObj.name + "_updated";
        const questions = exam.questions;//need flat here as the questions are themselves an array
            const questionStitcher = new QuestionJSONStitcher(this._errorReporter);
            for (const q of questions) {
                const i = questions.indexOf(q);
                if (q.hasCustomParts) {
                    questionStitcher.addCustomPartInfoToQuestion(q, i, examJSONObj);
                    questionStitcher.removeUnwantedExtensions(q, i, examJSONObj);
                    questionStitcher.removeUnwantedVariables(q, i, examJSONObj);
                    questionStitcher.findAndReplaceParts(q, i, examJSONObj);             
                }
            };
            return success && settingsSuccess;
        } catch (err) {

            this.reportError(err, "");
        }
    }
}
export { JSONFromExam };