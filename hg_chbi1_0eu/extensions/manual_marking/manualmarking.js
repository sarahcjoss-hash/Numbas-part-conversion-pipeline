Numbas.addExtension('manualmarking', ['base','scholarcommon'], function(extension) {
    var scholarExtension = Numbas.scholarcommon;
    var configs = scholarExtension.configs;
    var currentPart = scholarExtension.currentPart;
    var funcObj = Numbas.jme.funcObj;
    var types = Numbas.jme.types;
    var TString = types.TString;
    var TNum = types.TNum;
    var TList = types.TList;

    extension.manualmarkingConfig = function() {
//        this.eddevType = '';
    };
    extension.manualmarkingConfig.prototype = {
        render: function(){
            if(this.errors.errorMessages.length){
                var returnHtml = '<ul><strong>ERRORS:</strong>';
                for (var i = 0; i < this.errors.errorMessages.length; i++){
                    returnHtml += this.errors.errorMessages[i];
                };
                return returnHtml +'</ul>';
            }
            else {
                var type = this.partConfig.eddevType;
                this.getNumbasPart().settings.extension = "manualmarking";
                switch (type) {
                    case 'textarea':
                        return formatPart(this);
                        break;
                    default :
                        return '<span><strong>HTML element type (' + type 
                                + ') not implemented yet</strong></span>';
                };
            };
        }
    };

    var extendedCommonConfig = function(){
        return $.extend(new scholarExtension.Config, new extension.manualmarkingConfig);
    };

    extension.scope.addFunction(new funcObj('manualmarking_builder', [TString], 
                                            TString, function(eddevPartId){
        var defaultInputElementType = 'textarea';
        var config = new extendedCommonConfig();
        if (!config.errors.errorMessages.length){
            var eddevQuestionNumber;
            if (Numbas.exam.currentQuestion === undefined){
                eddevQuestionNumber = Numbas.exam.questionList[Numbas.exam.questionList.length-1].number + 1;
            }
            else {
                eddevQuestionNumber = Numbas.exam.currentQuestion.number + 1;
            }
            config.setEddevQuestionNumber(eddevQuestionNumber);
            config.setNumbasQuestion(eddevQuestionNumber);
            config.setEddevPartId(eddevPartId);
            config.setNumbasPart(eddevPartId);
            config.setEddevType(defaultInputElementType);
            currentPart = config.getNumbasPart().index;
            configs[currentPart] = config;
        };
        return '';
    }));
    extension.scope.addFunction(new funcObj('manualmarking_input_element', [TString], TString, function(eddevInputElementType){
        configs[currentPart].setEddevType(eddevInputElementType);
        return '';
    }));
    extension.scope.addFunction(new funcObj('manualmarking_render', [], TString, function(){
        scholarExtension.scholariseQuestion(configs[currentPart]);
        var renderValue = configs[currentPart].render();
        if (typeof renderValue === "string"){
            return renderValue;
        }
        else{
            return '';
        };
    }));

    
    /*
     * Start text on drags - 1 to 1 and 1 to many drag to drop
     */
    function formatPart(config) {
        try {
            replaceGapInputBoxes(config);
        }
        catch (err) {
            var domErrorAsSpan = '<div><strong>There was an error building the "' + 
                    config.partConfig.eddevType + '" type drags ' +
                    'and formating the dropzones - ' + err + '</strong></div>';
            scholarExtension.clearPromptArea(config.getNumbasPart(), domErrorAsSpan);
        }
        finally {
            return '';
        };
    };

    function replaceGapInputBoxes(config) {
        $.each(config.getNumbasPart().gaps, function(gapIndex, gap) {
            var part = gap.question.display.html.find('.part').filter(function() {
                return $(this).attr('data-bind').indexOf("getPart('p" +
                        config.getNumbasPart().index + "g" + gapIndex + "')") >= 0;
            });
            $(part).css('width','95%');

            // hide the patternmatch input box and feedback icons
            var studentAnswer = gap.question.display.html.find('.part .student-answer').filter(function() {
                return $(this.parentNode).attr('data-bind').indexOf("getPart('p" +
                        config.getNumbasPart().index + "g" + gapIndex + "')") >= 0;
            });
            $(studentAnswer).css('display', 'none');
            
            // set the correct answer span to 100% of the part span
            var correctAnswer = gap.question.display.html.find('.part .correct-answer').filter(function() {
                return $(this.parentNode).attr('data-bind').indexOf("getPart('p" +
                        config.getNumbasPart().index + "g" + gapIndex + "')") >= 0;
            });
            $(correctAnswer).css('width','100%');
            
            // replace the expected answer input element with a textarea element
            $(gap.question.display.html.find('.correct-answer input')).each(function () {
                textarea = $(document.createElement('textarea')).attr('data-bind', 'html: displayAnswer');
                $(textarea).css('width','100%');
                $(textarea).css('height','8em');
                $(this).replaceWith(textarea);
            });

            var inputElement = $('<' + config.getEddevType() + ' style="width:100%;height:8em;"></' + config.getEddevType() + '>');
            $(part).before(inputElement);
            $(inputElement).val(gap.display.studentAnswer());
            $(inputElement).on('input', function() {
                gap.display.studentAnswer($(this).val());
            });

            // hide hintToggle button
            var hintToggle = gap.question.display.html.find('#hintToggle');
            $(hintToggle).css('display', 'none');

            // change advice header
            gap.question.display.html.find('.adviceContainer')[0].firstChild.innerHTML = "Expected answer via ADVICE";
        });
    };
});
