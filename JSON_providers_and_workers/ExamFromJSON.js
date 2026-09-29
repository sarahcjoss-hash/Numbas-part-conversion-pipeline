import { Exam } from '../existing_parts/Exam.js';
import { Question } from "../existing_parts/Question.js";
import { Part } from "../existing_parts/Part.js";
import { ManualMarkingPart } from "../existing_parts/ManualMarkingPart.js";
import { DragAndDropPart } from "../existing_parts/DragAndDrop.js";
import { CardMatch } from "../existing_parts/CardMatch.js";



class ExamFromJSON {
    constructor(jsonData, errorReporter) {
        this.data = jsonData;
        this._errorLog = errorReporter;//consider changing this later for a config with logger, logToConsole, and mock etc.
        this.exam;
        //console.log('Config loaded successfully:', this.data);

        this.processExamData(this.data);
    }
    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'ExamFromJSON'}: ${additional} : ${err.message}`
        this._errorLog.reportError(err);
    }

    processExamData(config) {
        this.exam = new Exam(config.name, config.tags, config.description, this.errorLog);
        this.exam.existingExtensions = config.extensions;
        const qGroups = config.question_groups;
        const questions = qGroups.map(qg => qg.questions).flat();//need flat here as the questions are themselves an array
        let partWithFlagFound = false; 
        try {
            questions.map((q, i) => {
                let question = new Question(q, i + 1, this.errorLog);
                //working here to change code so that questions and aprts populate themselves from teh data- 
                // //think about how you do this for sub parts- at teh m,oment we are ending up with parts that do not ahve the requisite data
                const parts = q.parts;
                
                parts.map((p, j) => {
                    let part;
                    const prompt = p.prompt;
                    const mmFlag = prompt?.match('manualmarking_builder') ? true : false;
                    const ddFlag = prompt?.match('dnd_builder') ? true : false;
                    const cmFlag = prompt?.match('cardmatch_builder') ? true : false;


                    //to do
                    //pull out the drag and drop values
                    //this will include having to find the varaible name and then get teh varaible values

                    try {
                        if (mmFlag) {
                            part = new ManualMarkingPart(p, j + 1, q.advice, this._errorLog);
                            partWithFlagFound = true;
                        } else if (ddFlag) {
                            part = new DragAndDropPart(p, j + 1, q.variables, this._errorLog);
                            partWithFlagFound = true;

                        } else if (cmFlag) {
                            part = new CardMatch(p, j + 1, q.variables, this._errorLog);
                            partWithFlagFound = true;
                        }
                        else {
                            part = new Part(p, j + 1, this._errorLog);
                        }

                        question.addPart(part);
                    } catch (err) {

                        this.reportError(err, `unable to get inforamtion for custom part type ${q.name} part ${j + 1}`);


                    }


                });
                if (!partWithFlagFound) {
                    console.log(`No custom part flags found for question ${i + 1} : ${q.name}`);
                    if (question.extensions && question.extensions.length > 0) {
                        console.log(`Removing extensions for question ${i + 1} : ${q.name} as no custom part flags were found- looks like an anomaly`);

                        question.removeAllExistingExtensions();
                        question.hasCustomParts = false;
                        question.hasRogueExtensions = true;
                        this.reportError(new Error(`Anomaly - rogue extension`), `Exam ${this.exam.name} question ${i + 1} : ${q.name} you need to remove unused extensions`);
                    }
                }
                this.exam.addQuestion(question);

            })
        } catch (err) {

            this.reportError(err, "");
        }
    }

    // Add methods to process the JSON data as needed
}
export { ExamFromJSON };