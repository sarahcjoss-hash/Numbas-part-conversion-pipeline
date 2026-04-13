class part {
    constructor() {
        this.prompt = "";
        this.type = "";
        this.pNumber = 0;
        this.gaps = [];
    }

    set partPrompt(prompt) {
        this.prompt = prompt;
    }
    get partPrompt() {
        return this.prompt;
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
    addGap(gap) {
        this.gaps.push(gap);
    }



    partReport() {
        let partString = `part number: ${this.pNumber}\n`;
        partString += `part type: ${this.type}\n`; 
        return partString;
    }
}