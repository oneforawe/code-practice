const validationItems = [
  //          s,             k
  { input: [ 'a',            1 ], retVal: 'a'            },
  { input: [ 'halpy',        1 ], retVal: 'alpyh'        },
  { input: [ 'halpy',        2 ], retVal: 'ahlpy'        },
  { input: [ 'fcczcccabgab', 1 ], retVal: 'abfcczcccabg' },
  { input: [ 'fcczcccabgab', 2 ], retVal: 'aabbcccccfgz' },
  { input: [ 'abzabc',       1 ], retVal: 'abcabz'       },
  { input: [ 'abzabc',       2 ], retVal: 'aabbcz'       },
]

module.exports = validationItems