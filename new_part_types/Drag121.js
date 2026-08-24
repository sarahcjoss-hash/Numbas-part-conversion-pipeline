
import { NewDragAndDrop } from "./NewDragAndDrop.js";
class Drag121 extends NewDragAndDrop {
    constructor(errorLogger) {
        super(errorLogger);
        this._type = "drag_1_2_1";   


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
        settings.drags_position = true;
        settings.scholarInstruction = "Select the items in the order you would like to position them or to place an item in a specific position, select the space before selecting the item.";
        
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