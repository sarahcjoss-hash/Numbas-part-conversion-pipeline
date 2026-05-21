

import { NewDragAndDrop } from "./NewDragAndDrop.js";
class SentenceReorder extends NewDragAndDrop {
    constructor(errorLogger) {
        super(errorLogger);
        super.type = "scholar_sentence_reorder";
        this._templateJson = "sentenceReorder.json"
        this._templateSettings = {
                                "target_text": "<p>A %[complete]% %[sentence or paragraph]% %[in]% %[grammatical}% order.&nbsp;</p>",
                                "how_many_drags": "6",
                                "distractors": [],
                                "target_height": "35",
                                "all_or_nothing": false}
        this._settings = SentenceReorder.getDefaultSettings();

    }
    
    static getDefaultSettings() {
        let settings = {};
        settings.target_text = "<p>A %[complete]% %[sentence or paragraph]% %[in]% %[grammatical}% order.&nbsp;</p>";   
        settings.how_many_drags = "6";
        settings.distractors = [];
        settings.target_height = "35";
        settings.all_or_nothing = false;
        return settings;
    }
    set targetText(text) {
        this._targetText = text;
        this.updateSetting('target_text',text);
    }
    set targetHeight(height) {
        this._targetHeight = height;
        this.updateSetting('target_height',height);
    }
    set howManyDrags(num) {
        this._howManyDrags = num;
        this.updateSetting('how_many_drags',num);
    }

     static createNewFromExisting(part, errorLog) {
        try {
            //there are issue converting the pixels sizes to text area sizes
            //don;t worry too much about this for this iteration just get it working but for future using 
            // field-sizing where available
            let newPart = new SentenceReorder(errorLog);
            newPart.prompt = part.prompt;
            newPart.targetText = part.convertedPrompt;
            newPart.marks = part.marks || 1;
            newPart.howManyDrags = part.numberofGaps;  
            newPart.item_width = part.dragWidth || 120;
            newPart.targetHeight = part.dragHeight || 80;
            newPart.distractors = part.distractors || [];
            newPart.dragItems = part.dragItems || [];
            return newPart;
        }catch (err) {
            err.message = `Error creating new SentenceReorder part from existing part ${part.type}: ${err.message}`;
            errorLog.reportError(err);//have to report directly to log as in this case it may have gone so wrong we cannot call reportError on super
            throw err;
        }
    }


    get filledSettings(){
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
export { SentenceReorder };