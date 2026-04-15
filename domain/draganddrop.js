import { Part } from "./Part.js";
class DragAndDropPart extends Part {
    constructor() {
        this.prompt = "";
        this.gaps = [];
        this.dragsVariableName = ""
        this.dragsVariableValue = "";
        this.newPartTypeMatch = "1-2-1";//other option is "bucket";
        this.type = "drag_and_drop";
        this.dragHeight = "";
        this.dragWidth = "";

    }

    set partPrompt(prompt) {
        this.prompt = prompt;
    }
    get partPrompt() {
        return this.prompt;
    }
    set dragsVariableName(name) {
        this.dragsVariableName = name;
    }
    get dragsVariableName() {
        return this.dragsVariableName;
    }
    set dragsVariableValue(value) {
        this.dragsVariableValue = value;
    }
    get dragsVariableValue() {
        return this.dragsVariableValue;    
    }
    set newPartTypeMatch(type){
        this.newPartTypeMatch = type;

    }
    get newPartTypeMatch(){
        return this.newPartTypeMatch;
    }
    set dragHeight(height){
        this.dragHeight = height;
    }       
    get dragHeight(){
        return this.dragHeight;
    }
    set dragWidth(width){
        this.dragWidth = width;
    }   
    get dragWidth(){
        return this.dragWidth;
    }




    partReport() {
        let partString = super.partReport();
        return partString;
    }
}
export { DragAndDropPart };