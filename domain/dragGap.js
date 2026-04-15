class DragGap {
    //although all parts have a prompt and 0 to many gaps 
    // for most parts we only need to know type, number, and we might as well get marks
    //for now leave prompt and gaps for teh parts where that matters
    constructor() {
        this.answer = "";
        this.marks = 0;
        this.gapNumber = 0;
    }


    set gapAnswer(ans) {
        this.answer = ans;
    }
    get gapAnswer() {
        return this.answer;
    }
    set gapGapNumber(n) {
        this.gapNumber = n;
    }
    get gapGapNumber() {
        return this.gapNumber;
    }
    set gapMarks(mark){
        this.marks = mark;
    }
    get gapMarks (){
        return this.marks;
    }


    gapReport() {
        let gapString = `gap number: ${this.gapNumber}\n`;
        gapString += `answer: ${this.answer} marks: ${this.marks}\n`; 
        return gapString;
    }
}
export { DragGap };