

import { NewDragAndDrop } from "./NewDragAndDrop.js";
class SentenceReorder extends NewDragAndDrop {
    constructor(errorLogger) {
        super(errorLogger);
        super.type = "scholar_sentence_reorder";
        this._templateJsonFileName = "sentenceReorder.json";
        this._templateSettings = {
            "target_text": "<p>A %[complete]% %[sentence or paragraph]% %[in]% %[grammatical}% order.&nbsp;</p>",
            "how_many_drags": "6",
            "distractors": [],
            "target_height": "35",
            "target_width": "auto",
            "all_or_nothing": false
        }
        this._settings = SentenceReorder.getDefaultSettings();

    }

    static getDefaultSettings() {
        let settings = {};
        settings.target_text = "<p>A %[complete]% %[sentence or paragraph]% %[in]% %[grammatical}% order.&nbsp;</p>";
        settings.how_many_drags = "6";
        settings.distractors = [];
        settings.target_height = "35";
        settings.all_or_nothing = false;
        return settings;
    }
    static customPartSettings = {
        "type": "scholar-sentence-reorder",
        "useCustomName": false,
        "customName": "",
        "marks": 1,
        "scripts": {},
        "customMarkingAlgorithm": "",
        "extendBaseMarkingAlgorithm": true,
        "unitTests": [],
        "showCorrectAnswer": true,
        "showFeedbackIcon": true,
        "variableReplacements": [],
        "variableReplacementStrategy": "originalfirst",
        "nextParts": [],
        "suggestGoingBack": false,
        "adaptiveMarkingPenalty": 0,
        "exploreObjective": null,
        "settings": {
            "target_text": "<p>A %[complete]% %[sentence or paragraph]% %[in]% %[grammatical}% order.&nbsp;</p>",
            "how_many_drags": "6",
            "distractors": [],
            "target_height": "35",
            "target_width": "auto",
            "all_or_nothing": false
        }
    }
    set prompt(p){
        //remove any builder info from the prompt and just keep the text
        let newPrompt = p.replace(/{dnd_builder\(.+?\)}/, '').trim();
        newPrompt = newPrompt.replace(/{manualmarking_textarea_width\(.+?\)}/, '').trim();
        newPrompt = newPrompt.replace(/{dnd_render\(\)}/, '').trim();   
        //remove gaps 
        newPrompt = newPrompt.replace(/\[\[\d+\]\]/g, '');
        //remove empty p tags
        newPrompt= newPrompt.replace(/<p><\/p>/gi, '');       

        this._prompt = newPrompt;
    }
    get prompt() {
        return this._prompt;    
    }
    set targetText(text) {
        this._targetText = text;
        this.updateSetting('target_text', text);
    }
    set targetHeight(height) {
        this._targetHeight = height;
        this.updateSetting('target_height', height);
    }
    set howManyDrags(num) {
        this._howManyDrags = num;
        this.updateSetting('how_many_drags', num);
    }

    get type() {
        return this._type;
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

    get jsonObjForThisPart() {
        let json = SentenceReorder.jsonForThisPart;
        json.settings = this.filledSettings;
        return json;
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
export { SentenceReorder };