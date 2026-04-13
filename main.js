const fs = require('fs');
console.log('Before file read');
fs.readFile('example.exam', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File contents:', data);
});
console.log('After file read');
//find files in folder
//queue them
//open file
//second second line to parseJson
//take the result and create a report
//get a list of the parts that need to be converted
//create an interface?
//process and add to the new part type
//sub th part type into a file