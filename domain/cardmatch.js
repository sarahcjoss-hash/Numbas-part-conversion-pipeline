import { Part } from "./Part.js";
class CardMatch extends Part {
    constructor() {
        this._prompt = "";
        this._dragsVariableName = "";
        this._dragsVariableValue = "";
        this._newPartTypeMatch = "card-match";
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


    partReport() {
        let partString = super.partReport();
        return partString;
    }
}
export { CardMatch };