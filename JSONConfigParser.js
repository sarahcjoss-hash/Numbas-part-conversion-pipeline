class JSONConfigParser {
    //read the file
    //parse the JSON and return it as an object
    //this is really just a wrapper for the readConfigFile function but it allows us to have a more object oriented approach and also to have the option of adding more functionality to this class later if we need to
    constructor(filename, callback) {
        this.filename = filename; 
        this.callback = callback;
        readConfigFile(filename, callback);

    }

    parseThisJSON(json, callback) {
  // Process data if no error
  try {
    const parsedJSON = JSON.parse(json);
    callback(null, parsedJSON);
  } catch (parseError) {
    callback(new Error(`Invalid JSON `));
  }

}



}


const fs = require('fs');




// Usage
readConfigFile('source.exam', (err, config) => {
  if (err) {
    console.error('Failed to read config:', err.message);
    // Handle the error (e.g., use default config)
    return;
  }
  console.log('Config loaded successfully:', config);
  let reportString = "Exam file report: ${config.name}\n"
  const extensionNames = ['manual_marking', 'drag_and_drop'];//can replace with a list later to match any of
  const qGroups = config.question_groups;
  const questions = qGroups.map(qg => qg.questions).flat();//need flat here as the questions are themselves an array
  reportString += `Number of questions: ${questions.length}\n\n`
  reportString += questions.map((q, i) => {
    console.log(q)
    let questionString = `Question ${i} : ${q.name}\n Tags ${q.tags} \nExtensions ${q.extensions}\n\n`;
    const parts = q.parts;
    questionString += `Number of parts : ${parts.length}\n`;
    questionString += parts.map((p, i) => {
      const prompt = p.prompt;
      const mmFlag = prompt.match('manualmarking_builder') ? true : false;
      const ddFlag = prompt.match('dnd_builder') ? true : false;
      //to do
      //pull out the drag and drop values
      //this will include having to find the varaible name and then get teh varaible values
      let partString = `Part ${i}: type ${p.type} `;
      partString += mmFlag ? 'manual marking\n' : '\n';
      partString += ddFlag ? 'drag and drop\n' : '\n';
      partString += mmFlag || ddFlag ? ` ${prompt}\n` : '';
      try {
        if (mmFlag) {
          const builder = /manualmarking_builder\(.+?\)/.exec(prompt);
          const width = /manualmarking_textarea_width\(.+?\)/.exec(prompt);
          const height = /manualmarking_textarea_height\(.+?\)/.exec(prompt);
          const gap = p.gaps[0];
          partString += `builder ${builder}, width ${width}, height ${height}\n`;
          partString += `Marks:${gap.marks} Answer ${gap.displayAnswer}\n`

        }
        if (ddFlag) {
          const numberOfGaps = p.gaps.length;
          const variables = q.variables;
          console.log("VARIABLES" + q.variables)
           const builder = /dnd_builder\(.+?\)/.exec(prompt);
           const dragsVariableName = /drags_./.exec(builder);
           const dragValues = variables[dragsVariableName].definition;
          const width = /dnd_dragHeight\(.+?\)/.exec(prompt);
          const height = /dnd_dragWidth\(.+?\)/.exec(prompt);
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
  });

  //console.log(reportString);
  fs.writeFile('C:/work/numbas_node_part_updater/test.txt', reportString, err => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
})

/*const matchingQuestions = qGroups.map(qg => qg.questions.filter(q => q.extensions.includes('manual_marking')));
const flatMatches = matchingQuestions.flat();
const q1 = flatMatches[0];*/











