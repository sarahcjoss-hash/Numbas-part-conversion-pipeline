/*class ReportWriter {
  constructor() {
    this.report = '';
    console.log('Config loaded successfully:', config);
  let reportString = "Exam file report: ${config.name}\n"

  reportString += `Number of questions: ${questions.length}\n\n`
  reportString += questions.map((q, i) => {
    console.log(q)
    let questionString = `Question ${i} : ${q.name}\n Tags ${q.tags} \nExtensions ${q.extensions}\n\n`;

    questionString += `Number of parts : ${parts.length}\n`;
    questionString += parts.map((p, i) => {

      //to do
      //pull out the drag and drop values
      //this will include having to find the varaible name and then get teh varaible values
      let partString = `Part ${i}: type ${p.type} `;
      partString += mmFlag ? 'manual marking\n' : '\n';
      partString += ddFlag ? 'drag and drop\n' : '\n';
      partString += mmFlag || ddFlag ? ` ${prompt}\n` : '';
      try {
        if (mmFlag) {

          partString += `builder ${builder}, width ${width}, height ${height}\n`;
          partString += `Marks:${gap.marks} Answer ${gap.displayAnswer}\n`

        }
        if (ddFlag) {

          partString += `SETTINGS number of gaps ${numberOfGaps} : builder: ${builder}, width: ${width}, height: ${height}\n`;
          partString += `drag values ${dragValues}\n`
          partString += p.gaps.map((g, i) => {
            return `Gap ${i}: answer ${g.answer} Marks: ${g.marks}\n`
          });

        }
      } catch (err) {
        console.log(`unable to get inforamtion for custom part type ${err.message}`);
        partString += "UNABLE TO GET PART INFORMATION"
      }

      partString += `\n`;
      return partString;
    });
    questionString += `\n-------------------------------------\n`
    return questionString;
  }

  addLine(line) {
    this.report += line + '\n';
  }

  getReport() {
    return this.report;
  }
}*/