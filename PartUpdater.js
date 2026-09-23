
import { LongTextEntryBuilder } from './new_part_types/builders/LongTextEntryBuilder.js';
import { CardMatchBuilder } from './new_part_types/builders/CardMatchBuilder.js';
import { DragAndDropBuilder } from './new_part_types/builders/DragAndDropBuilder.js';

/* Class to take an old part and convert it to a new part. 
It will use the type of the old part to determine which new part type to convert to and 
then call the appropriate conversion method on the new part. */

class PartUpdater {
    constructor(errorReporter) {
        this._errorReporter = errorReporter;
        this._updatedJSON;
    }

    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'PartUpdater'}: ${additional} : ${err.message}`
        this._errorReporter.reportError(err);
        console.error(err);
    }
    convertPart(part) {
        try {
            let partToConvert = part;
            let newPart = part;
            const type = partToConvert.type;
            switch (type) {
                case "drag_and_drop":
                    newPart = this.convertToDragAndDrop(part);
                    break;
                case "card_match":
                    const builder = new CardMatchBuilder(this._errorReporter);
                    newPart = builder.buildFromExistingPart(part);
                    break;
                case "manual_marking":
                    newPart = this.convertToLongTextEntry(part);
                    break;
                default:
                    console.log(`no conversion for part type ${type}`);

            }
            return newPart;
        } catch (err) {
            err.message = `Error trying to convert part ${part.number}: ${err.message}`
            this.reportError(err, `Error trying to convert part ${part.number}`);
            console.error(err);
            return part;
        }
    }
    convertToLongTextEntry(part) {
        try {
            const builder = new LongTextEntryBuilder(this._errorReporter);;
            return builder.buildFromExistingPart(part);
        } catch (err) {
            err.message = `Error converting to long text entry: ${err.message}`;
            this.reportError(err, "Error converting to long text entry");
            console.error(err);
            return part;
        }

    }

    convertToDragAndDrop(oldPart) {
        try {
            const dndSubType = oldPart.newPartTypeMatch;
            const prompt = oldPart.prompt;
            const targetText = oldPart.convertedPrompt;
            let newPart = oldPart;
            let builder = new DragAndDropBuilder(this._errorReporter);
            //console.log(`converting drag and drop part with  sub-type ${dndSubType}`);
            switch (dndSubType) {
                case "drag_1_2_1":
                    //
                    newPart = builder.buildNewDrag121FromExisting(oldPart);
                    break;
                case "bucket":
                    newPart = builder.buildNewDropInBucketFromExisting(oldPart);
                    break;
                case "reorder":
                    newPart = builder.buildNewSentenceReorderFromExisting(oldPart);
                    break;
                default:
                    this.reportError(new Error(`no conversion for drag_and_drop sub-type ${dndSubType}`))
                    console.log(`no conversion for drag_and_drop sub-type ${dndSubType}`);
            }

            return newPart;
        } catch (err) {
            err.message = `Error converting to drag and drop: ${err.message}`;
            this.reportError(err, "Error converting to drag and drop");
            console.error(err);
            return oldPart;
        }
    }
    convertOldDnDPromptToTargetText(oldPrompt) {
        return oldPrompt.replace(/%\[targets\]%/g, "%[targets]%").replace(/%\[your item here\]%/g, "%[your item here]%");
    }
}
export { PartUpdater };