
import { NewDragAndDrop } from "./NewDragAndDrop.js";
class Drag121 extends NewDragAndDrop {
    constructor(errorLogger) {
        super(errorLogger);
        super._type = "scholar_drag_1_2_1";
        super._templateJson = "drag121Part.json"
        super._templateSettings = {
                                "target_text": "<p>&lt;p&gt;Write some &lt;strong&gt;text&lt;/strong&gt; with the %[targets]% marked up using %[your item here]%. &lt;/p&gt;\",</p>",
                                "how_many_gaps": "6",
                                "distractors": [],
                                "target_width": "100",
                                "target_height": "40",
                                "mark_on_match": false,
                                "all_or_nothing": false
                            }


    }


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