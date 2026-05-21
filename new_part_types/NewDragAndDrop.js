

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
        this._settings = NewDragAndDrop.getDefaultSettings();
   
    }

    static getDefaultSettings() {
        let settings = {};
        settings.distractors = [];
        settings.all_or_nothing = false;
        return settings;

    }
    set type(type) {
        super.type = type;
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
    
    set howManyDrags(num) {
        this._howManyDrags = num;
    }   
    get howManyDrags() {
        return this._howManyDrags;
    }
    set distractors(arr){
        this._distractors = arr;
        this.updateSetting('distractors',arr);

    }  
    get distractors() {
        return this._distractors;
    }
    set targetHeight(height) {
        this._targetHeight = height;
        this.updateSetting('target_height',height);
    }
    get targetHeight() {
        return this._targetHeight;
    }
    set allOrNothing(allOrNothing) {
        this._allOrNothing = allOrNothing;
        this.updateSetting('all_or_nothing',allOrNothing);
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