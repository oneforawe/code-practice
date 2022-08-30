const fs = require('fs')

filename = 'data.json'

const data = fs.readFileSync(filename)
console.log('data from file reading:')
console.log(`typeof data = ${typeof data}`)
console.log('data:')
console.log(data)
console.log('')

// transform from buffer to string
const object = JSON.parse(fs.readFileSync(filename))
console.log('transformed data (using JSON.parse):')
console.log(`typeof object = ${typeof object}`)
console.log('object:')
console.log(object)
console.log('')

// NOTE FOR TYPESCRIPT:
// you must add the encoding
// const objectTS = JSON.parse(fs.readFileSync(filename, { encoding: 'utf8' }))
