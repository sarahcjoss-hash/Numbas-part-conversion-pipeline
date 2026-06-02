import { NewPartBuilder } from "./NewPartBuilder.js";
import { CardMatch } from "../CardMatch.js";

class CardMatchBuilder extends NewPartBuilder {
    constructor(errorLogger) {
        super(errorLogger);
        this._type = "card-match-builder";
    }

    buildFromExistingPart(part) {
        try {
            let newPart = new CardMatch(this._errorLogger);
            newPart.prompt = part.prompt;   
            newPart.marks = part.marks || 1;
            newPart.list_of_pairs = part.pairsVariableValue|| '[["a","A"],["b","B"],["c","C"]]';
            newPart.howManyPairs = part.numberOfPairs || 3;
            newPart.card_width = part.cardWidth || 120;
            newPart.card_height = part.cardHeight || 80;
            newPart.l_c_type = part.leftCardType? part.leftCardType : ["word"];
            newPart.reorderOnReveal = part.reorderOnReveal || false;
            return newPart;
        } catch (err) {
            err.message = `Error creating new Card Match part from existing part ${part.type}: ${err.message}`;
            this.reportError(err);//have to report directly to log as in this case it may have gone so wrong we cannot call reportError on super
        }   
    }
}
export { CardMatchBuilder };
