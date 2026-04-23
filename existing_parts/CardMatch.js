import { Part } from "./Part.js";
class CardMatch extends Part {
    constructor(num) {
        super(num);
        super._type = "card_match";
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
        partString += `scholar type:card match\n`;
            partString += `prompt: ${this._prompt}\n`;
                partString += `drag variables: name ${this._dragsVariableName}, value ${this._dragsVariableValue}\n`;
                
        return partString;
    }
}
export { CardMatch };