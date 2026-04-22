import { Part } from "./Part.js";
import { Builder } from "./Builder.js";
class DragAndDropPart extends Part {
    constructor(num) {
        super(num);
        super._type = "drag_and_drop";
        this._prompt = "";
        this._dragsVariableName = "";
        this._dragsVariableValue = "";
        this._newPartTypeMatch = "1-2-1";//other option is "bucket";
        super._type = "drag_and_drop";
        this._dragHeight = "";
        this._dragWidth = "";
        this._builder = new Builder();
    }

    set prompt(prompt) {
        this._prompt = prompt;
    }
    get prompt() {
        return this._prompt;
    }
    set dragsVariableName(name) {
        this._dragsVariableName = name;
    }
    get dragsVariableName() {
        return this._dragsVariableName;
    }
    set dragsVariableValue(value) {
        this._dragsVariableValue = value;
    }
    get dragsVariableValue() {
        return this._dragsVariableValue;    
    }
    set newPartTypeMatch(type){
        this._newPartTypeMatch = type;

    }
    get newPartTypeMatch(){
        return this._newPartTypeMatch;
    }
    set dragHeight(height){
        this._dragHeight = height;
    }       
    get dragHeight(){
        return this._dragHeight;
    }
    set dragWidth(width){
        this._dragWidth = width;
    }   
    get dragWidth(){
        return this._dragWidth;
    }

    get builder(){
        return this._builder;
    }




    partReport() {
        let partString = super.partReport();
        partString += `drag height: ${this._dragHeight} `;
        partString += `drag width: ${this._dragWidth}\n`;
        partString += `drag variables: name ${this._dragsVariableName}, value ${this._dragsVariableValue}\n`;
        partString += `builder : ${this._builder.report()}\n`;
        return partString;
    }
}
export { DragAndDropPart };