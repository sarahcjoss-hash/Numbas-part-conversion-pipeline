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
                const dndSubType = this.partToConvert.builder.builderType;
                switch (dndSubType) {
                    case "1-2-1":
                        this.newPart = new DragAndDropPart(this.partToConvert.number);
                        break;
                    case "bucket":
                    default:
                        console.log(`no conversion for drag_and_drop sub-type ${dndSubType}`);
                }
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
}