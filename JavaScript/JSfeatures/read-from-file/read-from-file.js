const fs = require('fs')

filename = 'data.json'

const object = JSON.parse(fs.readFileSync(filename))

console.log(object)