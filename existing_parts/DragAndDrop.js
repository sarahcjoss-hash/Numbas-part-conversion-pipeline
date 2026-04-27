import { Part } from "./Part.js";
import { Builder } from "./Builder.js";
import { DragGap } from "./DragGap.js";
class DragAndDropPart extends Part {
    constructor(data, num, variables) {
        super(data, num);
        super._type = "drag_and_drop";
        const prompt = data.prompt;
        const numberOfGaps = data.gaps.length;
        const builder = /dnd_builder\(.+?\)/.exec(prompt);
        const dragsVariableName = /drags_./.exec(builder);
        const dragValues = variables[dragsVariableName].definition;
        const width = /dnd_dragHeight\(.+?\)/.exec(prompt);
        const height = /dnd_dragWidth\(.+?\)/.exec(prompt);
        this._prompt = "";
        this._dragsVariableName = dragsVariableName || "";
        this._dragsVariableValue = dragValues || [];
        //this._newPartTypeMatch = "1-2-1";//other option is "bucket";

        this._gaps = this.processGaps(data.gaps);

        this._dragHeight = height || "";
        this._dragWidth = width || "";
        this._builder = new Builder();
        this._builder.builderString = builder || "";
    }

    processPrompt(prompt) {
        //find hte marked areas in the prompt
    }
    processGaps(gaps) {
        //for drag and drop we need to know the number of gaps but also the answers and marks for each gap
        //create a DragGap for each gap
        try {
            return gaps.map((gap, i) => new DragGap(gap, i + 1));
        } catch (error) {
            console.error("Error processing gaps:", error);
            return [];
        }
    }

    get dragsVariableName() {
        return this._dragsVariableName;
    }

    get dragsVariableValue() {
        return this._dragsVariableValue;
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