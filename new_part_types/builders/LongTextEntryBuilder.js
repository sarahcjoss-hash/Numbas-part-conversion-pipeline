import { NewPartBuilder } from "./NewPartBuilder.js";
import { LongTextEntry } from "../LongTextEntry.js";

class LongTextEntryBuilder extends NewPartBuilder {
    constructor(errorLogger) {
        super(errorLogger);
        this._type = "long-text-entry-builder";
    }

    buildFromExisting(part) {
        try {
            //there are issue converting the pixels sizes to text area sizes
            //don;t worry too much about this for this iteration just get it working but for future using 
            // field-sizing where available
            let newPart = new LongTextEntry(this._errorLogger);
            newPart.marks = part.marks || 1;
            newPart.prompt = part.prompt;
            newPart.cols = LongTextEntry.convertPixelsToColumns(part.textAreaWidth || 50);
            newPart.rows = LongTextEntry.convertEmsToRows(part.textAreaHeight || 4);
            newPart.modelAnswer = part.answer ;
            newPart.howManyChecks = part.numberofGaps;           
            return newPart;
        } catch (err) {
            err.message = `Error creating new Long text entry part from existing part ${part.type}: ${err.message}`;
            this.reportError(err);//have to report directly to log as in this case it may have gone so wrong we cannot call reportError on super
        }
    }
}
export { LongTextEntryBuilder };
