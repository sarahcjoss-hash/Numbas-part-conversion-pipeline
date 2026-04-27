import { Exam } from "./existing_parts/Exam.js";
import { Question } from "./existing_parts/Question.js";
import { Part } from "./existing_parts/Part.js";
import { ManualMarkingPart } from "./existing_parts/manualmarkingpart.js";
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
            let question = new Question(q,i+1);
            //working here to change code so that questions and aprts populate themselves from teh data- 
            // //think about how you do this for sub parts- at teh m,oment we are ending up with parts that do not ahve the requisite data
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
                         part = new ManualMarkingPart(p, i+1);
                    }else if (ddFlag) {
                        part = new DragAndDropPart(p, i+1, q.variables);
                   
                    }else if (cmFlag){
                        part = new CardMatch(p, i+1, q.variables);
                    }
                    else{
                        part = new Part(i+1,p);                        
                    }            
             
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