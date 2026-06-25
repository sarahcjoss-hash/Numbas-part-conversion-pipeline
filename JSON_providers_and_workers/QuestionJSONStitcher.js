
import { CustomPartJsonProvider } from './CustomPartJsonProvider.js';
import { JSONTemplateProvider } from './JSONTemplateProvider.js';
class QuestionJSONStitcher {
    constructor(errorReporter) {
        this._errorReporter = errorReporter;
    }

    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'JSONFromExam'}: ${additional} : ${err.message}`
        this._errorReporter.reportError(err);
    }
    removeUnwantedExtensions(question, index, examData){
        //use splice to remove 'drag_and_drop' and 'card_match' extensions from the question extensions in the JSON, as these are the ones we are replacing with custom parts and don't want the old extensions causing conflicts
        try {
            const extensions = examData.question_groups[0].questions[index].extensions;
            const dragAndDropIndex = extensions.indexOf('drag_and_drop');
            const cardMatchIndex = extensions.indexOf('card_match');
            if (dragAndDropIndex !== -1) {
                extensions.splice(dragAndDropIndex, 1);
            }
            if (cardMatchIndex !== -1) {
                extensions.splice(cardMatchIndex, 1);
            }
        } catch (err) {
            this.reportError(err, `Unable to remove unwanted extensions for question ${index + 1}`);
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
            return true;
        } catch (err) {
            this.reportError(err, `Unable to add custom part info for question ${index + 1}`);
            return false;
        }
    }
    removeUnwantedVariables(question, index, examData) {
        try{
            const variables =  examData.question_groups[0].questions[index].variables;
            const customPartTypes = question.extensions;
            const ungroupedVariables = examData.question_groups[0].questions[index].ungrouped_variables;
            if (variables|| ungroupedVariables && customPartTypes) {
                for (const v in variables) {
                    console.log(`Checking variable ${v} for question ${index + 1} variable name is ${variables[v].name}`);
                    if (variables[v].name.startsWith('manualmarking_') || variables[v].name.startsWith('cardmatch_') || variables[v].name.startsWith('dnd_')) {
                        console.log(`deleting variable ${v} `);
                        delete examData.question_groups[0].questions[index].variables[v];
                    }
                }
                for (const uv in ungroupedVariables) {
                    //ungrouped varaibles do not ahve a name prop
                    console.log(`Checking ungrouped variable ${uv} for question ${index + 1}`); 
                    if (ungroupedVariables[uv].startsWith('manualmarking_') || ungroupedVariables[uv].startsWith('cardmatch_') || ungroupedVariables[uv].startsWith('dnd_')) {
                        console.log(`deleting ungrouped variable ${uv} `);
                        examData.question_groups[0].questions[index].ungrouped_variables.splice(uv,1);
                    }
                }
            }
            

        }catch(err) {
            this.reportError(err, `Unable to remove unwanted variables for question ${index + 1}`);
            return false;
        }
    }
     findAndReplaceParts(question, index, examJSONObj) {
        try {
            let parts = question.parts;
            let success = false;
            for (const part of parts) {
                const j = parts.indexOf(part);
                if (part.needsReplacing) {
                    //not currently consuming success
                    success =  this.replacePartWithCustomPart(question, part, j, examJSONObj);
                }
            }
        } catch (err) {
            this.reportError(err, `Unable to find and replace parts for question ${index + 1}`);
            return false;
        }
    }
    replacePartSettings(p, templateJSONObj) {
        //fix this here so that we get th settings object, replace the settings in json witth the settings object
        //dstich in any other data
        //may require a custom stitcher per part
        const settings = p.settings;
        
        if (templateJSONObj && templateJSONObj.settings && settings) {
            templateJSONObj.settings = settings;
            return true;
        } else {
            this.reportError(new Error("Unable to insert new settings"), `Difficulty setting up custom part ${question.name} ${p.type}`)
            return false;
        }
    }
    replacePrompt(p, templateJSONObj) {
        const prompt = p.prompt;  
        console.log(`Replacing prompt with ${prompt}`);  
        if (templateJSONObj && undefined != prompt) {
            templateJSONObj.prompt = prompt;
            return true;
        } else {
            this.reportError(new Error("Unable to insert new prompt"), `Difficulty setting up custom part  ${p.type}`)
            return false;
        }   
    }
     replacePartWithCustomPart(question, p, partIndex, examJSONObj) {
        try {
            const type = p.type;
            const subType = p.newPartTypeMatch;
            const templateJSONObj = JSONTemplateProvider.getTemplate(type);
            const promptSuccess = this.replacePrompt(p, templateJSONObj);
            templateJSONObj.marks = p.marks;
            const success = this.replacePartSettings(p, templateJSONObj);
            if (success && promptSuccess && templateJSONObj) {
                
                examJSONObj.question_groups[0].questions[question.number - 1].parts[partIndex] = {};
                examJSONObj.question_groups[0].questions[question.number - 1].parts[partIndex] = templateJSONObj;
                console.log(`Replaced part ${p.number} in question ${question.number} with custom part of type ${type} and sub type ${subType}`);
   
                return true;
            } else {
                this.reportError(new Error("Unable to get template JSON object"), `Difficulty setting up custom part ${question.name} ${p.type}`)
                return false;
            }

        } catch (err) {
            this.reportError(err, `Unable to replace part with custom part for question ${question.name}`);
        }
    }

}
export { QuestionJSONStitcher }