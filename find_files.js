const fs = require('node:fs');
const folderName = 'C:\\test_numbas_exam_files';
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }else{
    console.log(fs.readdirSync(folderName));
  }
} catch (err) {
  console.error(`${err} error finding files in folder`);
}