import { Part } from "./Part.js";
import { Builder } from "./Builder.js";
import { CardGap } from "./CardGap.js";
class CardMatch extends Part {
    constructor(data, num, variables, logger) {
        super(data, num, logger);
        super._type = "card_match";
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
        const builder = /cardmatch_builder\(.+?\)/.exec(this.prompt);
        const pairsVariableName = /pairs_./.exec(builder);
        const pairsValues = variables[pairsVariableName].definition;
        this._pairsVariableName = pairsVariableName || "";
        this._pairsVariableValue = pairsValues || "";
        this._newPartTypeMatch = "card-match";
        this._gaps = this.processGaps(data.gaps);
        this._builder = new Builder(builder, logger);
        const height = /cardmatch_cardHeight\(.+?\)/.exec(this.prompt) ? /cardmatch_cardHeight\(.+?\)/.exec(this.prompt)[0] : '50';
        const width = /cardmatch_cardWidth\(.+?\)/.exec(this.prompt) ? /cardmatch_cardWidth\(.+?\)/.exec(this.prompt)[0] : '120';
        this._cardHeight = extractValueFromBS(height, "cardmatch_cardHeight(") || '50';
        this._cardWidth = extractValueFromBS(width, "cardmatch_cardWidth(") || '120';
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

    get pairsVariableName() {
        return this._pairsVariableName;
    }

    get pairsVariableValue() {
        return this._pairsVariableValue;
    }


    get newPartTypeMatch() {
        return this._newPartTypeMatch;
    }


    partReport() {
        let partString = super.partReport();
        partString += `scholar type:card match\n`;
        partString += `prompt: ${this._prompt}\n`;
        partString += `pairs variables: name ${this._pairsVariableName}, value ${this._pairsVariableValue}\n`;

        return partString;
    }
}
export { CardMatch };