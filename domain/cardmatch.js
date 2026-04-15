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


    partReport() {
        let partString = super.partReport();
        return partString;
    }
}
export { CardMatch };