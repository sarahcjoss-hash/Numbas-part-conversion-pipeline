import { Part } from "./Part.js";
import { Builder } from "./Builder.js";

class ManualMarkingPart extends Part {
    constructor(num) {
        super(num);
        super._type = "manual_marking";
        this._prompt = "";
        this._textAreaWidth = 'auto';
        this._textAreaHeight = 'auto';
        this._answer = "";
        this._builder = new Builder();

    }

    set prompt(prompt) {
        this._prompt = prompt;
    }
    get prompt() {
        return this._prompt;
    }
    set textAreaWidth(width) {
        this._textAreaWidth = width;
    }
    get textAreaWidth() {
        return this._textAreaWidth;
    }
    set textAreaHeight(height) {
        this._textAreaHeight = height;
    }
    get textAreaHeight() {
        return this._textAreaHeight;    
    }
    set answer(ans){
        this._answer = ans;

    }
    get answer(){
        return this._answer;
    }
    get builder(){
        return this._builder;
    }


    partReport() {
        let partString = super.partReport();
            partString += `prompt: ${this._prompt}\n`;
            partString += `text area width: ${this._textAreaWidth} text area height: ${this._textAreaHeight}\n`;
            partString += `answer: ${this._answer}\n`;
            partString += this._builder.report();
        return partString;
    }
}
export { ManualMarkingPart };