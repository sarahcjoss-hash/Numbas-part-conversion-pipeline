//This class only returns teh cutom part generic template JSON which teh exam file requires to signal a prt amd extension must be included with the exam.
//no settings are required for this jusdt a list of extensions to include

class CustomPartJsonProvider {
    constructor() {
    }

    static getCustomPartJson(partType) {
        try {
            let json;

            switch (partType) {
                case 'scholar_sentence_reorder':
                    json = CustomPartJsonProvider.sentenceReorderJson;
                    break;
                case 'scholar_self_marked_text':
                    json = CustomPartJsonProvider.selfMarkedTextJson;
                    break;
                case 'card-match':
                    json = CustomPartJsonProvider.cardMatchJson;
                    break;
                case 'scholar_drop_in_bucket':
                    json = CustomPartJsonProvider.dropInBucketJson;
                    break;
                case 'scholar_drag_1_2_1 ':
                    json = CustomPartJsonProvider.drag121Json;
                    break;
                default:
                    return null;
            }


            return json;
        } catch (err) {
            this.reportError(err, `Unable to get custom part JSON for part type ${partType}`);
            return null;
        }
    }
    reportError(err, additional) {
        err.message = `${this.constructor && this.constructor.name ? this.constructor.name : 'CustomPartJsonProvider'}: ${additional} : ${err.message}`
        console.error(err);
    }

    static sentenceReorderJson = {
        "source": {
            "pk": 295,
            "author": {
                "name": "Joss Joss",
                "pk": 258
            },
            "edit_page": "/part_type/295/edit"
        },
        "name": "scholar sentence reorder",
        "short_name": "scholar-sentence-reorder",
        "description": "<p>Thbis part will move drag items to the available space</p>",
        "help_url": "",
        "input_widget": "SentenceReorder",
        "input_options": {
            "correctAnswer": "settings['how_many_drags']",
            "hint": {
                "static": true,
                "value": "Select the words in order."
            },
            "target_height": {
                "static": false,
                "value": "settings['target_height']"
            },
            "target_text": {
                "static": false,
                "value": "settings['target_text']"
            },
            "how_many_drags": {
                "static": false,
                "value": "settings['how_many_drags']"
            },
            "distractors": {
                "static": false,
                "value": "settings['distractors']"
            },
            "all_or_nothing": {
                "static": false,
                "value": "settings['all_or_nothing']"
            }
        },
        "can_be_gap": true,
        "can_be_step": true,
        "marking_script": "mark:\nif(interpreted_answer = 0, incorrect(\"You have not found any matches. Try again?\"),\nif(interpreted_answer < input_options[\"how_many_drags\"],if (input_options['all_or_nothing'],incorrect(\"You must find all matches to get the marks\") , apply(partialFeedback)),correct(\"Well done you matched them all.\"));end())\n\ninterpreted_answer:\nstudentAnswer\n\npartialFeedback:\nset_credit((interpreted_answer/input_options['how_many_drags']) , \"You found some but not all of the pairs\"); end()\n\nmarkPerGap:\n1/input_options[\"how_many_drags\"]",
        "marking_notes": [
            {
                "name": "mark",
                "description": "This is the main marking note. It should award credit and provide feedback based on the student's answer.",
                "definition": "if(interpreted_answer = 0, incorrect(\"You have not found any matches. Try again?\"),\nif(interpreted_answer < input_options[\"how_many_drags\"],if (input_options['all_or_nothing'],incorrect(\"You must find all matches to get the marks\") , apply(partialFeedback)),correct(\"Well done you matched them all.\"));end())"
            },
            {
                "name": "interpreted_answer",
                "description": "A value representing the student's answer to this part.",
                "definition": "studentAnswer"
            },
            {
                "name": "partialFeedback",
                "description": "",
                "definition": "set_credit((interpreted_answer/input_options['how_many_drags']) , \"You found some but not all of the pairs\"); end()"
            },
            {
                "name": "markPerGap",
                "description": "",
                "definition": "1/input_options[\"how_many_drags\"]"
            }
        ],
        "settings": [
            {
                "name": "target_text",
                "label": "The sentence in the correct order",
                "help_url": "",
                "hint": "This should be a complete sentence in the correct order. You can repeat words but should try to form a sentence that has one clear logical order. you can not omit some words or punctuation from the markup and this will form islands",
                "input_type": "html",
                "default_value": "<p>A %[complete]% %[sentence or paragraph]% %[in]% %[grammatical}% order.&nbsp;</p>",
                "subvars": true
            },
            {
                "name": "how_many_drags",
                "label": "How many tokens is the sentnce made up of",
                "help_url": "",
                "hint": "This is either the number of words in your sentence or teh number of blocks it is broken up into. Unfortunaltey it is not possible to deduce this programmatically",
                "input_type": "code",
                "default_value": "6",
                "evaluate": true
            },
            {
                "name": "distractors",
                "label": "Additional distractors",
                "help_url": "",
                "hint": "These are additional distractors which can be added. These drags have no 'match'. It is harder to use html here unfortunately.",
                "input_type": "list_of_strings",
                "default_value": [],
                "subvars": false
            },
            {
                "name": "target_height",
                "label": "Height",
                "help_url": "",
                "hint": "do not leave blank",
                "input_type": "string",
                "default_value": "35",
                "subvars": false
            },
            {
                "name": "all_or_nothing",
                "label": "Award marks only for all correct",
                "help_url": "",
                "hint": "",
                "input_type": "checkbox",
                "default_value": false
            }
        ],
        "public_availability": "restricted",
        "published": false,
        "extensions": [
            "sentence-reorder"
        ]
    }

