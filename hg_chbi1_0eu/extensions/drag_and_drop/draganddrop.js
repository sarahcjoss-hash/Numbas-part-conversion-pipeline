Numbas.addExtension('draganddrop', ['base','scholarcommon'], function(extension) {
    var scholarExtension = Numbas.scholarcommon;
    var configs = scholarExtension.configs;
    var currentPart = scholarExtension.currentPart;
    var funcObj = Numbas.jme.funcObj;
    var types = Numbas.jme.types;
    var TString = types.TString;
    var TNum = types.TNum;
    var TList = types.TList;

    extension.draganddropConfig = function() {
        this.eddevDrags = [];
        this.eddevHowManyDragsPerLine = 0;
        this.eddevDragDimensions = [undefined, undefined];
        this.eddevDragsLocation = 'bottom';
    };
    extension.draganddropConfig.prototype = {
        setEddevDrags: function(eddevDrags){
            this.eddevDrags = eddevDrags;
            return this;
        },
        setDragsPerLine: function(dragsPerLine){
            this.eddevHowManyDragsPerLine = dragsPerLine;
            return this;
        },
        setEddevDragWidth: function(maxWidth){
            this.eddevDragDimensions[0] = maxWidth;
            return this;
        },
        setEddevDragHeight: function(maxHeight){
            this.eddevDragDimensions[1] = maxHeight;
            return this;
        },
        setDragsLocation: function(location){
            this.eddevDragsLocation = location;
            return this;
        },
        getEddevDrags: function(){
            return this.eddevDrags;
        },
        getDragsPerLine: function(){
            return this.eddevHowManyDragsPerLine;
        },
        getDragWidth: function(){
            return this.eddevDragDimensions[0];
        },
        getDragHeight: function(){
            return this.eddevDragDimensions[1];
        },
        getDragsLocation: function(){
            return this.eddevDragsLocation;
        },
        processEddevDrags: function(eddevDrags){
            var listOfEddevDrags = [];
            var maxWidth = 0;
            var maxHeight = 0;
            for (var i = 0; i < eddevDrags.length; i++){
                var domDragElementId = new scholarExtension.domElementIdentifier();
                domDragElementId.setTypeOfElement('drag');
                domDragElementId.setQuestion(this.questionConfig.eddevQuestionNumber);
                domDragElementId.setPart(this.getNumbasPart().index);
                domDragElementId.setGap(i);

                var drag = new dragConfig();
                drag.setDragId(domDragElementId);
                drag.setEddevDrag(eddevDrags[i].value)

                listOfEddevDrags.push(drag);
                if (this.partConfig.eddevType === 'text' || this.partConfig.eddevType === 'reorder'){
                    maxWidth = scholarExtension.getTextDimensions(eddevDrags[i].value,'width',maxWidth);
                    maxHeight = scholarExtension.getTextDimensions(eddevDrags[i].value,'height',maxHeight);
                };
            };
            this.setEddevDragWidth(maxWidth);
            this.setEddevDragHeight(maxHeight);
            scholarExtension.shuffleArray(listOfEddevDrags);
            this.setEddevDrags(listOfEddevDrags);
        },
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
                this.getNumbasPart().settings.extension = "draganddrop";
                switch (type) {
                    case 'text':
                        return buildDragsAndFormatDropBoxes(this);
                        break;
                    case 'reorder':
                        return createTextReorderDrags(this);
                        break;
                    case 'image':
                        return buildDragsAndFormatDropBoxes(this);
                        break;
                    default :
                        return '<span><strong>Type (' + type 
                                + ') not implemented yet</strong></span>';
                };
            };
        }
    };

    var extendedCommonConfig = function(){
        return $.extend(new scholarExtension.Config, new extension.draganddropConfig);
    };

    extension.scope.addFunction(new funcObj('dnd_builder', [TString,TString,TList], 
                                            TString, function(eddevPartId, eddevType, eddevDrags){
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
            config.setEddevType(eddevType);
            config.processEddevDrags(eddevDrags);
            config.processDomGaps('drop');
            currentPart = config.getNumbasPart().index;
            if (this.document.children[0].innerHTML.contains('class="absdz"')){
                config.setIsRelativeGapPosition(false);
            };
            configs[currentPart] = config;
        };
        return '';
    }));
    extension.scope.addFunction(new funcObj('dnd_drags', [TString,TString], TString, function(drags){
        configs[currentPart].setDrags(drags);
        return '';
    }));
    extension.scope.addFunction(new funcObj('dnd_drags_location', [TString], TString, function(location){
        configs[currentPart].setDragsLocation(location);
        return '';
    }));
    extension.scope.addFunction(new funcObj('dnd_dragWidth', [TNum], TString, function(width){
        configs[currentPart].setEddevDragWidth(width);
        return '';
    }));
    extension.scope.addFunction(new funcObj('dnd_dragHeight', [TNum], TString, function(height){
        configs[currentPart].setEddevDragHeight(height);
        return '';
    }));
    extension.scope.addFunction(new funcObj('dnd_dragsPerLine', [TNum], TString, function(dragsPerLine){
        configs[currentPart].setDragsPerLine(dragsPerLine);
        return '';
    }));
    extension.scope.addFunction(new funcObj('dnd_render', [], TString, function(){
        scholarExtension.scholariseQuestion(configs[currentPart]);
        var renderValue = configs[currentPart].render();
        if (typeof renderValue === "string"){
            return renderValue;
        }
        else{
            return '';
        };
    }));
    
    extension.scope.addFunction(new funcObj('dnd_capitaliseDropzones', [TList],
                                                TString, function(capitaliseGaps) {
        scholarExtension.capitaliseGaps(capitaliseGaps, currentPart);
        return '';
    }));

    var dragConfig = function() {
        this.dragId = '';
        this.eddevDrag = '';
    };
    dragConfig.prototype = {
        setDragId: function(dragId){
            this.dragId = dragId;
            return this;
        },
        getDragId: function(){
            return this.dragId;
        },
        setEddevDrag: function(eddevDrag){
            this.eddevDrag = eddevDrag;
            return this;
        },
        getEddevDrag: function(){
            return this.eddevDrag;
        }
    };
    
    /*
     * Start text on drags - 1 to 1 and 1 to many drag to drop
     */
    function buildDragsAndFormatDropBoxes(config) {
        var domDragsWithinContainer = '';
        try {
            replaceGapInputBoxes(config);
            domDragsWithinContainer = buildDrags(config);
            var domPrompt = config.getNumbasPart().question.display.html.find('.prompt')[config.getNumbasPart().index];
            $(domPrompt).after(domDragsWithinContainer);
            $(domDragsWithinContainer).attr('location',config.getDragsLocation());
        }
        catch (err) {
            var domErrorAsSpan = '<div><strong>There was an error building the "' + 
                    config.partConfig.eddevType + '" type drags ' +
                    'and formating the dropzones - ' + err + '</strong></div>';
            scholarExtension.clearPromptArea(config.getNumbasPart(), domErrorAsSpan);
        }
        finally {
            return domDragsWithinContainer;
        };
    };

    function replaceGapInputBoxes(config) {
        $.each(config.getNumbasPart().gaps, function(gapIndex, gap){
            var patternMatchPart = gap.question.display.html.find('.part.type-patternmatch').filter(function(){
                return $(this).attr('data-bind').indexOf("getPart('p"+config.getNumbasPart().index+"g"+gapIndex+"')")>=0;
            });
            if (!config.isRelativeGapPosition()){
                $(patternMatchPart).css('position','absolute');
                $(patternMatchPart).css('top', $(gap.question.display.html.find('#absdz'+gapIndex)).css('top'));
                $(patternMatchPart).css('left', $(gap.question.display.html.find('#absdz'+gapIndex)).css('left'));
                $(patternMatchPart).css('margin', 0);
                var absoluteDZElementId = new scholarExtension.domElementIdentifier();
                absoluteDZElementId.setTypeOfElement('absdz');
                absoluteDZElementId.setQuestion(config.getEddevQuestionNumber());
                absoluteDZElementId.setPart(config.getNumbasPart().index);
                absoluteDZElementId.setGap(gapIndex);
            };
            var domInput = gap.question.display.html.find('.part .student-answer input.patternmatch').filter(function(){
                return $(this.parentNode.parentNode).attr('data-bind').indexOf("getPart('p" +
                                                    config.getNumbasPart().index+"g"+gapIndex+"')")>=0;
            });
            $(domInput).attr('id', 'input' + config.getDomGaps()[gapIndex].getGapId().toString());
            $(domInput).css('display','none');
            
            scholarExtension.hideCorrectAnswerOnReveal(gap, config, gapIndex);
            scholarExtension.toggleFeedbackGroup(gap, config, gapIndex);
            
            if (config.getEddevType() === 'text' || config.getEddevType() === 'image'){
                buildDropZones(config, gap, domInput);
                if (!config.isRelativeGapPosition()){
                    var tinyMceDropzone = gap.question.display.html.find('#absdz'+gapIndex).filter(function(){
                        return $(this.parentNode.parentNode.parentNode.parentNode).attr('data-bind').indexOf("getPart('p" +
                                                    config.getNumbasPart().index+"')")>=0;});
                    $(tinyMceDropzone).css('display','none');
                    $(tinyMceDropzone).attr('id',absoluteDZElementId.toString());
                    $(tinyMceDropzone).after(patternMatchPart);
                };
            }
            else if (config.getEddevType() === 'reorder'){
                buildReorderDrags(config, gap, gapIndex, domInput);
            }
        });
    };
    
    function buildDrags(config){
        var domDragsWithinContainer = scholarExtension.divObject();
        $(domDragsWithinContainer).attr('id', 'dragsContainer');
        $(domDragsWithinContainer).css('border', '1px solid #aaaaaa');
        $(domDragsWithinContainer).css('padding', '10px');
        $(domDragsWithinContainer).css('display', 'inline-table');
        $(domDragsWithinContainer).css('margin-right','1em');
        $(domDragsWithinContainer).css('margin-left','1em');
        
        var arrayOfDomDragElements = [];
        for (var i = 0; i < config.getEddevDrags().length; i++) {
            var domDragElementId = config.getEddevDrags()[i].getDragId();
            switch (config.getEddevType()) {
                case 'text':
                    var domDragElement = scholarExtension.spanObject();
                    buildTextDragElement(domDragElement, domDragElementId, config);
                    break;
                case 'image':
                    var domDragElement = scholarExtension.imageObject();
                    buildImageDragElement(domDragElement, domDragElementId, config);
                    break;
            };
            arrayOfDomDragElements.push(domDragElement);
        };
        for (var i = 0; i < arrayOfDomDragElements.length; i++) {
            if (config.getDragsPerLine() > 0 && i % config.getDragsPerLine() === 0 && i > 0) {
                $(domDragsWithinContainer).append($('<br/>'));
            };
            var domDragPlaceholderElement = scholarExtension.spanObject();
            var domDragPlaceholderElementId = config.getEddevDrags()[i].getDragId();
            domDragPlaceholderElementId.setTypeOfElement('hold');
            switch (config.getEddevType()) {
                case 'text':
                    buildTextDragPlaceholder(domDragPlaceholderElement, domDragPlaceholderElementId, config);
                    $(domDragsWithinContainer).append($(domDragPlaceholderElement).html(
                            config.getEddevDrags()[i].getEddevDrag()).wrapInner(arrayOfDomDragElements[i]));
                    break;
                case 'image':
                    buildImageDragPlaceholder(domDragPlaceholderElement, domDragPlaceholderElementId, config);
                    $(domDragsWithinContainer).append($(domDragPlaceholderElement).wrapInner(arrayOfDomDragElements[i]));
                    break;
            };
        };
        return domDragsWithinContainer;
    };
    
    function buildDropZones(config, gap, domInput) {
        // setting studentAnswer with initial value which allows the part.answered() observable to be set to true
        // even when any drop zones are "blank" once the submit button is pressed
        gap.display.studentAnswer("scholar");
        
        gap.display.displayAnswer(capitaliseString(config.domGaps[gap.index].capitalise, gap.display.displayAnswer()));

        var domDropBox = scholarExtension.spanObject();
        if (config.getEddevType() === 'image'){
            buildImageDropZone(domDropBox, gap, config);
        }
        else {
            buildTextDropZone(domDropBox, gap, config);
        };
        $(domInput).after(domDropBox);
    };

    function buildTextDragElement(domDragElement, domDragElementId, config){
        $(domDragElement).addClass('drags');
        $(domDragElement).attr('data-bind', 'attr:{draggable: revealed() ? false : true}, ' +
                                    'style:{cursor: revealed() ? \'not-allowed\' : \'move\'}');        
        $(domDragElement).attr('id', domDragElementId.toString());
        $(domDragElement).css('width',config.getDragWidth());
        $(domDragElement).css('height',config.getDragHeight());
        $(domDragElement).on('dragstart',function(event) {
            event.stopPropagation();
            event.originalEvent.dataTransfer.effectAllowed = 'move';
            event.originalEvent.dataTransfer.setData('text', event.target.id);
        });
    };

    function buildTextDragPlaceholder(domDragPlaceholderElement, domDragPlaceholderElementId, config){
        buildDropZone(domDragPlaceholderElement, domDragPlaceholderElementId, config);
        $(domDragPlaceholderElement).on('drop',function(event) {
            var dragId = event.originalEvent.dataTransfer.getData('text');
            var dragIdentifier = new scholarExtension.domElementIdentifier(dragId);
            handleTextDrop(event, domDragPlaceholderElementId, config, dragIdentifier);
        });
    };

    function buildTextDropZone(domDropBox, gap, config){
        var domDropElementId = config.domGaps[gap.index].getGapId();
        buildDropZone(domDropBox, domDropElementId, config);
        
        $(domDropBox).attr('data-bind', 'css:{\'drags\' : revealed()}, html: revealed() ? displayAnswer:\'\'');
        
        $(domDropBox).on('drop',function(event) {
            var dragId = event.originalEvent.dataTransfer.getData('text');
            var dragIdentifier = new scholarExtension.domElementIdentifier(dragId);
            if (handleTextDrop(event, domDropElementId, config, dragIdentifier)){
                gap.display.studentAnswer(config.getEddevDrags()[dragIdentifier.getGap()].getEddevDrag());
            };
        });
    };
    
    function buildDropZone(dropZone, elementId, config){
        if (elementId.getTypeOfElement() === 'hold'){
            $(dropZone).addClass('drops');
        }
        else {
            config.isRelativeGapPosition() ? $(dropZone).addClass('drops') : $(dropZone).addClass('absolute_drops');
        };
        $(dropZone).attr('id', elementId.toString());
        $(dropZone).css('width',config.getDragWidth() + 2);
        $(dropZone).css('height',config.getDragHeight() + 2);
        $(dropZone).on('dragover',function(event) {
            event.preventDefault();
            event.originalEvent.dataTransfer.dropEffect = 'move';
            return false;
        });
    };
    
    function handleTextDrop(event, dropHolderIdentifier, config, dragIdentifier){
        event.preventDefault();
        // keeping drags within relevant part
        if(dragIdentifier.getQuestion() === dropHolderIdentifier.getQuestion() && 
                dragIdentifier.getPart() === dropHolderIdentifier.getPart()){
            document.getElementById(dragIdentifier.toString()).innerHTML = 
                    dropHolderIdentifier.getTypeOfElement() === 'hold' ?  
                                    config.getEddevDrags()[dragIdentifier.getGap()].getEddevDrag() : 
                                    capitaliseString(config.getDomGaps()[dropHolderIdentifier.getGap()].isCapitalise(),
                                                        config.getEddevDrags()[dragIdentifier.getGap()].getEddevDrag());
                                                        
            var dragHolderId = document.getElementById(dragIdentifier.toString()).parentElement.id;                                                        
                                                        
            // if dropping drag onto another drag
            if (event.target.innerHTML !== ""){
                // don't allow dropping ontop of drag that has draggable disabled
                if ($(event.target).attr('draggable') == "true"){
                    var dragSpanDomElement = $(event.target).closest('.drags')[0];
                    var dragHolderIdentifier = new scholarExtension.domElementIdentifier(dragHolderId);
                    var dragDroppedOnIdentifier = new scholarExtension.domElementIdentifier(dragSpanDomElement.id);
                    dragSpanDomElement.innerHTML = dragHolderIdentifier.getTypeOfElement() === 'hold' ?  
                                            config.getEddevDrags()[dragDroppedOnIdentifier.getGap()].getEddevDrag() : 
                                            capitaliseString(config.getDomGaps()[dragHolderIdentifier.getGap()].isCapitalise(), 
                                                                config.getEddevDrags()[dragDroppedOnIdentifier.getGap()].getEddevDrag());
                    document.getElementById(dragHolderId).appendChild(dragSpanDomElement);
                    document.getElementById(dropHolderIdentifier.toString()).appendChild(document.getElementById(dragIdentifier.toString()));
                    if (document.getElementById('input'+dragHolderId) !== null){
                        document.getElementById('input'+dragHolderId).value = config.getEddevDrags()[dragDroppedOnIdentifier.getGap()].getEddevDrag();
                        $('#input'+dragHolderId).change();
                    };
                }
                else {
                    return false;
                };
            }
            else {
                event.target.appendChild(document.getElementById(dragIdentifier.toString()));
                if (document.getElementById('input'+dragHolderId) !== null){
                    document.getElementById('input'+dragHolderId).value = "scholar";
                    $('#input'+dragHolderId).change();
                };
            };
            return true;
        }
        else {
            return false;
        };
    };
    
    /*
     * End text on drags - 1 to 1 and 1 to many drag to drop
     */

    /*
     * Start reorder drags
     */

    function createTextReorderDrags(config) {
        try {
            replaceGapInputBoxes(config);
        }
        catch (err) {
            var domErrorAsSpan = '<div><strong>There was an error creating the text reorder drags - ' + err + '</strong></div>';
            scholarExtension.clearPromptArea(config.getNumbasPart(), domErrorAsSpan);
        }
        finally {
            return '';
        };
    };

    function buildReorderDrags(config, gap, gapIndex, domInput) {
        var dragText = capitaliseString(config.getDomGaps()[gapIndex].isCapitalise(), 
                                         config.getEddevDrags()[gapIndex].getEddevDrag());
        gap.display.studentAnswer(dragText);//config.getEddevDrags()[gapIndex].getEddevDrag());
        
        gap.display.displayAnswer(capitaliseString(config.domGaps[gap.index].capitalise, gap.display.displayAnswer()));
        
        var domDragReorderElement = scholarExtension.spanObject();
        buildDragReorderElement(domDragReorderElement, gap, config);
        $(domInput).after($(domDragReorderElement).html(dragText));
        if (config.getDragsPerLine() > 0 && (gapIndex+1) % config.getDragsPerLine() === 0){
            var patternMatch = gap.question.display.html.find('.part.type-patternmatch')[gapIndex];
            $(patternMatch).after($('<br/>'));
        };
    };

    function buildDragReorderElement(domDragReorderElement, gap, config){
        var elementId = config.domGaps[gap.index].getGapId();
        $(domDragReorderElement).addClass('reorder_drags');
        $(domDragReorderElement).attr('data-bind', 'attr:{draggable: revealed() ? false : true}, html: revealed() ? displayAnswer:studentAnswer, ' +
                                        'style:{cursor: revealed() ? \'not-allowed\' : \'move\'}');
        $(domDragReorderElement).attr('id', elementId.toString());
        $(domDragReorderElement).css('width',config.getDragWidth());
        $(domDragReorderElement).css('height',config.getDragHeight());
        $(domDragReorderElement).on('dragstart',function(event) {
            event.stopPropagation();
            event.originalEvent.dataTransfer.effectAllowed = 'move';
            event.originalEvent.dataTransfer.setData('text', event.target.id);
        });
        $(domDragReorderElement).on('drop',function(event) {
            event.preventDefault();
            var dragId = event.originalEvent.dataTransfer.getData('text');
            var dragIdentifier = new scholarExtension.domElementIdentifier(dragId);
            // keeping drags within relevant part
            if(dragIdentifier.getQuestion() === elementId.getQuestion() && 
                    dragIdentifier.getPart() === elementId.getPart()){
                var drag = config.getEddevDrags()[dragIdentifier.getGap()].getEddevDrag();
                var capDrag = capitaliseString(config.getDomGaps()[elementId.getGap()].isCapitalise(),drag);
                var drop = config.getEddevDrags()[elementId.getGap()].getEddevDrag();
                var capDrop = capitaliseString(config.getDomGaps()[dragIdentifier.getGap()].isCapitalise(),drop);
                document.getElementById(dragIdentifier.toString()).innerHTML = capDrop;
                document.getElementById('input'+dragIdentifier.toString()).value = capDrop;
                $('#input'+dragIdentifier.toString()).change();
                document.getElementById(elementId.toString()).innerHTML = capDrag;
                gap.display.studentAnswer(capDrag);
                config.getEddevDrags()[dragIdentifier.getGap()].setEddevDrag(drop);
                config.getEddevDrags()[elementId.getGap()].setEddevDrag(drag);
            };
        });
        $(domDragReorderElement).on('dragover',function(event) {
            event.preventDefault();
            event.originalEvent.dataTransfer.dropEffect = 'move';
            return false;
        });
    };
    
    /*
     * End reorder drags
     */
    
    /*
     * Start image on drags - 1 to 1 drag to drop
     */
    
    function buildImageDragElement(domDragElement, domDragElementId, config){
        $(domDragElement).addClass('dragImage');
        $(domDragElement).attr('data-bind', 'attr:{draggable: revealed() ? \'false\' : \'true\'}, ' +
                                'style:{cursor: revealed() ? \'not-allowed\' : \'move\'}');
        $(domDragElement).attr('src', 'resources/question-resources/'+config.getEddevDrags()[domDragElementId.getGap()].getEddevDrag());
        $(domDragElement).attr('id', domDragElementId.toString());
        $(domDragElement).css('width',config.getDragWidth());
        $(domDragElement).css('height',config.getDragHeight());
        $(domDragElement).on('dragstart',function(event) {
            event.stopPropagation();
            event.originalEvent.dataTransfer.effectAllowed = 'move';
            event.originalEvent.dataTransfer.setData('text', event.target.id);
        });
    };

    function buildImageDragPlaceholder(domDragPlaceholderElement, pHElementId, config){
        buildDropZone(domDragPlaceholderElement, pHElementId, config);
        $(domDragPlaceholderElement).on('drop',function(event) {
            handleImageDrop(event, pHElementId, config);
        });
    };

    function buildImageDropZone(domDropBox, gap, config){
        var domDropElementId = config.domGaps[gap.index].getGapId();
        buildDropZone(domDropBox, domDropElementId, config);
        var domCorrectAnswerImageOpenTag = '\'<img draggable="false" style="width:' + config.getDragWidth() +'px; height:' + 
                                    config.getDragHeight() + 'px" src = "resources\/question-resources\/';
        var domCorrectAnswerImageCloseTag = '"></img>\'';
        $(domDropBox).attr('data-bind', 'html: revealed() ? ' + domCorrectAnswerImageOpenTag + 
                            gap.display.displayAnswer() + domCorrectAnswerImageCloseTag + ' : \'\'');
        
        $(domDropBox).on('drop',function(event) {
            if (handleImageDrop(event, domDropElementId)){
                gap.display.studentAnswer(this.childNodes[0].src.split('question-resources/')[1]);
            };
        });
    };
    
    function handleImageDrop(event, dropHolderIdentifier){
        event.preventDefault();
        var dragId = event.originalEvent.dataTransfer.getData('text');
        // keeping drags within relevant part        
        var dragIdentifier = new scholarExtension.domElementIdentifier(dragId);
        
        if(dragIdentifier.getQuestion() === dropHolderIdentifier.getQuestion() && dragIdentifier.getPart() === dropHolderIdentifier.getPart()){
            if (event.target.getAttribute('src') !== null){
                // don't allow dropping ontop of drag that has draggable disabled
		if ($(event.target).attr('draggable') == "true"){
                    var dragHolderId = document.getElementById(dragIdentifier.toString()).parentElement.id;
                    document.getElementById(dragHolderId).appendChild(event.target);
                    document.getElementById(dropHolderIdentifier.toString()).appendChild(document.getElementById(dragIdentifier.toString()));
                    if (document.getElementById('input'+dragHolderId) !== null){
                        document.getElementById('input'+dragHolderId).value = event.target.src.split('question-resources/')[1];
                        $('#input'+dragHolderId).change();
                    };
                }
		else {
                    return false;
		};
            }
            else {
                event.target.appendChild(document.getElementById(dragIdentifier.toString()));
            };
            return true;
        }
        else {
            return false;
        };
    };

    /*
     * End image on drags - 1 to 1 drag to drop
     */
    
    function capitaliseString(capitaliseGap, innerHTML){
        if (capitaliseGap !== undefined){
            return (capitaliseGap ? innerHTML.charAt(0).toUpperCase() + innerHTML.slice(1) : innerHTML);
        }
        else {
            return innerHTML;
        };
    };    
});
