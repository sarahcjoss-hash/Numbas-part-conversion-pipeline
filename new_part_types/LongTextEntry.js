import { NewPart } from "./NewPart.js";

class LongTextEntry extends NewPart {
    constructor(errorLogger) {
        super(errorLogger);
        this._type = "scholar_self_marked_text";
        this._templateJson = "selfMarkedTextPart.json";
        this._customPartFileName = 'selfMarkedTextCP.json';
        this._settings = LongTextEntry.getDefaultSettings();
        this._prompt = '';
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
        settings.howTo = "This is a self marked question. You should write your answer as one or more sentences. When you are ready use the button to 'Check your answer'.";
        settings.markInstruction = "Tick each of the items that matches something in your answer. Or choose 'I did not get the correct answer(s)'. When you have finished click 'Save answer'";
        settings.correctFeedback = "Well done. ";
        settings.partialCorrect = "You were partially correct. ";
        settings.incorrectFeedback = "You did not get any marks this time. You might want to revise [topic]";
        return settings;

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
        this._modelAnswer = val;
        this.updateSetting('modelAnswer', val);
    }
    set howManyChecks(val) {
        this._howManyChecks = val;
        this.updateSetting('howManyChecks', val);
    }


    static createNewFromExisting(part, errorLog) {
        try {
            //there are issue converting the pixels sizes to text area sizes
            //don;t worry too much about this for this iteration just get it working but for future using 
            // field-sizing where available
            let newPart = new LongTextEntry(errorLog);
            newPart.marks = part.marks || 1;
            newPart.prompt = part.prompt;
            newPart.cols = LongTextEntry.convertPixelsToColumns(part.textAreaWidth || 50);
            newPart.rows = LongTextEntry.convertEmsToRows(part.textAreaHeight || 4);
            newPart.modelAnswer = part.answer ;
            newPart.howManyChecks = part.numberofGaps             
            return newPart;
        } catch (err) {
            err.message = `Error creating new Long text entry part from existing part ${part.type}: ${err.message}`;
            errorLog.reportError(err);//have to report directly to log as in this case it may have gone so wrong we cannot call reportError on super
        }
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