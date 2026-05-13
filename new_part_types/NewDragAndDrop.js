

import { NewPart } from "./NewPart.js";
class NewDragAndDrop extends NewPart {
    constructor(errorLogger) {
        super(errorLogger);
        this._prompt = "";
        this._dragsVariableName = "";
        this._dragsVariableValue = "";
        this._howManyDrags = "";
        this._distractors = [];
        this._targetHeight = "";
        this._allOrNothing = false;
        this._templateJson;
        this._templateSettings;
        this._dragItems = [];
   
    }
    set type(type) {
        super._type = type;
    }
    set prompt(prompt) {
        this._prompt = prompt;
    }
    set templateJson (name) {
        this._templateJson = name;
    }
    set templateSettings (settings) {
        this._templateSettings = settings;
    }
    set dragItems(items){
        this._dragItems = items;
    }




    get prompt() {
        return this._prompt;
    }
    set targetText(text) { 
        this._targetText = text;
    }
    get targetText() {
        return this._targetText;
    }     
    set howManyDrags(num) {
        this._howManyDrags = num;
    }   
    get howManyDrags() {
        return this._howManyDrags;
    }
    set distractors(distractors) {
        this._distractors = distractors;
    }   
    get distractors() {
        return this._distractors;
    }
    set targetHeight(height) {
        this._targetHeight = height;
    }
    get targetHeight() {
        return this._targetHeight;
    }
    set allOrNothing(allOrNothing) {
        this._allOrNothing = allOrNothing;
    }
    get allOrNothing() {
        return this._allOrNothing;
    }
    get newPartTypeMatch(){
        return this._newPartTypeMatch;
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
export { NewDragAndDrop };