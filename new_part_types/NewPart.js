class NewPart {
    //although all parts have a prompt and 0 to many gaps 
    // for most parts we only need to know type, number, and we might as well get marks
    //for now leave prompt and gaps for teh parts where that matters
    constructor() {
        this._type = "";
        this._marks = 1;
    }

    set type(type) {
        this._type = type;
    }
    get type() {
        return this._type;
    }

    set marks(mark){
        this._marks = mark;
    }
    get marks (){
        return this._marks;
    }


    /*partReport() {
        let partString = `part number: ${this._pNumber}\n`;
        partString += `part type: ${this._type} marks: ${this._marks}\n`; 
        return partString;
    }*/
}
export { NewPart };