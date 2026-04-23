

import { NewDragAndDrop } from "./NewDragAndDrop.js";
class SentenceReorder extends NewDragAndDrop {
    constructor() {
        super();
        super._type = "scholar_sentence_reorder";
        super._templateJson = "sentenceReorder.json"
        super._templateSettings = {
                                "target_text": "<p>A %[complete]% %[sentence or paragraph]% %[in]% %[grammatical}% order.&nbsp;</p>",
                                "how_many_drags": "6",
                                "distractors": [],
                                "target_height": "35",
                                "all_or_nothing": false}

   
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