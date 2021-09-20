const validationItems = [
  //         target,  array "nums"
  { input: [   11,    [],               ], retVal: null  },
  { input: [   11,    [5],              ], retVal: null  },
  { input: [   11,    [11],             ], retVal: null  },
  { input: [   0,     [1,2,3],          ], retVal: null  },
  { input: [   11,    [1,2,3],          ], retVal: null  },
  { input: [   11,    [6,4,9,3,2],      ], retVal: [2,4] },
  { input: [   25,    [6,3,2,14,7,9,11] ], retVal: [3,6] },
  { input: [   9,     [2,7,11,15],      ], retVal: [0,1] },
  { input: [   6,     [3,2,4],          ], retVal: [1,2] },
  { input: [   6,     [3,3],            ], retVal: [0,1] },
]

module.exports = validationItems