    static cardMatchJson = {
        "source": {
            "pk": 265,
            "author": {
                "name": "Joss Joss",
                "pk": 258
            },
            "edit_page": "/part_type/265/edit"
        },
        "name": "card match",
        "short_name": "card-match",
        "description": "<p>Click on two items, from a paired list, to match them.<br />You can match any combination of text, sound files and images e.g. images one the left to sounds on the right, images to images or most often text to text.<br />One to one match.</p>",
        "help_url": "",
        "input_widget": "cardmatch",
        "input_options": {
            "correctAnswer": "(settings['howManyPairs'] )",
            "hint": {
                "static": true,
                "value": "Select the matching pairs of cards"
            },
            "list_of_pairs": {
                "static": false,
                "value": "settings['list_of_pairs']"
            },
            "howManyPairs": {
                "static": false,
                "value": "settings['howManyPairs']"
            },
            "markOnMatch": {
                "static": false,
                "value": "settings['markOnMatch']"
            },
            "card_width": {
                "static": false,
                "value": "settings['card_width']"
            },
            "card_height": {
                "static": false,
                "value": "settings['card_height']"
            },
            "l_c_type": {
                "static": false,
                "value": "settings['l_c_type']"
            },
            "r_c_type": {
                "static": false,
                "value": "settings['r_c_type']"
            },
            "lineBoxWidth": {
                "static": false,
                "value": "settings['lineBoxWidth']"
            },
            "reorderOnReveal": {
                "static": false,
                "value": "settings['reorderOnReveal']"
            }
        },
        "can_be_gap": true,
        "can_be_step": true,
        "marking_script": "mark:\nif(interpreted_answer = 0, incorrect(\"You have not found any matches. Try again?\"),\nif(interpreted_answer < howManyPairs, apply(partialFeedback),correct(\"Well done you matched them all.\"));end())\n\n\n\n\n  \n\n\nhowManyPairs:\ninput_options[\"howManyPairs\"]\n\ninterpreted_answer:\nstudentAnswer\n\npartialFeedback:\nset_credit(partialMark, \"You found some but not all of the pairs\"); end()\n\npartialMark:\nprecround(interpreted_answer *(marks / howManyPairs),2)",
        "marking_notes": [
            {
                "name": "mark",
                "description": "This is the main marking note. It should award credit and provide feedback based on the student's answer.",
                "definition": "if(interpreted_answer = 0, incorrect(\"You have not found any matches. Try again?\"),\nif(interpreted_answer < howManyPairs, apply(partialFeedback),correct(\"Well done you matched them all.\"));end())\n\n\n\n\n  \n"
            },
            {
                "name": "howManyPairs",
                "description": "",
                "definition": "input_options[\"howManyPairs\"]"
            },
            {
                "name": "interpreted_answer",
                "description": "A value representing the student's answer to this part.",
                "definition": "studentAnswer"
            },
            {
                "name": "partialFeedback",
                "description": "",
                "definition": "set_credit(partialMark, \"You found some but not all of the pairs\"); end()"
            },
            {
                "name": "partialMark",
                "description": "",
                "definition": "precround(interpreted_answer *(marks / howManyPairs),2)"
            }
        ],
        "settings": [
            {
                "name": "list_of_pairs",
                "label": "List of key value pairs",
                "help_url": "",
                "hint": "<p>input values as key values pairs where key and value are separated by : and pairs are separated by , e.g. bing:bong, rick:rack</p>\n<p>if you are recreating the card match from an existing for now you will need to reformat from [[\"a\",\"A\"]...] to a:A - no quotation marks if yu need quotations marks then escape them.<br /><br />images can be incuded be reference string e.g. 'cow.jpg' or as a fully formed img tag with alt text &lt;img src=\"resources/question-resources/cow.jpg\" alt=\"a black and white cow\" /&gt;</p>\n<p>special characters-[]\" and ' might get stripped out if you include them.</p>",
                "input_type": "string",
                "default_value": "[[\"a\",\"A\"],[\"b\",\"B\"],[\"c\",\"C\"]]",
                "subvars": false
            },
            {
                "name": "howManyPairs",
                "label": "How many of the pairs to display",
                "help_url": "",
                "hint": "",
                "input_type": "code",
                "default_value": "3",
                "evaluate": true
            },
            {
                "name": "markOnMatch",
                "label": "Mark each match as it is found",
                "help_url": "",
                "hint": "<p>If set to true each match will be marked as it is found.</p>\n<p>If set to false the user can make one or more match and the press submit to see the feedback and marks</p>",
                "input_type": "checkbox",
                "default_value": true
            },
            {
                "name": "card_width",
                "label": "Width of the cards (in px)",
                "help_url": "",
                "hint": "",
                "input_type": "string",
                "default_value": "120",
                "subvars": false
            },
            {
                "name": "card_height",
                "label": "Height of the cards (in px)",
                "help_url": "",
                "hint": "",
                "input_type": "string",
                "default_value": "80",
                "subvars": false
            },
            {
                "name": "lineBoxWidth",
                "label": "Width between cards ",
                "help_url": "",
                "hint": "this determines have mauch space there is between the two columns of cards where teh lines are drawn- a greater width can be more readable",
                "input_type": "string",
                "default_value": "240",
                "subvars": false
            },
            {
                "name": "l_c_type",
                "label": "Left card type",
                "help_url": "",
                "hint": "For audio questions you muct include an image called 'soundwave.jpg' in questions resources",
                "input_type": "choose_several",
                "choices": [
                    {
                        "value": "word",
                        "label": "Text",
                        "default_value": true
                    },
                    {
                        "value": "image",
                        "label": "Image",
                        "default_value": false
                    },
                    {
                        "value": "audio",
                        "label": "Sound file",
                        "default_value": false
                    }
                ]
            },
            {
                "name": "r_c_type",
                "label": "right card type",
                "help_url": "",
                "hint": "<p><br />For audio questions you muct include an image called 'soundwave.jpg' in questions resources</p>\n<p>You can select text, image or audio- setting this value let's the question know it has to search for a resource of the relevant type. default is text</p>",
                "input_type": "choose_several",
                "choices": [
                    {
                        "value": "word",
                        "label": "Text",
                        "default_value": true
                    },
                    {
                        "value": "image",
                        "label": "Image",
                        "default_value": false
                    },
                    {
                        "value": "audio",
                        "label": "Sound file",
                        "default_value": false
                    }
                ]
            },
            {
                "name": "reorderOnReveal",
                "label": "Reorder on reveal",
                "help_url": "",
                "hint": "If set to true, then when the user chooses to reveal the pairs will be reordered to put them in line- making all lines horizontal rather than criss cross",
                "input_type": "checkbox",
                "default_value": false
            }
        ],
        "public_availability": "restricted",
        "published": false,
        "extensions": [
            "card-match"
        ]
    }

