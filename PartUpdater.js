import { LongTextEntry } from './new_part_types/LongTextEntry.js';
import {Drag121 } from './new_part_types/Drag121.js';
import {DropInBucket } from './new_part_types/DropInBucket.js';
import {CardMatch } from './new_part_types/CardMatch.js';
import {SentenceReorder} from './new_part_types/SentenceReorder.js';

class PartUpdater {
    constructor(errorLogger) {
        this.errorlog = errorLogger
    }

    reportError(err, additional){
        err.message= `${additional} : ${err.message}`
        this._errorLog.reportError(err);
}
    convertPart(part) {
        try{
        let partToConvert = part;
        let newPart = part;
        const type = partToConvert.type;
        switch (type) {
            case "drag_and_drop":
               newPart = this.convertToDragAndDrop(part);
                break;
            case "card_match":
                newPart = new CardMatch(part.number);
                break;
            case "manual_marking":
                newPart = this.convertToLongTextEntry(part);
                break;
            default:
                console.log(`no conversion for part type ${type}`);

        }
        return newPart;
    }catch(err){
        err.message = `Error trying to convert part ${part.number}: ${err.message}`
        return part;
    }
    }
    convertToLongTextEntry(part){
        let  newPart = LongTextEntry.createNewFromExisting(part,  this.errorlog);

    }

    convertToDragAndDrop(oldPart){
         const dndSubType = oldPart.newPartTypeMatch;
         const prompt = oldPart.prompt;
         const targetText = oldPart.convertedPrompt;
         let newPart = oldPart;
         
                switch (dndSubType) {
                    case "1-2-1":
                        //
                        newPart = new Drag121(oldPart.number)
                        break;
                    case "bucket":
                        newPart = DropInBucket.createNewFromExisting(oldPart, this.errorlog);
                        break;
                        case "reorder":
                            newPart = new SentenceReorder(oldPart.number)
                    default:
                        this.reportError(new Error(`no conversion for drag_and_drop sub-type ${dndSubType}`))
                        console.log(`no conversion for drag_and_drop sub-type ${dndSubType}`);
                }

        return this.newPart;
    }
    convertOldDnDPromptToTargetText(oldPrompt){
        return oldPrompt.replace(/%\[targets\]%/g, "%[targets]%").replace(/%\[your item here\]%/g, "%[your item here]%");
    }
}
export { PartUpdater};