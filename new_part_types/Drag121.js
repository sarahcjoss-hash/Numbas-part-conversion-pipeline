
import { NewDragAndDrop } from "./NewDragAndDrop.js";
class Drag121 extends NewDragAndDrop {
    constructor(errorLogger) {
        super(errorLogger);
        this._type = "drag_1_2_1";   
        this._targetText = "";
        this._howManyDrags = 1;
        this._targetWidth = 10;
        this._targetHeight = 2;
        this._distractors = [];
        this._dragItems = [];
        this._settings = Drag121.getDefaultSettings();


    }
     static getDefaultSettings() {
        let settings = {};
        settings.target_text = "<p>Oh %[dear]% this is the default text</p>";
        settings.how_many_drags = "1";
        settings.distractors = [];
        settings.target_height = "2";
        settings.target_width = "10";
        settings.all_or_nothing = false;
        settings.drags_position = true;
        settings.scholarInstruction = "Select an item and the location you would like to position it.";
                            
        return settings;
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