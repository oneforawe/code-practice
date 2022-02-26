const fs = require('fs')

filename = 'data.csv'

const data = fs.readFileSync(filename)
console.log('data from file reading:')
console.log(`typeof data = ${typeof data}`)
console.log('data:')
console.log(data)
console.log('')

// transform from buffer to string
const string = fs.readFileSync(filename).toString()
console.log('transformed data (using toString):')
console.log(`typeof string = ${typeof string}`)
console.log('string:')
console.log(string)
console.log('')