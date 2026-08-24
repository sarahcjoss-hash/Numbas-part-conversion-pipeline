//This class only returns teh cutom part generic template JSON which teh exam file requires to signal a prt amd extension must be included with the exam.
//no settings are required for this jusdt a list of extensions to include

class CustomPartJsonProvider {
    constructor() {
    }

    static getCustomPartJson(partType) {
        try {
            let json;

            switch (partType) {
                case 'sentence-reorder':
                    json = CustomPartJsonProvider.sentenceReorderJson;
                    break;
                case 'self_marked_text':
                case 'manual_marking':
                    json = CustomPartJsonProvider.selfMarkedTextJson;
                    break;
                case 'card_match':
                    json = CustomPartJsonProvider.cardMatchJson;
                    break;
                case 'drop_in_bucket':
                    json = CustomPartJsonProvider.dropInBucketJson;
                    break;
                case 'drag_1_2_1 ':
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
        "author": {
            "name": "Scholar Team"
        }
    },
    "name": "scholar sentence reorder (click-in-order)",
    "short_name": "scholar-sentence-reorder-click-in-order",
    "description": "<p>clicked items are dropped into drop locations in order - replaces sentence reorder but can also be used for other drag and drop 1-2-1 types where teh order of drop locations is obivous or intuitive</p>",
    "help_url": "",
    "input_widget": "ScholarSentenceReorder",
    "input_options": {
        "correctAnswer": "settings['how_many_drags']",
        "hint": {
            "static": true,
            "value": ""
        },
        "target_text": {
            "static": false,
            "value": "settings['target_text']"
        },
        "target_height": {
            "static": false,
            "value": "settings['target_height']"
        },
        "target_width": {
            "static": false,
            "value": "settings['target_width']"
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
        },
        "drags_position": {
            "static": false,
            "value": "settings['drags_position']"
        },
        "scholarInstruction": {
            "static": true,
            "value": "Select the items in the order you would like to position them."
        }
    },
    "can_be_gap": true,
    "can_be_step": true,
    "marking_script": "mark:\nif(interpreted_answer = 0, incorrect(\"Your answer is incorrect.\"),\nif(interpreted_answer < input_options[\"how_many_drags\"],\nif (input_options['all_or_nothing'], incorrect(\"You must find all matches to get the marks\") , \napply(partialFeedback)),\ncorrect(\"Your answer is correct.\"));\nend())\n\nhowMany:\ninput_options[\"how_many_gaps\"]\n\nfraction:\ninterpreted_answer/howMany\n\ninterpreted_answer:\nstudentAnswer\n\npartialFeedback:\nset_credit(partialMark , \"Your answer is partially correct. \"); end()\n\npartialMark:\nif(marks<>howMany and roundOrNaw,precround(fraction,2), fraction)\n\nroundOrNaw:\nif (isInt((marks*interpreted_answer)/howMany) or isInt((howMany/marks)/2), false, true)",
    "marking_notes": [
        {
            "name": "mark",
            "description": "This is the main marking note. It should award credit and provide feedback based on the student's answer.",
            "definition": "if(interpreted_answer = 0, incorrect(\"Your answer is incorrect.\"),\nif(interpreted_answer < input_options[\"how_many_drags\"],\nif (input_options['all_or_nothing'], incorrect(\"You must find all matches to get the marks\") , \napply(partialFeedback)),\ncorrect(\"Your answer is correct.\"));\nend())"
        },
        {
            "name": "howMany",
            "description": "",
            "definition": "input_options[\"how_many_gaps\"]"
        },
        {
            "name": "fraction",
            "description": "",
            "definition": "interpreted_answer/howMany"
        },
        {
            "name": "interpreted_answer",
            "description": "A value representing the student's answer to this part.",
            "definition": "studentAnswer"
        },
        {
            "name": "partialFeedback",
            "description": "",
            "definition": "set_credit(partialMark , \"Your answer is partially correct. \"); end()"
        },
        {
            "name": "partialMark",
            "description": "",
            "definition": "if(marks<>howMany and roundOrNaw,precround(fraction,2), fraction)"
        },
        {
            "name": "roundOrNaw",
            "description": "",
            "definition": "if (isInt((marks*interpreted_answer)/howMany) or isInt((howMany/marks)/2), false, true)"
        }
    ],
    "settings": [
        {
            "name": "target_text",
            "label": "The sentence in the correct order",
            "help_url": "",
            "hint": "This should be a complete sentence in the correct order. You can repeat words but should try to form a sentence that has one clear logical order. you can not omit some words or punctuation from the markup and this will form islands.",
            "input_type": "html",
            "default_value": "<p>A %[complete]% %[sentence or paragraph]% %[in]% %[grammatical]% order.&nbsp;</p>",
            "subvars": false
        },
        {
            "name": "how_many_drags",
            "label": "How many tokens (drag items) are there?",
            "help_url": "",
            "hint": "This is either the number of words in your sentence or the number of blocks it is broken up into. Unfortunaltey it is not possible to deduce this programmatically.",
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
            "label": "Drop area height",
            "help_url": "",
            "hint": "",
            "input_type": "string",
            "default_value": "35",
            "subvars": false
        },
        {
            "name": "target_width",
            "label": "Drop area length",
            "help_url": "",
            "hint": "If left blank or set to auto the questions will decide the elength of drop areas using the average word length. However, this does not work where the tokens are decriptive e.g. html tags and the tags are often wider than the item they describe\",",
            "input_type": "string",
            "default_value": "",
            "subvars": false
        },
        {
            "name": "all_or_nothing",
            "label": "Award marks only for all correct",
            "help_url": "",
            "hint": "",
            "input_type": "checkbox",
            "default_value": false
        },
        {
            "name": "drags_position",
            "label": "Positioning of drags relative to drops",
            "help_url": "",
            "hint": "If this is set to true the drags will position <strong>below</strong> the drops. if unchecked they will attempt to position to the <strong>right</strong> of the drop zone if there is enough room.",
            "input_type": "checkbox",
            "default_value": true
        },
        {
            "name": "scholarInstruction",
            "label": "User instruction",
            "help_url": "",
            "hint": "",
            "input_type": "string",
            "default_value": "Select the items in the order you would like to position them or to place an item in a specific position, select the space before selecting the item.",
            "subvars": false
        }
    ],
    "public_availability": "restricted",
    "published": false,
    "extensions": [
        "scholar-click-in-order"
    ]
}



    static cardMatchJson = {
    "source": {
        "author": {
            "name": "Scholar Team"
        }
    },
    "name": "scholar card match",
    "short_name": "scholar-card-match-test",
    "description": "<p>match items on the left to items on the right. 1 to 1 matching. Can be text, images, or audio.</p>",
    "help_url": "",
    "input_widget": "scholar-card-match",
    "input_options": {
        "correctAnswer": "(settings['howManyPairs'] )",
        "hint": {
            "static": true,
            "value": ""
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
        },
        "scholarInstruction": {
            "static": false,
            "value": "settings['scholarInstruction']"
        }
    },
    "can_be_gap": true,
    "can_be_step": true,
    "marking_script": "mark:\nif(interpreted_answer = 0, incorrect(\"Your answer is incorrect.\"),\nif(interpreted_answer < howMany, apply(partialFeedback),correct(\"Your answer is correct.\"));end())\n\ninterpreted_answer:\nstudentAnswer\n\nhowMany:\ninput_options[\"howManyPairs\"]\n\npartialFeedback:\nset_credit(partialMark, \"Your answer is partially correct.\"); end()\n\npartialMark:\nif(marks<>howMany and roundOrNaw,precround(fraction,2), fraction)\n\nfraction:\ninterpreted_answer/howMany\n\nroundOrNaw:\nif (isInt((marks*interpreted_answer)/howMany) or isInt((howMany/marks)/2), false, true)",
    "marking_notes": [
        {
            "name": "mark",
            "description": "This is the main marking note. It should award credit and provide feedback based on the student's answer.",
            "definition": "if(interpreted_answer = 0, incorrect(\"Your answer is incorrect.\"),\nif(interpreted_answer < howMany, apply(partialFeedback),correct(\"Your answer is correct.\"));end())"
        },
        {
            "name": "interpreted_answer",
            "description": "A value representing the student's answer to this part.",
            "definition": "studentAnswer"
        },
        {
            "name": "howMany",
            "description": "",
            "definition": "input_options[\"howManyPairs\"]"
        },
        {
            "name": "partialFeedback",
            "description": "",
            "definition": "set_credit(partialMark, \"Your answer is partially correct.\"); end()"
        },
        {
            "name": "partialMark",
            "description": "",
            "definition": "if(marks<>howMany and roundOrNaw,precround(fraction,2), fraction)"
        },
        {
            "name": "fraction",
            "description": "",
            "definition": "interpreted_answer/howMany"
        },
        {
            "name": "roundOrNaw",
            "description": "",
            "definition": "if (isInt((marks*interpreted_answer)/howMany) or isInt((howMany/marks)/2), false, true)"
        }
    ],
    "settings": [
        {
            "name": "list_of_pairs",
            "label": "List of key value pairs",
            "help_url": "",
            "hint": "<p>input values as key values pairs in square brackets within a list e.g. [['bing','bong'], ['rick',rack']]</p>\n<p>if you are recreating the card match from an existing for now you will need to reformat from [[\"a\",\"A\"]...] you may be bale to lift teh original list from the variables<br />images can be incuded be reference string e.g. \"my-gif.gif\" as long as that item is in resources<br />audio files should be mx4 format - additional formats could be added on request</p>\n<p>special characters-[]\" and ' might get stripped out if you include them.</p>",
            "input_type": "string",
            "default_value": "[[\"a\",\"A\"],[\"b\",\"B\"],[\"c\",\"C\"]]",
            "subvars": false
        },
        {
            "name": "howManyPairs",
            "label": "How many of the pairs to display",
            "help_url": "",
            "hint": "Use this varibles to choose a random subset of pairs to display e.g. you could have 14 pairs and choose the shuffle and display 8.",
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
            "default_value": false
        },
        {
            "name": "card_width",
            "label": "Width of the cards (in rem)",
            "help_url": "",
            "hint": "<p>At the moment there is one setting for all cards- if required we could have a size left and a size right- although for layout purposes it is helpful if heights are the same.</p>\n<p>if the content size exceeds card size you will end up with one card the wrong size</p>",
            "input_type": "string",
            "default_value": "7",
            "subvars": false
        },
        {
            "name": "card_height",
            "label": "Height of the cards (in rem)",
            "help_url": "",
            "hint": "",
            "input_type": "string",
            "default_value": "5",
            "subvars": false
        },
        {
            "name": "l_c_type",
            "label": "Left card type",
            "help_url": "",
            "hint": "This is the type for all cards in left hand column<br />For audio questions you muct include an image called 'soundwave.jpg' in questions resources",
            "input_type": "choose_several",
            "choices": [
                {
                    "value": "word",
                    "label": "text",
                    "default_value": true
                },
                {
                    "value": "image",
                    "label": "image",
                    "default_value": false
                },
                {
                    "value": "audio",
                    "label": "sound file",
                    "default_value": false
                }
            ]
        },
        {
            "name": "r_c_type",
            "label": "Right card type",
            "help_url": "",
            "hint": "This is the type for all cards in righthand column<br />For audio questions you muct include an image called 'soundwave.jpg' in questions resources",
            "input_type": "choose_several",
            "choices": [
                {
                    "value": "word",
                    "label": "text",
                    "default_value": true
                },
                {
                    "value": "image",
                    "label": "image",
                    "default_value": false
                },
                {
                    "value": "audio",
                    "label": "sound file",
                    "default_value": false
                }
            ]
        },
        {
            "name": "reorderOnReveal",
            "label": "reorder the cards in reveal into pairs",
            "help_url": "",
            "hint": "if this is set to true then the revealed answer diaplyed below the question will have thte cards in apirs horizontally",
            "input_type": "checkbox",
            "default_value": false
        },
        {
            "name": "lineBoxWidth",
            "label": "The width box for lines (in rem)",
            "help_url": "",
            "hint": "This sets the width of the box that contains the lines joining pairs- teh alrger the number the further appart the two rows will be. the more pairs there are you might want them further apart to make it less confusing",
            "input_type": "string",
            "default_value": "8",
            "subvars": false
        },
        {
            "name": "scholarInstruction",
            "label": "User instruction",
            "help_url": "",
            "hint": "",
            "input_type": "string",
            "default_value": "Select the matching pairs.",
            "subvars": false
        }
    ],
    "public_availability": "restricted",
    "published": false,
    "extensions": [
        "scholar-card-match"
    ]
}



    static selfMarkedTextJson = {
    "source": {
        "author": {
            "name": "Scholar Team"
        }
    },
    "name": "Scholar self marked text",
    "short_name": "self-marked-text-test",
    "description": "<p>a long text entry question where the user checks off the parts they have got correct. Relies on the ed devs marking up the correct answer with [check] where they would like user to be able to tick (or not) if they got the answer</p>",
    "help_url": "",
    "input_widget": "selfmark",
    "input_options": {
        "correctAnswer": "settings['howManyChecks']",
        "hint": {
            "static": true,
            "value": ""
        },
        "modelAnswer": {
            "static": false,
            "value": "settings['modelAnswer']"
        },
        "howManyChecks": {
            "static": false,
            "value": "settings['howManyChecks']"
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
        },
        "noMarksInstruction": {
            "static": false,
            "value": "settings['noMarksInstruction']"
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
            "hint": "<p>The model answer should show the student what they should have put. Points that would get the student marks should have a [check] next to them. Each [check] will be replaced with a checkbox for the student to use for marking. You can have more checks than marks- e.g. if you have 3 checks, 2 marks and a marking increment of 1 then any 2 or more out of 3 will get full marks.</p>\n<p>Remember if the format is you could have this OR this and that OR that (2 marks) then checks need to go here: pigs OR hogs [check]; cows or cattle[check];&nbsp;</p>",
            "input_type": "html",
            "default_value": "<p>This answer will get a point [check], so will this [check] and this [check]</p>",
            "subvars": true
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
            "hint": "Text entry width in cols which is very roughly 10px per col",
            "input_type": "string",
            "default_value": "50",
            "subvars": false
        },
        {
            "name": "rows",
            "label": "Text entry height in rows",
            "help_url": "",
            "hint": "Height of text entry in rows- very roughly 20px per row.",
            "input_type": "string",
            "default_value": "4",
            "subvars": false
        },
        {
            "name": "howTo",
            "label": "instruction for user",
            "help_url": "",
            "hint": "Give the user any special instructions on how they should answer",
            "input_type": "string",
            "default_value": "This is a self-marked question. When you are ready, select 'Check your answer'.",
            "subvars": false
        },
        {
            "name": "markInstruction",
            "label": "User instruction for marking",
            "help_url": "",
            "hint": "User instructions on how to mark themselves.&nbsp;",
            "input_type": "string",
            "default_value": "Check the box for each item covered in your answer or select \u2018My answer does not contain any of the items listed\u2019. When you have finished marking your answer, select \u2018Save answer\u2019.",
            "subvars": false
        },
        {
            "name": "correctFeedback",
            "label": "Correct answer feedback",
            "help_url": "",
            "hint": "",
            "input_type": "string",
            "default_value": "Your answer is correct. ",
            "subvars": false
        },
        {
            "name": "partialCorrect",
            "label": "Partially correct answer feedback",
            "help_url": "",
            "hint": "",
            "input_type": "string",
            "default_value": "Your answer is partially correct.",
            "subvars": false
        },
        {
            "name": "incorrectFeedback",
            "label": "Incorrect answer feedback",
            "help_url": "",
            "hint": "the default for this answer includes a space to insert topic to review- remember to edit this or remove it",
            "input_type": "string",
            "default_value": "Your answer is incorrect.",
            "subvars": false
        },
        {
            "name": "noMarksInstruction",
            "label": "The instruction next to the check box for no correct answers matched",
            "help_url": "",
            "hint": "",
            "input_type": "string",
            "default_value": "My answer does not contain any of the items listed.",
            "subvars": false
        }
    ],
    "public_availability": "restricted",
    "published": false,
    "extensions": [
        "scholar-self-marked-text"
    ]
}



    static drag121Json = {
    "source": {
        "author": {
            "name": "Scholar Team"
        }
    },
    "name": "Scholar drag and drop text 1 to 1",
    "short_name": "drag-and-drop-text-1-to-1-1",
    "description": "<p>A replacement for this question type- although it may focus more on clikcing than dragging</p>",
    "help_url": "",
    "input_widget": "ScholarDAndD121",
    "input_options": {
        "correctAnswer": "settings['how_many_gaps']",
        "hint": {
            "static": true,
            "value": ""
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
        "mark_on_match": {
            "static": false,
            "value": "settings['mark_on_match']"
        },
        "all_or_nothing": {
            "static": false,
            "value": "settings['all_or_nothing']"
        },
        "drags_position": {
            "static": false,
            "value": "settings['drags_position']"
        },
        "scholarInstruction": {
            "static": false,
            "value": "settings['scholarInstruction']"
        }
    },
    "can_be_gap": true,
    "can_be_step": true,
    "marking_script": "mark:\nif(interpreted_answer = 0, incorrect(\"Your answer is incorrect.\"),\nif(interpreted_answer < input_options[\"how_many_gaps\"],if (input_options['all_or_nothing'],incorrect(\"You must find all matches to get the marks\") , apply(partialFeedback)),correct(\"Your answer is correct.\"));end())\n\ninterpreted_answer:\nstudentAnswer\n\nhowMany:\ninput_options[\"how_many_gaps\"]\n\nfraction:\ninterpreted_answer/howMany\n\npartialMark:\nif(marks<>howMany and roundOrNaw,precround(fraction,2), fraction)\n\npartialFeedback:\nset_credit(partialMark, \"Your answer is partially correct.\"); end()\n\nroundOrNaw:\nif (isInt((marks*interpreted_answer)/howMany) or isInt((howMany/marks)/2), false, true)",
    "marking_notes": [
        {
            "name": "mark",
            "description": "This is the main marking note. It should award credit and provide feedback based on the student's answer.",
            "definition": "if(interpreted_answer = 0, incorrect(\"Your answer is incorrect.\"),\nif(interpreted_answer < input_options[\"how_many_gaps\"],if (input_options['all_or_nothing'],incorrect(\"You must find all matches to get the marks\") , apply(partialFeedback)),correct(\"Your answer is correct.\"));end())"
        },
        {
            "name": "interpreted_answer",
            "description": "A value representing the student's answer to this part.",
            "definition": "studentAnswer"
        },
        {
            "name": "howMany",
            "description": "",
            "definition": "input_options[\"how_many_gaps\"]"
        },
        {
            "name": "fraction",
            "description": "",
            "definition": "interpreted_answer/howMany"
        },
        {
            "name": "partialMark",
            "description": "",
            "definition": "if(marks<>howMany and roundOrNaw,precround(fraction,2), fraction)"
        },
        {
            "name": "partialFeedback",
            "description": "",
            "definition": "set_credit(partialMark, \"Your answer is partially correct.\"); end()"
        },
        {
            "name": "roundOrNaw",
            "description": "",
            "definition": "if (isInt((marks*interpreted_answer)/howMany) or isInt((howMany/marks)/2), false, true)"
        }
    ],
    "settings": [
        {
            "name": "target_text",
            "label": "Paragraph(s) with fill in words",
            "help_url": "",
            "hint": "<p>Create gaps/drop zones using %[drop text]%. Any text within the %[ ]% will be turned into a drop item.</p>\n<p>For capitalisation on drop put a !^! within the drop text e.g. %[!^!capitlaise anything dropped here%]</p>\n<p>Use css styles and/or tables for layout e.g. for tables in the target_text. E.g. to change text alignment within a td use style=\"text-align:left !important\"</p>\n<p>Insert images using the insert image tool- that will bring the alt text with it</p>\n<p>Latex- to prevent the latex being selectable, wrap it in a span class=\"latex\" tag e.g. %[&lt;span class=\"latex\"&gt;$(x + 4) ^ 6$&lt;/span&gt;]%</p>",
            "input_type": "html",
            "default_value": "<p>Write some <strong>text</strong> with the %[targets]% marked up using %[percent]% and %[square bracket]%. Anything marked up like %[this]% will be replaced with a target and a clickable item that matches the drop will be created.&nbsp;</p>\n<p>You can use HTML markup in your paragraph(s) and to include images&nbsp;</p>",
            "subvars": true
        },
        {
            "name": "how_many_gaps",
            "label": "How many gaps are there in the question",
            "help_url": "",
            "hint": "This setting is used for marking- the stuident must match the number of gaps you ahve put here in order to be marked correct. between 0 and this number they will get partial marks",
            "input_type": "code",
            "default_value": "5",
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
            "label": "Width of the drop target",
            "help_url": "",
            "hint": "This sets the width of both the target and of the 'draggable' items",
            "input_type": "string",
            "default_value": "120",
            "subvars": false
        },
        {
            "name": "target_height",
            "label": "Height of drop target",
            "help_url": "",
            "hint": "This sets the height of both the target and of the 'draggable' items",
            "input_type": "string",
            "default_value": "30",
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
            "hint": "Default value false but if true then the student will get 0 marks for some but not all correct, and will be awarded the amount in marks when they get all correct.",
            "input_type": "checkbox",
            "default_value": false
        },
        {
            "name": "drags_position",
            "label": "Positioning of drags relative to drops",
            "help_url": "",
            "hint": "If this is set to true the drags will position <strong>below</strong> the drops. if unchecked they will attempt to position to the <strong>right</strong> of the drop zone if there is enough room.",
            "input_type": "checkbox",
            "default_value": true
        },
        {
            "name": "scholarInstruction",
            "label": "User instruction",
            "help_url": "",
            "hint": "",
            "input_type": "string",
            "default_value": "Select an item and the location you would like to position it.",
            "subvars": false
        }
    ],
    "public_availability": "restricted",
    "published": false,
    "extensions": [
        "scholar-drag-1-to-1"
    ]
}


    static dropInBucketJson = {
    "source": {
        "author": {
            "name": "Scholar Team"
        }
    },
    "name": "Scholar drop in bucket",
    "short_name": "scholar-drop-in-bucket-1",
    "description": "<p>Select and drop a selection of items into one of several buckets- many to many match to replace drag and drops.<br />This allows you to set up a questions with n number of categories each of which can receive up to x number of answers in any order as long as they are under the correct category.</p>\n<p>You can format the layout of the buckets by use of HTML.<br />To create extra spaces in a bucket (or to keep all buckets of an even size) you can use empty items.<br /><br />You can create distractors to have extra drop items.<br />Items can be dropped in any of teh lcaotions in their bucket.</p>",
    "help_url": "",
    "input_widget": "scholar-drop-in-bucket",
    "input_options": {
        "correctAnswer": "settings['howManyMatches']",
        "hint": {
            "static": true,
            "value": ""
        },
        "howManyMatches": {
            "static": false,
            "value": "settings['howManyMatches']"
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
        "markOnMatch": {
            "static": false,
            "value": "settings['mark_on_match']"
        },
        "allOrNothing": {
            "static": false,
            "value": "settings['all_or_nothing']"
        },
        "drags_position": {
            "static": false,
            "value": "settings['drags_position']"
        },
        "scholarInstruction": {
            "static": true,
            "value": "Select an item and the location you would like to position it."
        }
    },
    "can_be_gap": true,
    "can_be_step": true,
    "marking_script": "mark:\nif(interpreted_answer = 0, incorrect(\"Your answer is incorrect.\"),\nif(interpreted_answer < input_options[\"howManyMatches\"],if (input_options['allOrNothing'],incorrect(\"You must find all matches to get the marks\") , apply(partialFeedback)),correct(\"Your answer is correct.\"));end())\n\ninterpreted_answer:\nstudentAnswer\n\nhowMany:\ninput_options[\"howManyMatches\"]\n\nfraction:\ninterpreted_answer/howMany\n\npartialFeedback:\nset_credit(partialMark , \"Your answer is partially correct. \"); end()\n\npartialMark:\nif(marks<>howMany and roundOrNaw,precround(fraction,2), fraction)\n\nroundOrNaw:\nif (isInt((marks*interpreted_answer)/howMany) or isInt((howMany/marks)/2), false, true)",
    "marking_notes": [
        {
            "name": "mark",
            "description": "This is the main marking note. It should award credit and provide feedback based on the student's answer.",
            "definition": "if(interpreted_answer = 0, incorrect(\"Your answer is incorrect.\"),\nif(interpreted_answer < input_options[\"howManyMatches\"],if (input_options['allOrNothing'],incorrect(\"You must find all matches to get the marks\") , apply(partialFeedback)),correct(\"Your answer is correct.\"));end())"
        },
        {
            "name": "interpreted_answer",
            "description": "A value representing the student's answer to this part.",
            "definition": "studentAnswer"
        },
        {
            "name": "howMany",
            "description": "",
            "definition": "input_options[\"howManyMatches\"]"
        },
        {
            "name": "fraction",
            "description": "",
            "definition": "interpreted_answer/howMany"
        },
        {
            "name": "partialFeedback",
            "description": "",
            "definition": "set_credit(partialMark , \"Your answer is partially correct. \"); end()"
        },
        {
            "name": "partialMark",
            "description": "",
            "definition": "if(marks<>howMany and roundOrNaw,precround(fraction,2), fraction)"
        },
        {
            "name": "roundOrNaw",
            "description": "<p>to differentiate between situations where the user has got a combination of marks and partial correct that equates to a hole number e.g. 3/9 correct when there are 3 marks and where they have 2 out of 9</p>",
            "definition": "if (isInt((marks*interpreted_answer)/howMany) or isInt((howMany/marks)/2), false, true)"
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
            "name": "howManyMatches",
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
        },
        {
            "name": "drags_position",
            "label": "Position of the drag items container",
            "help_url": "",
            "hint": "if this is set to true the drag items are positioned below the drop zone, if false these are to the right",
            "input_type": "checkbox",
            "default_value": true
        },
        {
            "name": "scholarInstruction",
            "label": "User instruction",
            "help_url": "",
            "hint": "",
            "input_type": "string",
            "default_value": "Select an item and a space to position each one.",
            "subvars": false
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