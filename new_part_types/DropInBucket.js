
import { NewDragAndDrop } from "./NewDragAndDrop.js";
class DropInBucket extends NewDragAndDrop {
    constructor(errorLogger) {
        super(errorLogger);
        this._type = "scholar_drop_in_bucket";
        this._templateJsonFileName = "dropInBucket.json";
        this._templateSettings = {
            "drop_zone": "<table width=\"356\" height=\"225\">\n<tbody>\n<tr>\n<td style=\"width: 123.859px;\">Animal</td>\n<td style=\"width: 91.5625px;\">Vegetable</td>\n<td style=\"width: 91.5781px;\">Mineral</td>\n</tr>\n<tr>\n<td style=\"width: 123.859px;\">\n<p>@[</p>\n<p>%[Pangolin]%</p>\n<p>%[Muntjac]%</p>\n<p>%[Mangalica]%</p>\n<p>]@</p>\n</td>\n<td style=\"width: 91.5625px;\">\n<p>@[</p>\n<p>%[Mangelwurzel]%</p>\n<p>%[Rubber]%</p>\n<p>%[Ebony]%</p>\n<p>]@</p>\n</td>\n<td style=\"width: 91.5781px;\">\n<p>@[</p>\n<p>%[Manganese]%</p>\n<p>%[Jade]%</p>\n<p>]@</p>\n</td>\n</tr>\n</tbody>\n</table>",
            "how_many_matches": "9",
            "distractors": [],
            "item_width": "120",
            "item_height": "80",
            "all_or_nothing": false,
            "mark_on_match": false
        }
        this._settings = DropInBucket.getDefaultSettings();
        this._how_many_matches = 9;
        this._item_width = 120;
        this._item_height = 80;


    }

    static getDefaultSettings() {
        let settings = {};
        settings.drop_zone = "<table width=\"356\" height=\"225\">\n<tbody>\n<tr>\n<td style=\"width: 123.859px;\">Animal</td>\n<td style=\"width: 91.5625px;\">Vegetable</td>\n<td style=\"width: 91.5781px;\">Mineral</td>\n</tr>\n<tr>\n<td style=\"width: 123.859px;\">\n<p>@[</p>\n<p>%[Pangolin]%</p>\n<p>%[Muntjac]%</p>\n<p>%[Mangalica]%</p>\n<p>]@</p>\n</td>\n<td style=\"width: 91.5625px;\">\n<p>@[</p>\n<p>%[Mangelwurzel]%</p>\n<p>%[Rubber]%</p>\n<p>%[Ebony]%</p>\n<p>]@</p>\n</td>\n<td style=\"width: 91.5781px;\">\n<p>@[</p>\n<p>%[Manganese]%</p>\n<p>%[Jade]%</p>\n<p>]@</p>\n</td>\n</tr>\n</tbody>\n</table>",
        settings.how_many_matches = 9;
        settings.distractors = [];
        settings.item_width = 120;
        settings.item_height = 80;
        settings.all_or_nothing = false;
        settings.mark_on_match = false;
        return settings;

    }
    set how_many_matches(num){
        this._how_many_matches = num;
        this.updateSetting('how_many_matches',num)
    }

    set item_width(width){
        this._item_width = width;
        this.updateSetting('item_width',width);
    }
    set item_height(height){
        this._item_height = height;
        this.updateSetting('item_height',height);
    }
    set targetText(text) {
        this._targetText = text;
        this.updateSetting('drop_zone',text);
    }
    get type() {
        return this._type;
    }
    get filledSettings() {
        return this._settings;
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
export { DropInBucket };