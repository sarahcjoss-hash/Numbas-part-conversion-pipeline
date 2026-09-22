import { NewPartBuilder } from "./NewPartBuilder.js";
import { Drag121 } from "../Drag121.js";
import { DropInBucket } from "../DropInBucket.js";
import { SentenceReorder } from "../SentenceReorder.js";

class DragAndDropBuilder extends NewPartBuilder {
    constructor(errorLogger) {
        super(errorLogger);
        this._type = "drag-and-drop-builder";
    }
    buildNewDrag121FromExisting(part) {
        try {
            //there are issue converting the pixels sizes to text area sizes
            //don;t worry too much about this for this iteration just get it working but for future using 
            // field-sizing where available
            let newPart = new Drag121(this._errorLogger);
            newPart.prompt = ""; //don;t include the prompt because the text goes in settings.targetText
             newPart.targetText = part.convertedPrompt;
            newPart.marks = part.marks || 1;
            newPart.how_many_gaps = part.numberofGaps;
            newPart.target_width = part.dragWidth || 10;
            newPart.target_height = part.dragHeight || 2;
            newPart.distractors = part.distractors || [];
            newPart.dragItems = part.dragItems || [];
            return newPart;
        } catch (err) {
            err.message = `Error creating new Drop in bucket part from existing part ${part.type}: ${err.message}`;
            this.reportError(err);//have to report directly to log as in this case it may have gone so wrong we cannot call reportError on super
        }
    }

    buildNewDropInBucketFromExisting(part) {
        try {
            //there are issue converting the pixels sizes to text area sizes
            //don;t worry too much about this for this iteration just get it working but for future using 
            // field-sizing where available
            let newPart = new DropInBucket(this._errorLogger);
            newPart.prompt = "";
            newPart.targetText = part.convertedPrompt;
            newPart.marks = part.marks || 1;
            newPart.how_many_matches = part.numberofGaps;
            newPart.item_width = part.dragWidth || 12;
            newPart.item_height = part.dragHeight || 2;
            newPart.distractors = part.distractors || [];
            newPart.dragItems = part.dragItems || [];
            return newPart;
        } catch (err) {
            err.message = `Error creating new Drop in bucket part from existing part ${part.type}: ${err.message}`;
            this.reportError(err);//have to report directly to log as in this case it may have gone so wrong we cannot call reportError on super
            throw err;
        }
    }

   buildNewSentenceReorderFromExisting(part) {
        try {
            //there are issue converting the pixels sizes to text area sizes
            //don;t worry too much about this for this iteration just get it working but for future using 
            // field-sizing where available
            let newPart = new SentenceReorder(this._errorLogger);
            newPart.prompt = "";
            newPart.targetText = part.convertedPrompt;
            newPart.marks = part.marks || 1;
            newPart.howManyDrags = part.numberofGaps;  
            newPart.item_width = part.dragWidth || '';
            newPart.targetHeight = part.dragHeight || 2;
            newPart.distractors = part.distractors || [];
            newPart.dragItems = part.dragItems || [];
            return newPart;
        }catch (err) {
            err.message = `Error creating new SentenceReorder part from existing part ${part.type}: ${err.message}`;
            this.reportError(err);//have to report directly to log as in this case it may have gone so wrong we cannot call reportError on super
            throw err;
        }
    }
}
export { DragAndDropBuilder };