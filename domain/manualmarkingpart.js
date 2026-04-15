import { Part } from "./Part.js";
class ManualMarkingPart extends Part {
    constructor() {
        this.prompt = "";
        this.gaps = [];
        this.textAreaWidth;
        this.textAreaHeight;
        this.answer = "";

    }

    set partPrompt(prompt) {
        this.prompt = prompt;
    }
    get partPrompt() {
        return this.prompt;
    }
    set partTextAreaWidth(width) {
        this.textAreaWidth = width;
    }
    get partTextAreaWidth() {
        return this.textAreaWidth;
    }
    set partTextAreaHeight(height) {
        this.textAreaHeight = height;
    }
    get partTextAreaHeight() {
        return this.textAreaHeight;    
    }
    set partAnswer(ans){
        this.answer = ans;

    }
    get partAnswer(){
        return this.answer;
    }


    partReport() {
        let partString = super.partReport();
        return partString;
    }
}
export { ManualMarkingPart };