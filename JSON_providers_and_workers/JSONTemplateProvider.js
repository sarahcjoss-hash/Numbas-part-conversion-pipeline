//This class only returns teh cutom part generic template JSON which teh exam file requires to signal a prt amd extension must be included with the exam.
//no settings are required for this jusdt a list of extensions to include

class JSONTemplateProvider {
    constructor() {
    }

    static getTemplate(partType) {
        try {
            let json;

            switch (partType) {
                case 'sentence-reorder':
                    json = JSONTemplateProvider.sentenceReorderTemplate;
                    break;
                case 'self_marked_text':
                    json = JSONTemplateProvider.selfMarkedTextTemplate;
                    break;
                case 'card_match':
                    json = JSONTemplateProvider.cardMatchTemplate;
                    break;
                case 'drop_in_bucket':
                    json = JSONTemplateProvider.dropInBucketTemplate;
                    break;
                case 'drag_1_2_1':
                case '1-2-1':
                    json = JSONTemplateProvider.drag121Template;
                    break;
                default:
                    return null;
            }


            return json;
        } catch (err) {
            this.reportError(err, `Unable to get template JSON for part type ${partType}`);
            return null;
        }
    }
    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'JSONTemplateProvider'}: ${additional} : ${err.message}`
        console.error(err);
    }

    static sentenceReorderTemplate = {
                            "type": "scholar-sentence-reorder-click-in-order",
                            "useCustomName": false,
                            "customName": "",
                            "marks": "4",
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
                            "adaptiveMarkingUseCondition": "",
                            "adaptiveMarkingNotUsedMessage": "",
                            "exploreObjective": null,
                            "settings": {
                                "target_text": "<p>A %[!^!complete]% %[!^!sentence or paragraph]% %[in]% %[grammatical]% order.</p>",
                                "how_many_drags": "4",
                                "distractors": [],
                                "target_height": "2",
                                "target_width": "",
                                "all_or_nothing": false,
                                "drags_position": true,
                                "scholarInstruction": "Select the items in the order you would like to position them or to place an item in a specific position, select the space before selecting the item."
                            }
                        }

    static cardMatchTemplate =   {
                            "type": "scholar-card-match-test",
                            "useCustomName": false,
                            "customName": "",
                            "marks": "1",
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
                            "adaptiveMarkingUseCondition": "",
                            "adaptiveMarkingNotUsedMessage": "",
                            "exploreObjective": null,
                            "settings": {
                                "list_of_pairs": "[[\"a\",\"A\"],[\"b\",\"B\"],[\"c\",\"C\"],[\"d\",\"D\"],[\"f\",\"F\"],[\"g\",\"G\"],[\"h\",\"H\"],[\"i\",\"I\"],[\"j\",\"J\"]]",
                                "howManyPairs": "3",
                                "markOnMatch": false,
                                "card_width": "7",
                                "card_height": "5",
                                "l_c_type": [
                                    "word"
                                ],
                                "r_c_type": [
                                    "word"
                                ],
                                "reorderOnReveal": false,
                                "lineBoxWidth": "8",
                                "scholarInstruction": "Select an item and the location you would like to position it."
                            }
                        }




    static selfMarkedTextTemplate = {
        "type": "self-marked-text-test",
        "useCustomName": false,
        "customName": "",
        "marks": "6",
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
            "modelAnswer": "<p>This answer will get a point [check], so will this [check] and this [check]</p>",
            "howManyChecks": "6",
            "markIncrement": "1",
            "cols": "50",
            "rows": "4",
            "howTo": "This is a self marked question. When you are ready, select 'Check your answer'.",
            "markInstruction": "Check the box for each item covered in your answer or select 'My answer does not contain any of the items listed'. When you have finished marking your answer, select 'Save answer'.",
            "correctFeedback": "Your answer is correct.",
            "partialCorrect": "You answer is partially correct.",
            "incorrectFeedback": "Your answer is incorrect.",
            "noMarksInstruction":"My answer does not contain any of the items listed."
                        
        }
    }
    static drag121Template = {
                            "type": "drag-and-drop-text-1-to-1-1",
                            "useCustomName": false,
                            "customName": "",
                            "marks": "3",
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
                            "adaptiveMarkingUseCondition": "",
                            "adaptiveMarkingNotUsedMessage": "",
                            "exploreObjective": null,
                            "settings": {
                                "target_text": "<p>Write some <strong>text</strong> with the %[!^!targets]% marked up using %[percent]% and %[square bracket]%. Anything marked up like %[this]% will be replaced with a %[target]% and a clickable item that matches the drop will be created.</p>\n<p>You can use %[HTML]% markup in your paragraph(s) and to include images.</p>",
                                "how_many_gaps": "6",
                                "distractors": [],
                                "target_width": "10",
                                "target_height": "2",
                                "mark_on_match": false,
                                "all_or_nothing": false,
                                "drags_position": true,
                                "scholarInstruction": "Select an item and the location you would like to position it."
                            }
                        }

    static dropInBucketTemplate = {
                            "type": "scholar-drop-in-bucket-1",
                            "useCustomName": false,
                            "customName": "",
                            "marks": "2",
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
                            "adaptiveMarkingUseCondition": "",
                            "adaptiveMarkingNotUsedMessage": "",
                            "exploreObjective": null,
                            "settings": {
                                "drop_zone": "<table width=\"356\" height=\"225\">\n<tbody>\n<tr>\n<td style=\"width: 123.859px;\">Animal</td>\n<td style=\"width: 91.5625px;\">Vegetable</td>\n<td style=\"width: 91.5781px;\">Mineral</td>\n</tr>\n<tr>\n<td style=\"width: 123.859px;\">\n<p>@[</p>\n<p>%[Pangolin]%</p>\n<p>%[Muntjac]%</p>\n<p>%[Mangalica]%</p>\n<p>]@</p>\n</td>\n<td style=\"width: 91.5625px;\">\n<p>@[</p>\n<p>%[Mangelwurzel]%</p>\n<p>%[Rubber]%</p>\n<p>%[Ebony]%</p>\n<p>]@</p>\n</td>\n<td style=\"width: 91.5781px;\">\n<p>@[</p>\n<p>%[Manganese]%</p>\n<p>%[Jade]%</p>\n<p>%[]%</p>\n<p>]@</p>\n</td>\n</tr>\n</tbody>\n</table>",
                                "howManyMatches": "8",
                                "distractors": [],
                                "item_width": "12",
                                "item_height": "3",
                                "all_or_nothing": false,
                                "mark_on_match": false,
                                "drags_position": true,
                                "scholarInstruction": "Select an item and a location to position each one."
                            }
                        }

}
export { JSONTemplateProvider };