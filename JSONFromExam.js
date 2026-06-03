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
    addCustomPartInfoToQuestion(question, index, examData) {
        try {
            const customPartTypes = question.extensions;
            customPartTypes.forEach(cpt => {
                const CPJSON = CustomPartJsonProvider.getCustomPartJson(cpt);
                if (CPJSON) {
                    examData.question_groups[0].questions[index].custom_part_types.push(CPJSON);
                }
            });
        } catch (err) {
            this.reportError(err, `Unable to add custom part info for question ${index + 1}`);
        }
    }
    async replacePartWithCustomPart(question, p, partIndex, examData) {
        try {
   
            const type = p.type;
            const subType = p.newPartTypeMatch;
            const templateJSON = await p.templateJsonAsObject();
            //fix this here so that we get th settings object, replace the settings in json witth the settings object
            //dstich in any other data
            //may require a custom stitcher per part
            const settings = p.settingsJSON;
            const prompt = p.prompt;
        } catch (err) {
            this.reportError(err, `Unable to replace part with custom part for question ${question.name}`);
        }
    }

     processExam(exam, examData) {
        this.addNewExtensionsToJSON(exam, examData);
        const questions = exam.questions;//need flat here as the questions are themselves an array
        try {
            questions.map((q, i) => {
                if (q.hasCustomParts) {
                    this.addCustomPartInfoToQuestion(q, i, examData);

                    const parts = q.parts;
                    //remember to put async here as the map function is the one that is calling an asymn function
                    parts.map(async(p, j) => {
                        try {
                            let part = p;
                            if (part.needsReplacing) {
                                await this.replacePartWithCustomPart(q, p, j, examData);
                            }

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