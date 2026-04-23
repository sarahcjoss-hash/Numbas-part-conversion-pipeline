
import { NewDragAndDrop } from "./NewDragAndDrop.js";
class DropInBucket extends NewDragAndDrop {
    constructor() {
        super();
        super._type = "scholar_drop_in_bucket";
        super._templateJson = "dropInBucket.json"
        super._templateSettings = {
            "drop_zone": "<table width=\"356\" height=\"225\">\n<tbody>\n<tr>\n<td style=\"width: 123.859px;\">Animal</td>\n<td style=\"width: 91.5625px;\">Vegetable</td>\n<td style=\"width: 91.5781px;\">Mineral</td>\n</tr>\n<tr>\n<td style=\"width: 123.859px;\">\n<p>@[</p>\n<p>%[Pangolin]%</p>\n<p>%[Muntjac]%</p>\n<p>%[Mangalica]%</p>\n<p>]@</p>\n</td>\n<td style=\"width: 91.5625px;\">\n<p>@[</p>\n<p>%[Mangelwurzel]%</p>\n<p>%[Rubber]%</p>\n<p>%[Ebony]%</p>\n<p>]@</p>\n</td>\n<td style=\"width: 91.5781px;\">\n<p>@[</p>\n<p>%[Manganese]%</p>\n<p>%[Jade]%</p>\n<p>]@</p>\n</td>\n</tr>\n</tbody>\n</table>",
            "how_many_matches": "9",
            "distractors": [],
            "item_width": "120",
            "item_height": "80",
            "all_or_nothing": false,
            "mark_on_match": false
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
export { DropInBucket };