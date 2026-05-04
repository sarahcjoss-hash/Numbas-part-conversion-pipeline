import { Part } from "./Part.js";
import { Builder } from "./Builder.js";

class ManualMarkingPart extends Part {
    constructor(data, num, errorReporter) {
        super(data, num);
        super._type = "manual_marking";
        super._errorLog = errorReporter;
        const prompt = data.prompt;
        const builder = /manualmarking_builder\(.+?\)/.exec(prompt);
        const width = /manualmarking_textarea_width\(.+?\)/.exec(prompt);
        const height = /manualmarking_textarea_height\(.+?\)/.exec(prompt);
        const gap = data.gaps[0];
        this._textAreaWidth = width || 'auto';
        this._textAreaHeight = height || 'auto';
        this._answer = gap.displayAnswer || "";
        this._builder = new Builder(builder);
        this._marks = gap.marks || 0;
        
    }

    processPrompt(prompt) {
        //fill this is one we decide what processing if any manual marking prompt needs

    }
    reportError(err, additional){
        err.message = `${additional} : ${err.message}`;
        super.reportError(err);
    }
    get prompt() {
        return this._prompt;
    }

    get textAreaWidth() {
        return this._textAreaWidth;
    }

    get textAreaHeight() {
        return this._textAreaHeight;
    }

    get answer() {
        return this._answer;
    }
    get builder() {
        return this._builder;
    }


    partReport() {
        let partString = super.partReport();
        partString += `prompt: ${super.prompt}\n`;
        partString += `text area width: ${this._textAreaWidth} text area height: ${this._textAreaHeight}\n`;
        partString += `answer: ${this.answer}\n`;
        partString += `Marks:${this.marks} Answer ${this.answer}\n`;
        partString += this._builder.report();
        return partString;
    }
}
export { ManualMarkingPart };