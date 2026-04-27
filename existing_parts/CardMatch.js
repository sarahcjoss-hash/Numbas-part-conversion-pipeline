import { Part } from "./Part.js";
import { Builder } from "./Builder.js";
import { DragGap } from "./DragGap.js";
class CardMatch extends Part {
    constructor(num, data, variables) {
        super(num, data);
        super._type = "card_match";
        const builder = /dnd_builder\(.+?\)/.exec(prompt);
        const dragsVariableName = /drags_./.exec(builder);
        const dragValues = variables[dragsVariableName].definition;
        this._dragsVariableName = dragsVariableName || "";
        this._dragsVariableValue = dragValues || "";
        this._newPartTypeMatch = "card-match";
        this._gaps = this.processGaps(data.gaps);
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
    get prompt() {
        return this._prompt;
    }

    get dragsVariableName() {
        return this._dragsVariableName;
    }

    get dragsVariableValue() {
        return this._dragsVariableValue;
    }


    get newPartTypeMatch() {
        return this._newPartTypeMatch;
    }


    partReport() {
        let partString = super.partReport();
        partString += `scholar type:card match\n`;
        partString += `prompt: ${this._prompt}\n`;
        partString += `drag variables: name ${this._dragsVariableName}, value ${this._dragsVariableValue}\n`;

        return partString;
    }
}
export { CardMatch };