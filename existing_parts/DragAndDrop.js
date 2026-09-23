import { Part } from "./Part.js";
import { Builder } from "./Builder.js";
import { DragGap } from "./DragGap.js";
import { ErrorReporter } from "../utils/ErrorReporter.js";
class DragAndDropPart extends Part {
    constructor(data, num, variables, logger) {

        super(data, num, logger);
        this._type = "drag_and_drop";
        function extractValueFromBS(val, prefix) {
            try {
                const length = prefix.length;
                if (val.indexOf(prefix) !== -1) {
                    return val.substring(length, val.length - 1);
                } else {
                    return val;
                }
            } catch (err) {
                errorReporter.reportError(err);
                return val;
            }

        }
        function convertPixelsToEms(px) {
            //convert a value in pixels to a number of columns for a text area. This is a bit of a guess but we can adjust as needed
            //first check the string value contains px and if so convert to a number
            px = px.replaceAll("'", "");//sometimes this comes with extra quotes
            let result = 0;
            if (typeof px === 'string'){
                if (px.endsWith('px')) {
                    px = px.slice(0, -2)
                }
                px =parseFloat(px);
                result = Math.round(px / 16);
            } else if (typeof px === 'number') {
                result = Math.round(px / 16);
            } else {
                return px;
            }
            return result < 2 ? 2 : result;

        }
        try {
            data.gaps.map((data, i) => {
                this.addGap(new DragGap(data, i + 1));
            });
        } catch (error) {
            this.reportError(error, `Error processing gaps in drag and drop part {num}:`)
        }
        const prompt = data.prompt;

        const builder = /dnd_builder\(.+?\)/.exec(prompt);
        const dragsVariableName = /drags_./.exec(builder);
        this._dragsListAsJSONString = variables[dragsVariableName].definition;
        const height = /dnd_dragHeight\(.+?\)/.exec(prompt) ? /dnd_dragHeight\(.+?\)/.exec(prompt)[0] : 'auto';
        const width = /dnd_dragWidth\(.+?\)/.exec(prompt) ? /dnd_dragWidth\(.+?\)/.exec(prompt)[0] : 'auto';
        const builderPrefix = "dnd_drag";

        this._dragsVariableName = dragsVariableName || "";

        this._dragHeight = convertPixelsToEms(extractValueFromBS(height, builderPrefix + 'Height(')) || '';
        this._dragWidth = convertPixelsToEms(extractValueFromBS(width, builderPrefix + 'Width(')) || '';
        this._builder = new Builder(builder, logger);
        this._subType = this.builder.builderType;
        //check teh prompt for either 'absdz' or 'relativeDiv' overwrite here for these edge cases
        const dragToImageFlag = /(absdz|relativeDiv)/.exec(prompt);
        if (dragToImageFlag) {
            this._subType = 'drag_1_2_1';
        }
        this._newPartType = this.newPartTypeMatch;
        this._convertedPrompt = this.processPrompt(prompt);

        super.marks = this.marksFromGaps;

    }

    static get dndSubTypes() {
        return ['bucket', 'reorder', 'drag_1_2_1'];
    }
    static verifySubType(type) {
        return DragAndDropPart.dndSubTypes.indexOf(type) > -1;
    }

    get needsReplacing() {
        return true;
    }

    processPrompt(prompt) {
        //find hte marked areas in the prompt
        //find all the gaps [[n]] and replace with the appropriate gap display answer- using the display answer not the gap answer means this will work for drop in bucket type too
        //although there may need to be additional processing to convert
        //remove builder string.


        try {
            //test logger

            const gapRegex = /\[\[\d+\]\]/g;
            let filledPrompt = prompt.replace(gapRegex, (match) => {
                const gapNumber = parseInt(match.match(/\d+/)[0], 10);
                const gap = this._gaps[gapNumber];
                const gapAnswerVariable = gap.displayAnswer;

                //find the bit in square brackets then remove the brackets    

                try {
                    if (!gapAnswerVariable || gapAnswerVariable === '') {
                        console.warn('empty gap' + gapAnswerVariable + "dragList " + this.dragsList + " match" + match)
                        return '%[]%';
                    }
                    const index = parseInt(gapAnswerVariable.match(/\[\d+\]/)[0].replace(/\[|\]/g, ''), 10); // Extract the index number from the variable name
                    const value = gapAnswerVariable && this.dragsList  ? this.dragsList[index] : 'there was an issue with this gap'; // Replace with answer or keep original if not found
                    return value ? `%[${value}]%` : match; // Replace with answer, plus new markup, or keep original if not found
                } catch (error) {
                    console.error(`Error processing gap ${gapNumber} with answer variable ${gapAnswerVariable} and match ${match}:`, error);
                    this.reportError(error, `Error processing gap ${gapNumber} with answer variable ${gapAnswerVariable} and match ${match} and gap.dragList ${this.dragsList}:`);
                    return match; // Keep original if error occurs
                }



            });
         
            try {
                if (this._newPartType === 'bucket') {
                    // Need to wrap each table cell in bucket markup.
                    
                    filledPrompt = filledPrompt
                        .replace(/<td\b([^>]*)>/gi, '<td$1>@[')
                        .replace(/<\/td>/gi, ']@</td>');
                }

            } catch (error) {
                this.reportError(error, `Unable to find or make buckets in drop in bucket question- will require manual intervation to run`);
            }

            //remove hthe builder string gubbins
            const convertedPrompt = filledPrompt.replace(/\<p\>\s*{\s*dnd_builder\(.+?\)\s*}\s*{dnd_render\(\)\s*}\s*\<\/p\>/, '');
            return convertedPrompt;
        } catch (error) {
            console.error("Error processing prompt or finding matches for gaps:", error);
            this.reportError(error, "Error processing prompt or finding matches for gaps:");
            return prompt; // Return the original prompt if an error occurs
        }
    }
    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'DragAndDropPart'}: ${additional} : ${err.message}`;
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
                try {
                    dragList = JSON.parse(cleanedValues);
                } catch (error) {
                    //going to catch this here and see if we can continue- if we can't then it will error out at the next error
                    console.error("WARNING: problem with drag values detected\n${dragValues}");
                    dragList = JSON.parse(dragValues);
                    console.error("it looks like we survived");
                }
            } else {
                dragList = null;
                console.warn(`Drag values not found for variable ${dragsVariableName}`);
            }
            return dragList;

        } catch (error) {

            this.reportError(error, 'Error processing drag values:');
            //parse with string manipulation as a fallback
            //const trimmedValues = dragValues.trim("'[").trim("]'");
            //dragList = trimmedValues.split(',');
            return null;
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
                (accumulator, currentValue) => accumulator + Number(currentValue),
                0,
            );
            return marks ? marks : 0;
        } catch (err) {
            this.reportError(err, "");
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
        //console.log(`drag and drop sub type is ${this._subType}`);
        switch (this._subType) {
            case 'reorder':
            case 'text':
                newPartType = 'reorder';
                break;
            case 'image':
            case '1-2-1':
            case 'drag_1_2_1':
                newPartType = 'drag_1_2_1';
                break;
            default:
                newPartType = 'reorder';
        }
        //check it is valid
        if (DragAndDropPart.verifySubType(newPartType)) {

            return newPartType;
        } else {
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