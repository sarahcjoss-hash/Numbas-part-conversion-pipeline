import { Part } from "./Part.js";
import { Builder } from "./Builder.js";
import { DragGap } from "./DragGap.js";
import { ErrorReporter } from "../ErrorReporter.js"; 
class DragAndDropPart extends Part {
    constructor(data, num, variables, logger) {

        super(data, num);
        super._type = "drag_and_drop";
        super._errorLog = logger;
        try {
            data.gaps.map((data, i) => {
                super.addGap(new DragGap(data, i + 1));
            });
        } catch (error) {
            const message = `Error processing gaps in drag and drop part {num}: {error.message}`
            console.error("Error processing gaps in drag and drop:", error);
            errorLogger.reportError(new Error(message))
        }
        const prompt = data.prompt;
        const builder = /dnd_builder\(.+?\)/.exec(prompt);
        const dragsVariableName = /drags_./.exec(builder);
        this._dragsListAsJSONString = variables[dragsVariableName].definition;
        const width = /dnd_dragHeight\(.+?\)/.exec(prompt);
        const height = /dnd_dragWidth\(.+?\)/.exec(prompt);

        this._dragsVariableName = dragsVariableName || "";

        this._dragHeight = height || "";
        this._dragWidth = width || "";
        this._builder = new Builder(builder);
        this._convertedPrompt = this.processPrompt(prompt);


        this._subType = this.builder.builderType;
        super.marks = this.marksFromGaps;

    }

    static get dndSubTypes (){
        return ['bucket', 'reorder', '1-2-1'];
    }
    static verifySubType(type){
        return DragAndDropPart.dndSubTypes.contains(type);
    }

    processPrompt(prompt) {
        //find hte marked areas in the prompt
        //find all the gaps [[n]] and replace with the appropriate gap display answer- using the display answer not the gap answer means this will work for drop in bucket type too
        //although there may need to be additional processing to convert
        //remove builder string.


        try {
            //test logger
            this.reportError(new Error('testing the error logger'))
            const gapRegex = /\[\[\d+\]\]/g;
            const filledPrompt = prompt.replace(gapRegex, (match) => {
                const gapNumber = parseInt(match.match(/\d+/)[0], 10);
                const gap = this._gaps[gapNumber];
                const gapAnswerVariable = gap.displayAnswer;

                //find the bit in square brackets then remove the brackets                
                const index = parseInt(gapAnswerVariable.match(/\[\d+\]/)[0].replace(/\[|\]/g, ''), 10); // Extract the index number from the variable name
                const value = gapAnswerVariable && this.dragsList ? this.dragsList[index] : match; // Replace with answer or keep original if not found
                return value ? `%[${value}]%` : match; // Replace with answer, plus new markup, or keep original if not found


            });

            //remove hthe builder string gubbins
            const convertedPrompt = filledPrompt.replace(/\<p\>\s*{\s*dnd_builder\(.+?\)\s*}\s*{dnd_render\(\)\s*}\s*\<\/p\>/, '');
            return convertedPrompt;
        } catch (error) {
            console.error("Error processing prompt:", error);
        }
    }
    reportError(err){
        super.reportError(err);
    }


    get dragsVariableName() {
        return this._dragsVariableName;
    }

    get dragsList() {
        //this is astringified JSON but have found som tta contain double back slash
        try {
            let dragList = [];
            const dragValues = this._dragsListAsJSONString;
            if (dragValues) {
                //relpacing double backslash with forward slash just now because replacing d back is not working
                const cleanedValues = dragValues.replace(/\\/g, '\/');
                dragList = JSON.parse(cleanedValues);
            } else {
                dragList = null;
                console.warn(`Drag values not found for variable ${dragsVariableName}`);
            }
            return dragList;

        } catch (error) {
            console.error("Error processing drag values:", error);
            //parse with string manipulation as a fallback
            const trimmedValues = dragValues.trim("'[").trim("]'");
            dragList = trimmedValues.split(',');
            return dragList;
        }
    }

    get convertedPrompt() {
        return this._convertedPrompt;
    }
    isThisADropInBucket() {
        //check if this is a drop in bucket by looking for more then one reference to the dragVariable in each gap answer and/or the | symbol 
        //it is possible that some gaps but not all ahve more than one answer
        //and/or that more than one gap has the same answer as another gap and for it not to be drop in bucket type.
        //flag this in report
        let counter = 0;
        this._gaps.forEach(gap => {
            const answer = gap.answer;
            const variableReferences = (answer.match(new RegExp(this._dragsVariableName, 'g')) || []).length;
            const hasPipeSymbol = answer.includes('|');
            if (variableReferences > 1 || hasPipeSymbol) {
                counter++;
            }
        });
        return counter > 2 ? true : false;

    }
    get marksFromGaps() {
        try {
            const marks = this._gaps.map(g => { return g.marks }).reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
            );
            return marks ? marks : 0;
        } catch (err) {
            console.warn(err);
            return 0;
        }
    }

    get newPartTypeMatch() {
        //check if this is a drop in bucket
        //if not return the base type
        if (this.isThisADropInBucket()) {
            return 'bucket';
        }
        let newPartType = 'reorder';
        switch (this._subType) {
            case 'reorder':
            case 'text':
                newPartType = 'reorder';
                break;
            case 'image':
                newPartType = '1-2-1';
                break;
            default:
                newPartType = null;
        }
        //check it is valid
        if (DragAndDropPart.verifySubType(newPartType)){

            return newPartType;
        }else{
            throw new Error('The drag and drop subtype is not one of the known types and will not convert to a new custom part')
        }
    }

    get dragHeight() {
        return this._dragHeight;
    }

    get dragWidth() {
        return this._dragWidth;
    }

    get builder() {
        return this._builder;
    }



    partReport() {
        let partString = super.partReport();
        partString += `prompt: ${this.prompt}\n`;
        partString += `Converted prompt: ${this.convertedPrompt}\n`;
        partString += `drag height: ${this._dragHeight} `;
        partString += `drag width: ${this._dragWidth}\n`;
        partString += `drag variables: name ${this._dragsVariableName}, value ${this._dragsVariableValue}\n`;
        partString += `builder : ${this._builder.report()}\n`;
        partString += this.isThisADropInBucket() ? "!THIS PART APPEARS TO BE A DROP IN BUCKET TYPE. Please check this is correct and appropriate part type has been chosen!\n" : "This part does not appear drop in bucket type\n";

        partString += `SETTINGS number of gaps ${this._numberOfGaps} \n`;

        partString += this._gaps.map((g, i) => {
            return `Gap ${i}: answer ${g.answer} Marks: ${g.marks}\n`
        });
        return partString;
    }
}
export { DragAndDropPart };