import { NewPart } from "./NewPart.js";

class LongTextEntry extends NewPart {
    constructor(errorLogger) {
        super(errorLogger);
        this._type = "scholar_self_marked_text";
        this._templateJsonFileName = "selfMarkedTextPart.json";
        this._customPartFileName = 'selfMarkedTextCP.json';
        this._settings = LongTextEntry.getDefaultSettings();
        this._prompt = 'default prompt';
        this._cols = 50;
        this._rows = 4;
        this._modelAnswer = this._settings.modelAnswer ||"<p>Model answer</p>";
        this._howManyChecks = this._settings.howManyChecks;
        this._markIncrement = this._settings.markIncrement;
        this._howTo = this._settings.howTo;
        this._markInstruction = this._settings.markInstruction;
        this._correctFeedback = this._settings.correctFeedback;
        this._partialCorrect = this._settings.partialCorrect;
        this._incorrectFeedback = this._settings.incorrectFeedback;



    }


    static getDefaultSettings() {
        let settings = {};
        settings.modelAnswer = "<p>This answer will get a point [check], so will this [check] and this [check]</p>";
        settings.howManyChecks = 1;
        settings.markIncrement = 1;
        settings.cols = 50;
        settings.rows = 4;
        settings.howTo = "This is a self-marked question. When you are ready, select 'Check your answer' .";
        settings.markInstruction = "Check the box for each item covered in your answer or select ‘My answer does not contain any of the items listed’. When you have finished marking your answer, select ‘Save answer’.";
        settings.correctFeedback = "Your answer is correct.";
        settings.partialCorrect = "Your answer is partially correct.";
        settings.incorrectFeedback = "Your answer is incorrect.";
        settings.noMarksInstruction = "My answer does not contain any of the items listed.";
        return settings;

    }
    set prompt(p){
        //remove any builder info from the prompt and just keep the text
        let newPrompt = p.replace(/{manualmarking_builder\(.+?\)}/, '').trim();
        newPrompt = newPrompt.replace(/{manualmarking_textarea_width\(.+?\)}/, '').trim();
        newPrompt = newPrompt.replace(/{manualmarking_render\(\)}/, '').trim();   
        //remove gaps 
        newPrompt = newPrompt.replace(/\[\[\d+\]\]/, '');
        //remove empty p tags
        newPrompt= newPrompt.replace(/<p><\/p>/gi, '');
        

        this._prompt = newPrompt;
    }
    get prompt() {
        return this._prompt;    
    }

    set cols(val) {
        this._cols = val;
        this.updateSetting('cols', val)
    }
    set rows(val) {
        this._rows = val;
        this.updateSetting('rows', val)
    }
    set modelAnswer(val) {
        //add at least one check 
        const checkStr = this._howManyChecks? '[check]'.repeat(this._howManyChecks): '[check]'
        this._modelAnswer = `${val} ${checkStr}` ;
        
        this.updateSetting('modelAnswer', this._modelAnswer);
    }
    set howManyChecks(val) {
        this._howManyChecks = parseInt(val)||1;
        this.updateSetting('howManyChecks', val);
    }



    static convertEmsToRows(ems) {
        //convert a value in ems to a number of rows for a text area. This is a bit of a guess but we can adjust as needed
        //first check the string value contains ems and if so convert to a number
        ems = ems.replaceAll("'","");//sometimes this comes with extra quotes
        if (typeof ems === 'string' && ems.endsWith('em')) {
            ems = parseFloat(ems.slice(0, -2));
            return Math.round(ems / 1.2);
        } else if (typeof ems === 'number') {
            return Math.round(ems / 1.2);
        } else {
            //if it is not a string ending in em or a number report an error and return a default value
            console.error(`Unable to convert ems value ${ems} to rows. Returning default value of 4`);
            return 4;
        }


    }
    static convertPixelsToColumns(px) {
        //convert a value in pixels to a number of columns for a text area. This is a bit of a guess but we can adjust as needed
        //first check the string value contains px and if so convert to a number
        px = px.replaceAll("'","");//sometimes this comes with extra quotes
        if (typeof px === 'string' && px.endsWith('px')) {
            px = parseFloat(px.slice(0, -2));
            return Math.round(px / 10);
        } else if (typeof px === 'number') {
            return Math.round(px / 10);
        } else {
            //if it is not a string ending in px or a number report an error and return a default value
            console.error(`Unable to convert pixels value ${px} to columns. Returning default value of 50`);
            return 50;
        }

    }

    partReport() {
        let partString = super.partReport();

        return partString;
    }
}
export { LongTextEntry };