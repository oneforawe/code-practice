const fs = require('fs')

const data = { hi: 'hello', bye: 'good-bye' }

const filename1 = 'write-to-file-compact.json'
const filename2 = 'write-to-file-readable.json'
const stringCompact  = JSON.stringify(data)
const stringReadable = JSON.stringify(data, null, 2)

fs.writeFileSync(filename1, stringCompact)
fs.writeFileSync(filename2, stringReadable)