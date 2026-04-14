class Part {
    //although all parts have a prompt and 0 to many gaps 
    // for most parts we only need to know type, number, and we might as well get marks
    //for now leave prompt and gaps for teh parts where that matters
    constructor() {
        this.type = "";
        this.pNumber = 0;
        this.marks = 0;
    }


    set partType(type) {
        this.type = type;
    }
    get partType() {
        return this.type;
    }
    set partNumber(n) {
        this.pNumber = n;
    }
    get partNumber() {
        return this.pNumber;
    }
    set marks(mark){
        this.marks = mark;
    }
    get marks (){
        return this.marks;
    }


    partReport() {
        let partString = `part number: ${this.pNumber}\n`;
        partString += `part type: ${this.type} marks: ${this.marks}\n`; 
        return partString;
    }
}
export { Part as default };