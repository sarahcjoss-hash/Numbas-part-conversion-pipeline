
import { NewDragAndDrop } from "./NewDragAndDrop.js";
class Drag121 extends NewDragAndDrop {
    constructor(errorLogger) {
        super(errorLogger);
        this._type = "scholar_drag_1_2_1";
        this._templateJson = "drag121Part.json"
        this._templateSettings = {
                                "target_text": "<p>&lt;p&gt;Write some &lt;strong&gt;text&lt;/strong&gt; with the %[targets]% marked up using %[your item here]%. &lt;/p&gt;\",</p>",
                                "how_many_gaps": "6",
                                "distractors": [],
                                "target_width": "100",
                                "target_height": "40",
                                "mark_on_match": false,
                                "all_or_nothing": false
                            }


    }

     static createNewFromExisting(part, errorLog) {
        try {
            //there are issue converting the pixels sizes to text area sizes
            //don;t worry too much about this for this iteration just get it working but for future using 
            // field-sizing where available
            let newPart = new Drag121(errorLog);
            newPart.prompt = part.prompt;
            newPart.marks = part.marks || 1;
            newPart.how_many_gaps = part.numberofGaps;  
            newPart.target_width = part.dragWidth || 100;
            newPart.target_height = part.dragHeight || 40;
            newPart.distractors = part.distractors || [];
            newPart.dragItems = part.dragItems || [];
            return newPart;
        }catch (err) {
            err.message = `Error creating new Drop in bucket part from existing part ${part.type}: ${err.message}`;
            errorLog.reportError(err);//have to report directly to log as in this case it may have gone so wrong we cannot call reportError on super
        }
    }
    set targetText(text) { 
        this._targetText = text;
        this.updateSetting('target_text',text);
    }
    get targetText() {
        return this._targetText;
    } 

    set targetWidth(width) {
        this._targetWidth = width;
        this.updateSetting('target_width',width);
    }
    get targetWidth() {
        return this._targetWidth;
    }
    //targetHeight is set in NewDragAndDrop as it is used in DropInBucket as well as Drag121


    get filledSettings() {
        let settings = {};
        settings.target_text = this._targetText;
        settings.how_many_drags = this._howManyDrags;
        settings.distractors = this._distractors;
        settings.target_height = this._targetHeight;
        settings.all_or_nothing = this._allOrNothing;
        return settings;
    }

    /*partReport() {
        let partString = super.partReport();
        partString += `drag height: ${this._dragHeight} `;
        partString += `drag width: ${this._dragWidth}\n`;
        partString += `drag variables: name ${this._dragsVariableName}, value ${this._dragsVariableValue}\n`;
        partString += `builder : ${this._builder.report()}\n`;
        return partString;
    }*/
}
export { Drag121 };