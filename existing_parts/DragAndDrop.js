import { Part } from "./Part.js";
import { Builder } from "./Builder.js";
import { DragGap } from "./DragGap.js";
class DragAndDropPart extends Part {
    constructor(data, num, variables) {

        super(data, num);
        super._type = "drag_and_drop";
        try {
            data.gaps.map((data, i) => {
                super.addGap(new DragGap(data, i + 1));
            });
        } catch (error) {
            console.error("Error processing gaps:", error);
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
        console.log(this.dragsList);

    }

    processPrompt(prompt) {
        //find hte marked areas in the prompt
        //find all the gaps [[n]] and replace with the appropriate gap answer
        //remove builder string.
        try {
            const gapRegex = /\[\[\d+\]\]/g;
            const filledPrompt = prompt.replace(gapRegex, (match) => {
                const gapNumber = parseInt(match.match(/\d+/)[0], 10);
                const gap = this._gaps[gapNumber];
                const gapAnswerVariable = gap.answer;
                //find the bit in square brackets then remove the brackets                const index = parseInt(gapAnswerVariable.match(/\[\d+\]/)[0], 10).replace(/\[|\]/g, ''); // Extract the index number from the variable name
                const value = gapAnswerVariable && this.dragsList ? this.dragsList[index] : match; // Replace with answer or keep original if not found
                return value ? `%[${value}]%` : match; // Replace with answer, plus new markup, or keep original if not found
            });            
            //remove hthe builder string gubbins
            const convertedPrompt = filledPrompt.replace(/\<p\>\s*{\s*dnd_builder\(.+?\)\s*}\s*{dnd_render\(\)\s*}\s*\<\/p\>/, '');
            console.log("Converted Prompt:", convertedPrompt);
        } catch (error) {
            console.error("Error processing prompt:", error);
        }
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
    get filledVariables() {

    }
    get convertedPrompt() {
        return this._convertedPrompt;
    }
    findNewPartTypeMatch() {
        //the type of drag and drop is in the builder string
    }
    get newPartTypeMatch() {
        return this._newPartTypeMatch;
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
        partString += `drag height: ${this._dragHeight} `;
        partString += `drag width: ${this._dragWidth}\n`;
        partString += `drag variables: name ${this._dragsVariableName}, value ${this._dragsVariableValue}\n`;
        partString += `builder : ${this._builder.report()}\n`;

        partString += `SETTINGS number of gaps ${this._numberOfGaps} \n`;

        partString += this._gaps.map((g, i) => {
            return `Gap ${i}: answer ${g.answer} Marks: ${g.marks}\n`
        });
        return partString;
    }
}
export { DragAndDropPart };