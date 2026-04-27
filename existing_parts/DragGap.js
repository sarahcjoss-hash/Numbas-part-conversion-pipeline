class DragGap {
    //although all parts have a prompt and 0 to many gaps 
    // for most parts we only need to know type, number, and we might as well get marks
    //for now leave prompt and gaps for teh parts where that matters
    constructor(data, num) {
        this._answer = data.answer || "";
        this._marks = data.marks || 0;
        this._gapNumber = num || 0;
        this._type = data.type;
    }



    get answer() {
        return this._answer;
    }

    get gapNumber() {
        return this._gapNumber;
    }

    get marks (){
        return this._marks;
    }


    gapReport() {
        let gapString = `gap number: ${this.gapNumber}\n`;
        gapString += `answer: ${this.answer} marks: ${this.marks}\n`; 
        return gapString;
    }
}
export { DragGap };