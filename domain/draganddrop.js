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
    set partDragsVariableName(name) {
        this.dragsVariableName = name;
    }
    get partDragsVariableName() {
        return this.dragsVariableName;
    }
    set partDragsVariableValue(value) {
        this.dragsVariableValue = value;
    }
    get partDragsVariableValue() {
        return this.dragsVariableValue;    
    }
    set partNewPartTypeMatch(type){
        this.newPartTypeMatch = type;

    }
    get partNewPartTypeMatch(){
        return this.newPartTypeMatch;
    }
    set partDragHeight(height){
        this.dragHeight = height;
    }       
    get partDragHeight(){
        return this.dragHeight;
    }
    set partDragWidth(width){
        this.dragWidth = width;
    }   
    get partDragWidth(){
        return this.dragWidth;
    }




    partReport() {
        let partString = super.partReport();
        return partString;
    }
}
export { DragAndDropPart };