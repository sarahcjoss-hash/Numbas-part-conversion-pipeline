class PartUpdater {
    constructor(old) {
        this.partToConvert = old;
        this.newCustomPartModel;
        this.newPart;
    }
    convertPart() {
        const type = this.partToConvert.type;
        switch (type) {
            case "drag_and_drop":
               this.newPart = this.convertToDragAndDrop(this.partToConvert);
                break;
            case "card_match":
                this.newPart = new CardMatch(this.partToConvert.number);
                break;
            case "manual_marking":
                this.newPart = new ManualMarkingPart(this.partToConvert.number);
                break;
            default:
                console.log(`no conversion for part type ${type}`);

        }
    }

    convertToDragAndDrop(oldPart){
         const dndSubType = oldPart.builder.builderType;
         const prompt = oldPart.prompt;
         const targetText = this.convertOldDnDPromptToTargetText(prompt);
         
                switch (dndSubType) {
                    case "1-2-1":
                        //
                        break;
                    case "bucket":
                    default:
                        console.log(`no conversion for drag_and_drop sub-type ${dndSubType}`);
                }

        return this.newPart;
    }
    convertOldDnDPromptToTargetText(oldPrompt){
        return oldPrompt.replace(/%\[targets\]%/g, "%[targets]%").replace(/%\[your item here\]%/g, "%[your item here]%");
    }
}