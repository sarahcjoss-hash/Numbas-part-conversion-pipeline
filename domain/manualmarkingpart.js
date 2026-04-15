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
    set textAreaWidth(width) {
        this.textAreaWidth = width;
    }
    get textAreaWidth() {
        return this.textAreaWidth;
    }
    set textAreaHeight(height) {
        this.prompt = height;
    }
    get textAreaHeight() {
        return this.textAreaHeight;    
    }
    set answer(ans){
        this.answer = ans;

    }
    get answer(){
        return this.answer;
    }


    partReport() {
        let partString = super.partReport();
        return partString;
    }
}
export { ManualMarkingPart };