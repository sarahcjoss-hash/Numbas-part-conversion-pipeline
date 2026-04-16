class Part {
    //although all parts have a prompt and 0 to many gaps 
    // for most parts we only need to know type, number, and we might as well get marks
    //for now leave prompt and gaps for teh parts where that matters
    constructor(num) {
        this._type = "";
        this._pNumber = num;
        this._marks = 0;
        this._gaps = [];
    }


    set type(type) {
        this._type = type;
    }
    get type() {
        return this._type;
    }
    set number(n) {
        this._pNumber = n;
    }
    get number() {
        return this._pNumber;
    }
    set marks(mark){
        this._marks = mark;
    }
    get marks (){
        return this._marks;
    }
    addGap(gap) {
        this._gaps.push(gap);
    }
    get numberOfGaps() {
        return this._gaps.length;
    };

    partReport() {
        let partString = `part number: ${this._pNumber}\n`;
        partString += `part type: ${this._type} marks: ${this._marks}\n`; 
        return partString;
    }
}
export { Part };