//This class only returns teh cutom part generic template JSON which teh exam file requires to signal a prt amd extension must be included with the exam.
//no settings are required for this jusdt a list of extensions to include

class JSONTemplateProvider {
    constructor() {
    }

    static getTemplate(partType) {
        try {
            let json;

            switch (partType) {
                case 'scholar_sentence_reorder':
                    json = JSONTemplateProvider.sentenceReorderTemplate;
                    break;
                case 'scholar_self_marked_text':
                    json = JSONTemplateProvider.selfMarkedTextTemplate;
                    break;
                case 'card-match':
                    json = JSONTemplateProvider.cardMatchTemplate;
                    break;
                case 'scholar_drop_in_bucket':
                    json = JSONTemplateProvider.dropInBucketTemplate;
                    break;
                case 'scholar_drag_1_2_1 ':
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
                                "all_or_nothing": false
                            }
                        }

    static cardMatchTemplate = {
                            "type": "card-match",
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
                                "list_of_pairs": "[[\"a\",\"A\"],[\"b\",\"B\"],[\"c\",\"C\"]]",
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

    static selfMarkedTextTemplate = {
                            "type": "self-marked-text",
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
    static drag121Template = {
                            "type": "drag-and-drop-text-1-to-1",
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
                                "target_text": "<p>&lt;p&gt;Write some &lt;strong&gt;text&lt;/strong&gt; with the %[targets]% marked up using %[your item here]%. &lt;/p&gt;\",</p>",
                                "how_many_gaps": "6",
                                "distractors": [],
                                "target_width": "100",
                                "target_height": "40",
                                "mark_on_match": false,
                                "all_or_nothing": false
                            }
                        }

                        static dropInBucketTemplate = {
                            "type": "scholar-drop-in-bucket",
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
                                "drop_zone": "<table width=\"356\" height=\"225\">\n<tbody>\n<tr>\n<td style=\"width: 123.859px;\">Animal</td>\n<td style=\"width: 91.5625px;\">Vegetable</td>\n<td style=\"width: 91.5781px;\">Mineral</td>\n</tr>\n<tr>\n<td style=\"width: 123.859px;\">\n<p>@[</p>\n<p>%[Pangolin]%</p>\n<p>%[Muntjac]%</p>\n<p>%[Mangalica]%</p>\n<p>]@</p>\n</td>\n<td style=\"width: 91.5625px;\">\n<p>@[</p>\n<p>%[Mangelwurzel]%</p>\n<p>%[Rubber]%</p>\n<p>%[Ebony]%</p>\n<p>]@</p>\n</td>\n<td style=\"width: 91.5781px;\">\n<p>@[</p>\n<p>%[Manganese]%</p>\n<p>%[Jade]%</p>\n<p>]@</p>\n</td>\n</tr>\n</tbody>\n</table>",
                                "how_many_matches": "9",
                                "distractors": [],
                                "item_width": "120",
                                "item_height": "80",
                                "all_or_nothing": false,
                                "mark_on_match": false
                            }
                        }

}
export { JSONTemplateProvider };