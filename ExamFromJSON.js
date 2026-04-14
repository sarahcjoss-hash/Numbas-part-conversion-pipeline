import {Exam} from "./domain/exam";
import {Question} from "./domain/question";
import {Part} from "./domain/part";
import {ManualMarkingPart} from "./domain/manualmarkingpart";
import {DragAndDropPart} from "./domain/draganddrop";
import {CardMatch} from "./domain/cardmatch";


class ExamFromJSON {
  constructor(jsonData) {
    this.data = jsonData;
  }

  // Add methods to process the JSON data as needed
}
export { ExamFromJSON as default };