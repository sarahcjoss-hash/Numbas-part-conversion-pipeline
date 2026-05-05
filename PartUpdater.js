class PartUpdater {
    constructor() {

    }
    convertPart(part) {
        let partToConvert = part;
        let newPart = part;
        const type = partToConvert.type;
        switch (type) {
            case "drag_and_drop":
               newPart = this.convertToDragAndDrop(this.partToConvert);
                break;
            case "card_match":
                newPart = new CardMatch(this.partToConvert.number);
                break;
            case "manual_marking":
                newPart = new ManualMarkingPart(this.partToConvert.number);
                break;
            default:
                console.log(`no conversion for part type ${type}`);

        }
        return newPart;
    }

    convertToDragAndDrop(oldPart){
         const dndSubType = oldPart.newPartTypeMatch;
         const prompt = oldPart.prompt;
         const targetText = oldPart.convertedPrompt;
         
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