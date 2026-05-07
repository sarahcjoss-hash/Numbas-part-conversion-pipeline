import { NewPart } from "./NewPart.js";
class LongTextEntry extends NewPart {
    constructor() {
        super();
        super._type = "scholar_self_marked_text";
        super._templateJson = "selfMarkedTextPart.json"
        super._templateSettings =     {
                                "modelAnswer": "<p>This answer will get a point [check], so will this [check] and this [check]</p>",
                                "howManyChecks": "1",
                                "markIncrement": "1",
                                "cols": "50",
                                "rows": "4",
                                "howTo": "This is a self marked question. You should write your answer as one or more sentences. When you are ready use the button to 'Check your answer'.",
                                "markInstruction": "Tick each of the items that matches something in your answer. Or choose 'I did not get the correct answer(s)'. When you have finished click 'Save answer'",
                                "correctFeedback": "Well done. ",
                                "partialCorrect": "You were partially correct. ",
                                "incorrectFeedback": "You did not get any marks this time. You might want to revise [topic]"
                            }


    }


    get filledSettings() {
        let settings = {};
        settings.target_text = this._targetText;
        settings.how_many_drags = this._howManyDrags;
        settings.distractors = this._distractors;
        settings.target_height = this._targetHeight;
        settings.all_or_nothing = this._allOrNothing;
        return settings;
    }

    /*partReport() {
        let partString = super.partReport();
        partString += `drag height: ${this._dragHeight} `;
        partString += `drag width: ${this._dragWidth}\n`;
        partString += `drag variables: name ${this._dragsVariableName}, value ${this._dragsVariableValue}\n`;
        partString += `builder : ${this._builder.report()}\n`;
        return partString;
    }*/
}
export { LongTextEntry };