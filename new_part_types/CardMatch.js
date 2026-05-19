import { NewPart } from "./NewPart.js";
class CardMatch extends NewPart {
    constructor(errorLogger) {
        super(errorLogger);
        this._type = "card-match";
        this._templateJson = "cardMatchPart.json";
        this._customPartFileName = 'cardMatchCP.json';
        this._templateSettings =     {"list_of_pairs": '[["a","A"],["b","B"],["c","C"]]',
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
        this._settings = CardMatch.getDefaultSettings();


    }
    static getDefaultSettings() {
        let settings = {};
        settings.list_of_pairs = '[["a","A"],["b","B"],["c","C"]]';
        settings.howManyPairs = "3";
        settings.markOnMatch = true;    
        settings.card_width = "120";
        settings.card_height = "80";
        settings.lineBoxWidth = "240";  
        settings.l_c_type = ["word"];
        settings.r_c_type = ["word"];
        settings.reorderOnReveal = false;
        return settings;


    }


        static createNewFromExisting(part, errorLog) {
        try {
            let newPart = new CardMatch(errorLog);
            newPart.prompt = part.prompt;   
            newPart.marks = part.marks || 1;
            newPart.list_of_pairs = part.pairsVariableValue|| '[["a","A"],["b","B"],["c","C"]]';
            newPart.howManyPairs = part.numberOfPairs || 3;
            newPart.card_width = part.cardWidth || 120;
            newPart.card_height = part.cardHeight || 80;
            newPart.l_c_type = part.leftCardType? this.convertLeftCardType(part.leftCardType) : ["word"];
            newPart.reorderOnReveal = part.reorderOnReveal || false;
            return newPart;
        } catch (err) {
            err.message = `Error creating new Card Match part from existing part ${part.type}: ${err.message}`;
            errorLog.reportError(err);//have to report directly to log as in this case it may have gone so wrong we cannot call reportError on super
        }   
    }
    convertLeftCardType(type){
        switch(type){
            case "text":
                return ["word"];
                break;
            case "image":
                return ["image"];
                break;
            default:
                return ["word"];
        }
    }
    set list_of_pairs(pairs){
        this._list_of_pairs = pairs;
        this.updateSetting('list_of_pairs',pairs);
    }
    get list_of_pairs() {
        return this._list_of_pairs;
    }
    set howManyPairs(num){
        this._howManyPairs = num;
        this.updateSetting('howManyPairs',num);
    }
    set cardHeight(height){
        this._cardHeight = height;
        this.updateSetting('card_height',height);
    }
    set cardWidth(width){
        this._cardWidth = width;
        this.updateSetting('card_width',width);
    }
    set l_c_type(type){
        this._l_c_type = type;
        this.updateSetting('l_c_type',type);
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