class DragAndDropPart extends part {
    constructor() {
        this.prompt = "";
        this.gaps = [];
        this.dragsVariableName = ""
        this.dragsVariableValue = "";
        this.newPartTypeMatch = "1-2-1";//other option is "bucket"

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
    addGap(gap) {
        this.gaps.push(gap);
    }



    partReport() {
        let partString = super(this.partReport);
        return partString;
    }
}
export { DragAndDropPart as default };