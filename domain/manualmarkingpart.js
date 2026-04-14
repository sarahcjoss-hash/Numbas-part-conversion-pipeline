class ManualMarkingPart extends part {
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
    addGap(gap) {
        this.gaps.push(gap);
    }

    partReport() {
        let partString = super(this.partReport);
        return partString;
    }
}
export { ManualMarkingPart as default };