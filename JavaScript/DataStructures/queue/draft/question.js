!function(){
  promptly = require('promptly');
  promptly.prompt('some question: ', function (err, answer) {
    console.log(answer);
    process.exit();
  });
}();