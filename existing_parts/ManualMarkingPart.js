import { Part } from "./Part.js";
import { Builder } from "./Builder.js";

class ManualMarkingPart extends Part {
    constructor(data, num, errorReporter) {
        super(data, num, errorReporter);
        super._type = "manual_marking";
        function extractValueFromBS(val, prefix) {
            try {
                const length = prefix.length;
                if (val.indexOf(prefix) !== -1) {
                    return val.substring(length, val.length - 1);
                } else {
                    return val;
                }
            } catch (err) {
                errorReporter.reportError(err);
                return val;
            }

        }

        const prompt = data.prompt;
        const builderPrefix = "manualmarking_textarea_"
        const builder = /manualmarking_builder\(.+?\)/.exec(prompt);
        const width = /manualmarking_textarea_width\(.+?\)/.exec(prompt)?/manualmarking_textarea_width\(.+?\)/.exec(prompt)[0]:'auto';
        const height = /manualmarking_textarea_height\(.+?\)/.exec(prompt)?/manualmarking_textarea_height\(.+?\)/.exec(prompt)[0]:'auto';
        const gap = data.gaps[0];

        this._textAreaWidth = extractValueFromBS(width, builderPrefix+'width(')|| 'auto';
        this._textAreaHeight = extractValueFromBS(height,builderPrefix+'height(' ) || 'auto';
        //console.log(`this._textAreaWidth ${this._textAreaWidth} _textAreaHeight ${this._textAreaHeight}`)
        this._answer = gap.displayAnswer || "";
        this._builder = new Builder(builder, errorReporter);
        this._marks = gap.marks || 0;
        
    }

    get needsReplacing(){
        return true;
    }
  

    processPrompt(prompt) {
        //fill this is one we decide what processing if any manual marking prompt needs

    }
    reportError(err, additional){
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'ManualMarkingPart'}: ${additional} : ${err.message}`;
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