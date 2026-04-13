Numbas.queueScript('scholarcommon', ['base','jme'], function() {
    var scholarcommon = Numbas.scholarcommon = {
        scope: new Numbas.jme.Scope(),
        configs: {},
        currentPart: '',
        disableScrollingToTop: true,
        
        Config: function() {
            this.errors = {
                errorMessages: []
            };
            this.questionConfig = {
                eddevQuestionNumber: 0,
                numbasQuestion: undefined
            };
            this.partConfig = {
                eddevPartId: '',
                numbasPart: undefined,
                eddevType: '',
                eddevGapPositionIsRelative: true
            };
            this.domGaps = [];
        },
        
        gapConfig: function() {
            this.gapId = '';
            this.capitalise = false;
            this.gap_top_left_coordinates = [];
        },
        
        domElementIdentifier: function(str) {
            this.typeOfElement;
            this.question;
            this.part;
            this.gap;
            this.initialiseFromString(str);
        },
        
        scholariseQuestion: function(config) {
            var feedbackButton = config.getNumbasPart().question.display.html.find('button#feedbackToggle')[config.getNumbasPart().index];
            $(feedbackButton).attr('data-bind', 'style:{display: \'none\'}');
        },
        
        hideCorrectAnswerOnReveal: function(gap, config, gapIndex) {
            // use the code below for all gaps - to hide correct answer on reveal
            // OR comment this code out and uncheck the "Show correct answer on reveal" box on each part
            var domCorrectAnswer = gap.question.display.html.find('.part .correct-answer').filter(function() {
                return $(this.parentNode).attr('data-bind').indexOf("getPart('p" + config.getNumbasPart().index + "g" + gapIndex + "')") >= 0;
            });
            $(domCorrectAnswer).css('display', 'none');
        },
        
        toggleFeedbackGroup: function(gap, config, gapIndex) {
            // group the icons and warnings together in a span
            // then hide or show depending on reveal and answer
            var domFeedbackGroup = gap.question.display.html.find('.feedback-icon, .warning-icon, .warnings').filter(function() {
                return $(this.parentNode.parentNode).attr('data-bind').indexOf("getPart('p" + config.getNumbasPart().index + "g" + gapIndex + "')") >= 0;
            });
            $(domFeedbackGroup).wrapAll("<span class='feedback-group' />");
            
            var selector = '.feedback-group';
            if (Numbas.getTargetDiv() != ""){
                   selector = '#' + Numbas.getTargetDiv() + ' ' + selector;
            }
            $(selector).attr('data-bind', 'css:{\'none\' : (revealed() && !credit())' + //correctAnswer().toLowerCase() != studentAnswer().toLowerCase())' +
                    '|| (answered() && studentAnswer() == \'scholar\')}');
        },
        
        clearPromptArea: function(part, message) {
            $(part.question.display.html.find('.parts')).after(message);
            $(part.question.display.html.find('.parts')).css('display', 'none');
        },
        
        shuffleArray: function(array) {
            var counter = array.length;
            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                var index = Math.floor(Math.random() * counter);
                // Decrease counter by 1
                counter--;
                // And swap the last element with it
                var temp = array[counter].getEddevDrag();
                array[counter].setEddevDrag(array[index].getEddevDrag());
                array[index].setEddevDrag(temp);
            }
            return array;
        },
        
        getTextDimensions: function(answerHTML, dimension, currentMax) {
            var tempSpan = document.createElement("span");
            $(tempSpan).append(answerHTML);
            document.body.appendChild(tempSpan);
            // the extra 4 pixels is the margin around the gap (outline-offset)
            if (dimension === 'width') {
                if (tempSpan.offsetWidth + 20 > currentMax) {
                    currentMax = tempSpan.offsetWidth + 20;
                };
            };
            if (dimension === 'height') {
                if (tempSpan.offsetHeight > currentMax) {
                    currentMax = tempSpan.offsetHeight;
                };
            };
            document.body.removeChild(tempSpan);
            return currentMax;
        },
        
        capitaliseGaps: function (capitaliseGaps, currentPart) {
            scholarcommon.configs[currentPart].setCapitaliseGaps(fetchList(capitaliseGaps));
            return '';
        },
        
        absoluteGapPositions: function(currentPart) {
            scholarcommon.configs[currentPart].setIsRelativeGapPosition(false);
            return '';
        },
        
        spanObject: function(){
            return $(document.createElement('span'));
        },
        
        divObject: function(){
            return $(document.createElement('div'));
        },
        
        imageObject: function(){
            return $(document.createElement('img'));
        }      
    };
    scholarcommon.Config.prototype = {
        setEddevQuestionNumber: function(eddevQuestionNumber) {
            this.questionConfig.eddevQuestionNumber = eddevQuestionNumber - 1;
            return this;
        },
        setNumbasQuestion: function(eddevQuestionNumber) {
            this.questionConfig.numbasQuestion = Numbas.exam === undefined ? 1 : Numbas.exam.questionList[eddevQuestionNumber - 1];
            return this;
        },
        setEddevPartId: function(eddevPartId) {
            this.partConfig.eddevPartId = eddevPartId;
            return this;
        },
        setNumbasPart: function(eddevPartId) {
            this.partConfig.numbasPart = this.getNumbasQuestion().parts[convertLetterIndexToNumberIndex(eddevPartId)];
            return this;
        },
        setEddevType: function(eddevType) {
            this.partConfig.eddevType = eddevType;
            return this;
        },
        setIsRelativeGapPosition: function(relative) {
            this.partConfig.eddevGapPositionIsRelative = relative;
            return this;
        },
        setDomGaps: function(domGaps) {
            this.domGaps = domGaps;
            return this;
        },
        setCapitaliseGaps: function(capitaliseGaps) {
            if (!this.errors.errorMessages.length) {
                for (var i = 0; i < this.getNumbasPart().gaps.length; i++) {
                    if ($.inArray(i,capitaliseGaps) === -1) {
                        this.domGaps[i].setIsCapitalise(false);
                    }
                    else {
                        this.domGaps[i].setIsCapitalise(true);
                    };
                };
            };
            return this;
        },
        setGapTopLeftPositions: function(positions) {
            if (!this.errors.errorMessages.length) {
                if (this.getNumbasPart().gaps.length !== positions.length) {
                    this.errors.errorMessages.push(buildListItem('The gap_top_left_position array should ' +
                            'have the same amount of elements as the amount of gaps'));
                    return this;
                };
                if (positions.filter(function(value) {
                    return value.vars === 2;
                }).length !== positions.length) {
                    this.errors.errorMessages.push(buildListItem('The gap_top_left_position ' +
                            'array should contain two element objects'));
                    return this;
                };
                if (positions.filter(function(value) {
                    return typeof value.value[0].value === 'number'
                            && typeof value.value[1].value === 'number';
                }).length !== positions.length) {
                    this.errors.errorMessages.push(buildListItem('The gap_top_left_position ' +
                            'array should only contain numbers'));
                    return this;
                };
                if (!this.errors.errorMessages.length) {
                    for (var i = 0; i < this.getNumbasPart().gaps.length; i++) {
                        this.domGaps[i].setGapTopLeftCoordinates(positions[i]);
                    };
                };
            };
            return this;
        },
        getEddevQuestionNumber: function() {
            return this.questionConfig.eddevQuestionNumber;
        },
        getNumbasQuestion: function() {
            return this.questionConfig.numbasQuestion;
        },
        getEdDevPartId: function() {
            return this.partConfig.eddevPartId;
        },
        getNumbasPart: function() {
            return this.partConfig.numbasPart;
        },
        getEddevType: function() {
            return this.partConfig.eddevType;
        },
        isRelativeGapPosition: function() {
            return this.partConfig.eddevGapPositionIsRelative;
        },
        getDomGaps: function() {
            return this.domGaps;
        },
        processDomGaps: function(type) {
            var listOfGaps = [];
            for (var i = 0; i < this.getNumbasPart().gaps.length; i++) {

                var gapElementIdentifier = new scholarcommon.domElementIdentifier();
                gapElementIdentifier.setTypeOfElement(type);
                gapElementIdentifier.setQuestion(this.questionConfig.eddevQuestionNumber);
                gapElementIdentifier.setPart(this.getNumbasPart().index);
                gapElementIdentifier.setGap(i);

                var gap = new scholarcommon.gapConfig();
                gap.setGapId(gapElementIdentifier);
                listOfGaps.push(gap);
            };
            this.setDomGaps(listOfGaps);
        }
    };

    scholarcommon.gapConfig.prototype = {
        setGapId: function(gapId) {
            this.gapId = gapId;
            return this;
        },
        getGapId: function() {
            return this.gapId;
        },
        setIsCapitalise: function(capitalise) {
            this.capitalise = capitalise;
            return this;
        },
        isCapitalise: function() {
            return this.capitalise;
        },
        setGapTopLeftCoordinates: function(coordinates) {
            this.gap_top_left_coordinates = fetchList(coordinates.value);
            return this;
        },
        getGapTopLeftCoordinates: function() {
            return this.gap_top_left_coordinates;
        }
    };

    scholarcommon.domElementIdentifier.prototype = {
        setTypeOfElement: function(typeOfElement) {
            this.typeOfElement = typeOfElement;
            return this;
        },
        getTypeOfElement: function() {
            return this.typeOfElement;
        },
        setQuestion: function(question) {
            this.question = question;
            return this;
        },
        getQuestion: function() {
            return this.question;
        },
        setPart: function(part) {
            this.part = part;
            return this;
        },
        getPart: function() {
            return this.part;
        },
        setGap: function(gap) {
            this.gap = gap;
            return this;
        },
        getGap: function() {
            return this.gap;
        },
        toString: function() {
            if (this.getTypeOfElement() === undefined ||
                    this.getQuestion() === undefined ||
                    this.getPart() === undefined ||
                    this.getGap() === undefined) {
                throw 'Unable to toString on partially defined domElementIdentifier: ' + this.toStringIgnorePartialDefinition();
            }
            return this.toStringIgnorePartialDefinition();
        },
        toStringIgnorePartialDefinition: function() {
            return this.getTypeOfElement() + 'q' + this.getQuestion() + 'p' + this.getPart() + 'g' + this.getGap();
        },
        initialiseFromString: function(str) {
            if (str) {
                this.setTypeOfElement(str.split('q')[0]);
                this.setQuestion(parseInt(str.match(/[0-9]+/g)[0]));
                this.setPart(parseInt(str.match(/[0-9]+/g)[1]));
                this.setGap(parseInt(str.match(/[0-9]+/g)[2]));
            }
        }
    };

    function convertLetterIndexToNumberIndex(letter) {
        return letter.toLowerCase().charCodeAt(0) - 97;
    };

    function buildListItem(message) {
        return '<li><strong>' + message + '</strong></li>';
    };

    function fetchList(variableName) {
        var list = [];
        for (var i = 0; i < variableName.length; i++) {
            list.push(variableName[i].value);
        };
        return list;
    };
});