    static selfMarkedTextJson = {
        "source": {
            "pk": 269,
            "author": {
                "name": "Joss Joss",
                "pk": 258
            },
            "edit_page": "/part_type/269/edit"
        },
        "name": "self marked text",
        "short_name": "self-marked-text",
        "description": "<p>a long text entry question where the user checks off the parts they have got correct. Relies on the ed devs writing the correct answer in a very specific way</p>",
        "help_url": "",
        "input_widget": "selfmark",
        "input_options": {
            "correctAnswer": "settings['howManyChecks']",
            "hint": {
                "static": true,
                "value": "You should write your answer as a sentence, paragraph or short essay, depending onhte amount of inforamtion teh question requires. When you are done hit 'compare' to check your answer."
            },
            "modelAnswer": {
                "static": false,
                "value": "settings['modelAnswer']"
            },
            "markIncrement": {
                "static": false,
                "value": "settings['markIncrement']"
            },
            "cols": {
                "static": false,
                "value": "settings['cols']"
            },
            "rows": {
                "static": false,
                "value": "settings['rows']"
            },
            "howTo": {
                "static": false,
                "value": "settings['howTo']"
            },
            "markInstruction": {
                "static": false,
                "value": "settings['markInstruction']"
            },
            "correctFeedback": {
                "static": false,
                "value": "settings['correctFeedback']"
            },
            "partialCorrect": {
                "static": false,
                "value": "settings['partialCorrect']"
            },
            "incorrectFeedback": {
                "static": false,
                "value": "settings['incorrectFeedback']"
            }
        },
        "can_be_gap": true,
        "can_be_step": true,
        "marking_script": "mark:\nswitch(\n  interpreted_answer = input_options['howManyChecks'],\n            correct(input_options['correctFeedback']),\n  interpreted_answer >0,\n  set_credit(credit, input_options['partialCorrect']),\n  incorrect(\"You awarded yourself 0 marks for your answer\"+ input_options['incorrectFeedback'])            \n)\n\ninterpreted_answer:\ndecimal(studentAnswer)\n\ncredit:\nif (interpreted_answer> 0,interpreted_answer/marks, 0)",
        "marking_notes": [
            {
                "name": "mark",
                "description": "This is the main marking note. It should award credit and provide feedback based on the student's answer.",
                "definition": "switch(\n  interpreted_answer = input_options['howManyChecks'],\n            correct(input_options['correctFeedback']),\n  interpreted_answer >0,\n  set_credit(credit, input_options['partialCorrect']),\n  incorrect(\"You awarded yourself 0 marks for your answer\"+ input_options['incorrectFeedback'])            \n)"
            },
            {
                "name": "interpreted_answer",
                "description": "A value representing the student's answer to this part.",
                "definition": "decimal(studentAnswer)"
            },
            {
                "name": "credit",
                "description": "",
                "definition": "if (interpreted_answer> 0,interpreted_answer/marks, 0)"
            }
        ],
        "settings": [
            {
                "name": "modelAnswer",
                "label": "Model answer with points for student to check off",
                "help_url": "",
                "hint": "<p>The model answer should show the student what they should have put. Points that would get the student marks should have a [check] next to them. Each [check] will be replaced with a checkbox for the student to use for marking. You can have more checks than marks- e.g. if you ahve 3 checks, 2 marks and a marking increment of 1 then any 2 or more out of 3 will get full marks.</p>\n<p>Remember if the format is you could have this OR this and that OR that (2 marks) then checks need to go here: pigs OR hogs [check]; cows or cattle[check];&nbsp;</p>",
                "input_type": "html",
                "default_value": "<p>This answer will get a point [check], so will this [check] and this [check]</p>",
                "subvars": false
            },
            {
                "name": "howManyChecks",
                "label": "How many answers must the user get to be correct",
                "help_url": "",
                "hint": "E.g. if the correct answer is nay ONE of the following then they need to get 1, if there is a list of 5 and any 3 would do, then 3 and so on- think about how many checks you have inserted in the answer and how many of these the user must tick to be correct.",
                "input_type": "mathematical_expression",
                "default_value": "1",
                "subvars": false
            },
            {
                "name": "markIncrement",
                "label": "How much each tick is worth",
                "help_url": "",
                "hint": "E.g. if this is one and there are 5 checkboxes, then the user will get 1 mark for each point up to a maximum of 'marks' for the part",
                "input_type": "string",
                "default_value": "1",
                "subvars": false
            },
            {
                "name": "cols",
                "label": "Text entry width in cols",
                "help_url": "",
                "hint": "Text entry width in cols",
                "input_type": "string",
                "default_value": "50",
                "subvars": false
            },
            {
                "name": "rows",
                "label": "Text entry height in rows",
                "help_url": "",
                "hint": "Text entry height is set in rows",
                "input_type": "string",
                "default_value": "4",
                "subvars": false
            },
            {
                "name": "howTo",
                "label": "instruction for user",
                "help_url": "",
                "hint": "",
                "input_type": "string",
                "default_value": "This is a self marked question. You should write your answer as one or more sentences. When you are ready use the button to 'Check your answer'.",
                "subvars": false
            },
            {
                "name": "markInstruction",
                "label": "User instruction for marking",
                "help_url": "",
                "hint": "Tell the user how to work the markking part of the question.",
                "input_type": "string",
                "default_value": "Tick each of the items that matches something in your answer. Or choose 'I did not get the correct answer(s)'. When you have finished click 'Save answer'",
                "subvars": false
            },
            {
                "name": "correctFeedback",
                "label": "Feedback if the user is correct",
                "help_url": "",
                "hint": "",
                "input_type": "string",
                "default_value": "Well done. ",
                "subvars": false
            },
            {
                "name": "partialCorrect",
                "label": "Feedback message if the user is partially correct",
                "help_url": "",
                "hint": "",
                "input_type": "string",
                "default_value": "You were partially correct. ",
                "subvars": false
            },
            {
                "name": "incorrectFeedback",
                "label": "Feedback message for the wrong answer",
                "help_url": "",
                "hint": "this allows you to give user advice on what to look for if they got teh wrong answer",
                "input_type": "string",
                "default_value": "You did not get any marks this time. You might want to revise [topic]",
                "subvars": false
            }
        ],
        "public_availability": "restricted",
        "published": false,
        "extensions": [
            "self-marked-text"
        ]
    }
    static drag121Json = {
        "source": {
            "pk": 283,
            "author": {
                "name": "Joss Joss",
                "pk": 258
            },
            "edit_page": "/part_type/283/edit"
        },
        "name": "drag and drop  1 to 1",
        "short_name": "drag-and-drop-text-1-to-1",
        "description": "<p>A replacement for this question type- although it may focus more on clicking than dragging</p>",
        "help_url": "",
        "input_widget": "DAndD121",
        "input_options": {
            "correctAnswer": "settings['how_many_gaps']",
            "hint": {
                "static": false,
                "value": "\"Select a tile or a space, then select a match to move the tile to the space. You can use tab and space bar.\""
            },
            "target_width": {
                "static": false,
                "value": "settings['target_width']"
            },
            "target_height": {
                "static": false,
                "value": "settings['target_height']"
            },
            "target_text": {
                "static": false,
                "value": "settings['target_text']"
            },
            "how_many_gaps": {
                "static": false,
                "value": "settings['how_many_gaps']"
            },
            "distractors": {
                "static": false,
                "value": "settings['distractors']"
            },
            "mark_on_Match": {
                "static": false,
                "value": "settings['mark_on_match']"
            },
            "all_or_nothing": {
                "static": false,
                "value": "settings['all_or_nothing']"
            }
        },
        "can_be_gap": true,
        "can_be_step": true,
        "marking_script": "mark:\nif(interpreted_answer = 0, incorrect(\"You have not found any matches. Try again?\"),\nif(interpreted_answer < input_options[\"how_many_gaps\"],if (input_options['all_or_nothing'],incorrect(\"You must find all matches to get the marks\") , apply(partialFeedback)),correct(\"Well done you matched them all.\"));end())\n\ninterpreted_answer:\nstudentAnswer\n\nmarkPerGap:\n1/input_options[\"how_many_gaps\"]\n\npartialFeedback:\nset_credit((interpreted_answer/input_options['how_many_gaps']) , \"You found some but not all of the pairs\"); end()",
        "marking_notes": [
            {
                "name": "mark",
                "description": "This is the main marking note. It should award credit and provide feedback based on the student's answer.",
                "definition": "if(interpreted_answer = 0, incorrect(\"You have not found any matches. Try again?\"),\nif(interpreted_answer < input_options[\"how_many_gaps\"],if (input_options['all_or_nothing'],incorrect(\"You must find all matches to get the marks\") , apply(partialFeedback)),correct(\"Well done you matched them all.\"));end())"
            },
            {
                "name": "interpreted_answer",
                "description": "A value representing the student's answer to this part.",
                "definition": "studentAnswer"
            },
            {
                "name": "markPerGap",
                "description": "",
                "definition": "1/input_options[\"how_many_gaps\"]"
            },
            {
                "name": "partialFeedback",
                "description": "",
                "definition": "set_credit((interpreted_answer/input_options['how_many_gaps']) , \"You found some but not all of the pairs\"); end()"
            }
        ],
        "settings": [
            {
                "name": "target_text",
                "label": "Paragraph(s)/image with fill in words",
                "help_url": "",
                "hint": "<p>Create gaps/drop zones using %[drop text]%. Any text within the %[ ]% will be turned into a drop item.</p>\n<p>For capitalisation on drop put a !^! within the drop text e.g. %[!^!capitlaise anything dropped here%]</p>\n<p>Use css styles and/or tables for layout e.g. for tables in the target_text. E.g. to change text alignment within a td use style=\\\"text-align:left !important\\\"</p>\n<p>Insert images using the insert image tool- that will bring the alt text with it</p>\n<p>Latex- to prevent the latex being selectable, wrap it in a span class=\\\"latex\\\" tag e.g. %[&lt;span class=\\\"latex\\\"&gt;$(x + 4) ^ 6$&lt;/span&gt;]%</p>",
                "input_type": "html",
                "default_value": "<p>&lt;p&gt;Write some &lt;strong&gt;text&lt;/strong&gt; with the %[targets]% marked up using %[your item here]%. &lt;/p&gt;\",</p>",
                "subvars": true
            },
            {
                "name": "how_many_gaps",
                "label": "How many gaps are there in the question",
                "help_url": "",
                "hint": "Unfortunately, this cannot be determined programmtically, so you must count the gaps",
                "input_type": "code",
                "default_value": "6",
                "evaluate": true
            },
            {
                "name": "distractors",
                "label": "Additional distractors",
                "help_url": "",
                "hint": "These are additional distractors which can be added. These drags have no 'match'. It is harder to use html here unfortunately.",
                "input_type": "list_of_strings",
                "default_value": [],
                "subvars": false
            },
            {
                "name": "target_width",
                "label": "Width of the items to be placed",
                "help_url": "",
                "hint": "This sets the width of both the target and of the 'draggable' items",
                "input_type": "string",
                "default_value": "100",
                "subvars": false
            },
            {
                "name": "target_height",
                "label": "Height of items to be placed",
                "help_url": "",
                "hint": "This sets the height of both the target and of the 'draggable' items",
                "input_type": "string",
                "default_value": "40",
                "subvars": false
            },
            {
                "name": "mark_on_match",
                "label": "Mark each answer when it is dropped",
                "help_url": "",
                "hint": "Default value false but if this is true the tick cross will be displayed as the items are dropped",
                "input_type": "checkbox",
                "default_value": false
            },
            {
                "name": "all_or_nothing",
                "label": "Award credit only if all correct",
                "help_url": "",
                "hint": "",
                "input_type": "checkbox",
                "default_value": false
            }
        ],
        "public_availability": "restricted",
        "published": false,
        "extensions": [
            "drag-and-drop-text-1-to-1"
        ]
    }
    static dropInBucketJson = {
        "source": {
            "pk": 290,
            "author": {
                "name": "Joss Joss",
                "pk": 258
            },
            "edit_page": "/part_type/290/edit"
        },
        "name": "Scholar drop in bucket",
        "short_name": "scholar-drop-in-bucket",
        "description": "<p>Select and drop a selection of items into one of several buckets- many to many match to replace drag and drops.<br />This allows you to set up a questions with n number of categories each of which can receive up to x number of answers in any order as long as they are under the correct category.</p>\n<p>You can format the layout of the buckets by use of HTML.<br />To create extra spaces in a bucket (or to keep all buckets of an even size) you can use empty items.<br /><br />You can create distractors to have extra drop items.<br />Items can be dropped in any of teh lcaotions in their bucket.</p>",
        "help_url": "",
        "input_widget": "scholar-drop-in-bucket",
        "input_options": {
            "correctAnswer": "settings['how_many_matches']",
            "hint": {
                "static": true,
                "value": "Select an item and then select where you would like to place it."
            },
            "how_many_matches": {
                "static": true,
                "value": "9"
            },
            "item_width": {
                "static": false,
                "value": "settings['item_width']"
            },
            "item_height": {
                "static": false,
                "value": "settings['item_height']"
            },
            "drop_zone": {
                "static": false,
                "value": "settings['drop_zone']"
            },
            "distractors": {
                "static": false,
                "value": "settings['distractors']"
            },
            "mark_on_match": {
                "static": true,
                "value": "false"
            },
            "all_or_nothing": {
                "static": true,
                "value": "false"
            }
        },
        "can_be_gap": true,
        "can_be_step": true,
        "marking_script": "mark:\nif(interpreted_answer = 0, incorrect(\"Incorrect. Try again?\"),\nif(interpreted_answer < input_options['how_many_matches'],if (input_options['all_or_nothing'],incorrect(\"You must find all matches to get the marks\") , apply(partial_feedback)),correct(\"Correct.\"));end())\n\ninterpreted_answer:\nstudentAnswer\n\nmark_per_gap:\nmarks/input_options[\"how_many_matches\"]\n\npartial_feedback:\nset_credit((interpreted_answer/input_options['how_many_matches']) , \"Partially correct.\"); end()",
        "marking_notes": [
            {
                "name": "mark",
                "description": "This is the main marking note. It should award credit and provide feedback based on the student's answer.",
                "definition": "if(interpreted_answer = 0, incorrect(\"Incorrect. Try again?\"),\nif(interpreted_answer < input_options['how_many_matches'],if (input_options['all_or_nothing'],incorrect(\"You must find all matches to get the marks\") , apply(partial_feedback)),correct(\"Correct.\"));end())"
            },
            {
                "name": "interpreted_answer",
                "description": "A value representing the student's answer to this part.",
                "definition": "studentAnswer"
            },
            {
                "name": "mark_per_gap",
                "description": "",
                "definition": "marks/input_options[\"how_many_matches\"]"
            },
            {
                "name": "partial_feedback",
                "description": "",
                "definition": "set_credit((interpreted_answer/input_options['how_many_matches']) , \"Partially correct.\"); end()"
            }
        ],
        "settings": [
            {
                "name": "drop_zone",
                "label": "Drop zone with items",
                "help_url": "",
                "hint": "<p>Design the categories.</p>\n<p>'Buckets' are defined Using @[ bucket ]@</p>\n<p>'Items' are contained within the brackets of the bucket, and defined using%[ item]%</p>\n<p>Use blank items to control the number of slots in each bucket.</p>\n<p>You can use html markup to add images, align and style text etc.<br />Capitalisation does not work in this type - for capitlisation/drag to sentence use the 1-2-1 drop on targe question,</p>\n<p></p>",
                "input_type": "html",
                "default_value": "<table width=\"356\" height=\"225\">\n<tbody>\n<tr>\n<td style=\"width: 123.859px;\">Animal</td>\n<td style=\"width: 91.5625px;\">Vegetable</td>\n<td style=\"width: 91.5781px;\">Mineral</td>\n</tr>\n<tr>\n<td style=\"width: 123.859px;\">\n<p>@[</p>\n<p>%[Pangolin]%</p>\n<p>%[Muntjac]%</p>\n<p>%[Mangalica]%</p>\n<p>]@</p>\n</td>\n<td style=\"width: 91.5625px;\">\n<p>@[</p>\n<p>%[Mangelwurzel]%</p>\n<p>%[Rubber]%</p>\n<p>%[Ebony]%</p>\n<p>]@</p>\n</td>\n<td style=\"width: 91.5781px;\">\n<p>@[</p>\n<p>%[Manganese]%</p>\n<p>%[Jade]%</p>\n<p>]@</p>\n</td>\n</tr>\n</tbody>\n</table>",
                "subvars": true
            },
            {
                "name": "how_many_matches",
                "label": "How many matches are there in the question",
                "help_url": "",
                "hint": "How many matches are there in the question",
                "input_type": "code",
                "default_value": "9",
                "evaluate": true
            },
            {
                "name": "distractors",
                "label": "Optional distractors",
                "help_url": "",
                "hint": "",
                "input_type": "list_of_strings",
                "default_value": [],
                "subvars": false
            },
            {
                "name": "item_width",
                "label": "Width of items",
                "help_url": "",
                "hint": "This can either be a size in pixels or put 'auto' if you want the item to size to it's contents",
                "input_type": "string",
                "default_value": "120",
                "subvars": false
            },
            {
                "name": "item_height",
                "label": "Height of items",
                "help_url": "",
                "hint": "This can either be a size in pixels or put 'auto' if you want teh item to size to it's contents",
                "input_type": "string",
                "default_value": "80",
                "subvars": false
            },
            {
                "name": "all_or_nothing",
                "label": "marks awarded only for getting all answers",
                "help_url": "",
                "hint": "",
                "input_type": "checkbox",
                "default_value": false
            },
            {
                "name": "mark_on_match",
                "label": "Mark each item as it is dropped",
                "help_url": "",
                "hint": "",
                "input_type": "checkbox",
                "default_value": false
            }
        ],
        "public_availability": "restricted",
        "published": false,
        "extensions": [
            "scholar-drop-in-bucket"
        ]
    }


}
export { CustomPartJsonProvider };