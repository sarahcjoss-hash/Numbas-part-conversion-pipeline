import { Exam } from "./existing_parts/Exam.js";
import { Question } from "./existing_parts/Question.js";
import { Part } from "./existing_parts/Part.js";
import { ManualMarkingPart } from "./existing_parts/ManualMarkingPart.js";
import { DragAndDropPart } from "./existing_parts/DragAndDrop.js";
import { CardMatch } from "./existing_parts/CardMatch.js";


class ExamFromJSON {
    constructor(jsonData) {
        this.data = jsonData;
        this.exam;;
        //console.log('Config loaded successfully:', this.data);
        const extensionNames = ['manual_marking', 'drag_and_drop'];//can replace with a list later to match any of
        this.processExamData(this.data);
    }

    processExamData(config) {
        this.exam = new Exam(config.name, config.tags, config.description);    
        this.exam.extensions = config.extensions;
        const qGroups = config.question_groups;
        const questions = qGroups.map(qg => qg.questions).flat();//need flat here as the questions are themselves an array
        questions.map((q, i) => {
            let question = new Question(i+1);
            question.name = q.name;
            question.addTags(q.tags);
            question.addExtensions(q.extensions);

            const parts = q.parts;
            parts.map((p, i) => {
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
                        const builder = /manualmarking_builder\(.+?\)/.exec(prompt);
                        const width = /manualmarking_textarea_width\(.+?\)/.exec(prompt);
                        const height = /manualmarking_textarea_height\(.+?\)/.exec(prompt);
                        part = new ManualMarkingPart(i+1);
                        part._textAreaWidth = width;
                        part._textAreaHeight = height;
                        part.builder.builderString = builder;

                        const gap = p.gaps[0];
                    }else if (ddFlag) {
                        const numberOfGaps = p.gaps.length;
                        const variables = q.variables;
                        console.log("VARIABLES" + q.variables)
                        const builder = /dnd_builder\(.+?\)/.exec(prompt);
                        const dragsVariableName = /drags_./.exec(builder);
                        const dragValues = variables[dragsVariableName].definition;
                        const width = /dnd_dragHeight\(.+?\)/.exec(prompt);
                        const height = /dnd_dragWidth\(.+?\)/.exec(prompt);
                        part = new DragAndDropPart(i+1);
                        part.dragsVariableValue = dragValues;
                        part.dragWidth = width;
                        part.dragHeight = height;
                        part.builder.builderString = builder;
                    }else if (cmFlag){
                        part = new CardMatch();
                    }
                    else{
                        part = new Part(i+1);
                        part._type = p.type;
                    }
                    
                    part.prompt = prompt;
                    part._gaps = p.gaps;
                    question.addPart(part);

                } catch (err) {
                    console.log(`unable to get inforamtion for custom part type ${err.message}`);

                }


            });
            this.exam.addQuestion(question);

        });
    }

  // Add methods to process the JSON data as needed
}
export { ExamFromJSON};