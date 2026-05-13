import { NewPart } from "./NewPart.js";
class CardMatch extends NewPart {
    constructor(errorLogger) {
        super(errorLogger);
        super._type = "card-match";
        super._templateJson = "cardMatchPart.json";
        super._customPartFileName = 'cardMatchCP.json';
        super._templateSettings =     {list_of_pairs: '[["a","A"],["b","B"],["c","C"]]',
                                    "howManyPairs": "3",
                                "markOnMatch": true,
                                "card_width": "120",
                                "card_height": "80",
                                "lineBoxWidth": "240",
                                "l_c_type": [
                                    "word"
                                ],
                                "r_c_type": [
                                    "word"
                                ],
                                "reorderOnReveal": false
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
export { CardMatch };