const fs = require('fs');

const filename = './file.csv';


function transformCSVtoArray (CSVfilename) {
  const CSVstring = fs.readFileSync(CSVfilename).toString();
  console.log('\n\nIntermediate step 1:\n');
  console.log(CSVstring);

  const CSVarray = CSVstring.split('\n');
  console.log('\n\nIntermediate step 2:\n');
  console.log(CSVarray);

  let array = [];
  for (let i = 0; i < CSVarray.length; i++) {
    const newRow = CSVarray[i].split(',');
    array.push(newRow);
  }
  console.log('\n\nFinal step:\n');
  console.log(array);
}

transformCSVtoArray(filename);