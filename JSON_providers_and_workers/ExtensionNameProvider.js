//This class only returns the names of extensiosn
//at teh moment thsea are the ones aailable to the scholar project - may need to map these on to final names
//extension names go in the extension list for teh exam and also for each question

class ExtensionNameProvider {
    constructor() {
    }

    static getExtensionName(partType) {
        try {
            let json;

            switch (partType) {
                case 'scholar_sentence_reorder':
                    return 'sentence-reorder';
                    break;
                case 'scholar_self_marked_text':
                    return 'self-marked-text-beta';
                    break;
                case 'card-match':
                    return 'card-match-beta2';
                    break;
                case 'scholar_drop_in_bucket':
                    return 'drop-in-bucket';
                    break;
                case 'scholar_drag_1_2_1 ':
                    return 'scholar-drag-1-to-1';
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




}
export { ExtensionNameProvider };