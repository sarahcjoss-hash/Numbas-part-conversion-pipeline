import { NewPart } from "./NewPart.js";
class CardMatch extends NewPart {
    constructor(errorLogger) {
        super(errorLogger);
        this._type = "card_match";
        this._templateSettings =     {"list_of_pairs": '[["a","A"],["b","B"],["c","C"]]',
                                    "howManyPairs": "3",
                                "markOnMatch": true,
                                "card_width": "7",
                                "card_height": "4",
                                "lineBoxWidth": "5",
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
        settings.card_width = "7";
        settings.card_height = "4";
        settings.lineBoxWidth = "8";  
        settings.l_c_type = ["word"];
        settings.r_c_type = ["word"];
        settings.reorderOnReveal = false;
        return settings;


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

    partJson() {
        
    }
}
export { CardMatch };