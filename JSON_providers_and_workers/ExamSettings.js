class ExamSettings {
    constructor() {
        this._navigation = {
                "allowregen": false,
                "reverse": true,
                "browse": true,
                "allowsteps": true,
                "showfrontpage": false,
                "navigatemode": "sequence",
                "onleave": {
                    "action": "none",
                    "message": ""
                },
                "preventleave": true,
                "typeendtoleave": false,
                "startpassword": "",
                "autoSubmit": true,
                "allowAttemptDownload": false,
                "downloadEncryptionKey": "",
                "showresultspage": "oncompletion"
            }
        
        this._feedback = {
                "enterreviewmodeimmediately": true,
                "showactualmarkwhen": "always",
                "showtotalmarkwhen": "always",
                "showanswerstatewhen": "always",
                "showpartfeedbackmessageswhen": "always",
                "showexpectedanswerswhen": "inreview",
                "showadvicewhen": "inreview",
                "allowrevealanswer": true,
                "intro": "",
                "end_message": "",
                "results_options": {
                    "printquestions": true,
                    "printadvice": true
                },
                "feedbackmessages": [],
                "reviewshowexpectedanswer": true,
                "showanswerstate": true,
                "reviewshowfeedback": true,
                "showactualmark": true,
                "showtotalmark": true,
                "reviewshowscore": true,
                "reviewshowadvice": true
            
        }
    }
    get navigation() {
        return this._navigation;
    }
    get feedback() {
        return this._feedback;
    }
}
export { ExamSettings }