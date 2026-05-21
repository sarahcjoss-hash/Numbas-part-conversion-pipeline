import { LongTextEntry } from './new_part_types/LongTextEntry.js';
import { Drag121 } from './new_part_types/Drag121.js';
import { DropInBucket } from './new_part_types/DropInBucket.js';
import { CardMatch } from './new_part_types/CardMatch.js';
import { SentenceReorder } from './new_part_types/SentenceReorder.js';

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
                    newPart = CardMatch.createNewFromExisting(part, this._errorReporter);
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
        let newPart = LongTextEntry.createNewFromExisting(part, this._errorReporter);
        return newPart;

    }

    convertToDragAndDrop(oldPart) {
        try {
            const dndSubType = oldPart.newPartTypeMatch;
            const prompt = oldPart.prompt;
            const targetText = oldPart.convertedPrompt;
            let newPart = oldPart;
            console.log(`converting drag and drop part with  sub-type ${dndSubType}`);
            switch (dndSubType) {
                case "1-2-1":
                    //
                    newPart = new Drag121(oldPart, this._errorReporter);
                    break;
                case "bucket":
                    newPart = DropInBucket.createNewFromExisting(oldPart, this._errorReporter);
                    break;
                case "reorder":
                    newPart = SentenceReorder.createNewFromExisting(oldPart, this._errorReporter);
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