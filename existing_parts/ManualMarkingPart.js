import { Part } from "./Part.js";
import { Builder } from "./Builder.js";

class ManualMarkingPart extends Part {
    constructor(data, num) {
        super(data, num);
        super._type = "manual_marking";
        const prompt = data.prompt;
        const builder = /manualmarking_builder\(.+?\)/.exec(prompt);
        const width = /manualmarking_textarea_width\(.+?\)/.exec(prompt);
        const height = /manualmarking_textarea_height\(.+?\)/.exec(prompt);
        const gap = data.gaps[0];
        this._textAreaWidth = width || 'auto';
        this._textAreaHeight = height || 'auto';
        this._answer = gap.displayAnswer || "";
        this._builder = new Builder();
        this._builder.builderString = builder;

    }

    processPrompt(prompt) {
        //fill this is one we decide what processing if any manual marking prompt needs

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
        partString += `prompt: ${super._prompt}\n`;
        partString += `text area width: ${this._textAreaWidth} text area height: ${this._textAreaHeight}\n`;
        partString += `answer: ${this._answer}\n`;

        partString += `Marks:${p.answer.marks} Answer ${p.answer.displayAnswer}\n`
        partString += this._builder.report();
        return partString;
    }
}
export { ManualMarkingPart };