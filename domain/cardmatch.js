import { Part } from "./Part.js";
class CardMatch extends Part {
    constructor() {
        this.prompt = "";
        this.gaps = [];
        this.dragsVariableName = ""
        this.dragsVariableValue = "";
        this.newPartTypeMatch = "card-match";

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

    get newPartTypeMatch(){
        return this.newPartTypeMatch;
    }


    partReport() {
        let partString = super.partReport();
        return partString;
    }
}
export { CardMatch };