import { Part } from "./Part.js";
import { Builder } from "./Builder.js";
import { CardGap } from "./CardGap.js";
class CardMatch extends Part {
    constructor(data, num, variables, logger) {
        super(data, num, logger);
        super._type = "card_match";
        const builder = /cardmatch_builder\(.+?\)/.exec(this.prompt);
        const pairsVariableName = /pairs_./.exec(builder);
        const pairsValues = variables[pairsVariableName].definition;
        this._pairsVariableName = pairsVariableName || "";
        this._pairsVariableValue = pairsValues || "";
        this._newPartTypeMatch = "card-match";
        this._gaps = this.processGaps(data.gaps);
        this._builder = new Builder(builder, logger);
    }

    get needsReplacing(){
        return true;
    }

    processGaps(gaps) {
        //for drag and drop we need to know the number of gaps but also the answers and marks for each gap
        //create a DragGap for each gap
        try {
            return gaps.map((gap, i) => new CardGap(gap, i + 1));
        } catch (error) {
            console.error("Error processing gaps:", error);
            return [];
        }
    }
    reportError(err, additional){
        err.message = `${additional} : ${err.message}`;
        super.reportError(err);
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