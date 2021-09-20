module.exports = {
  forEach(arr, func) {
    //for (let i = 0; i < array.length; i++) {
    //  function(array[i], i);
    //};
    for (let index in arr) {
      func(arr[index], index)
    }
  },
  map(arr, func) {
    let result = []
    for (let value of arr) {
      result.push(func(value))
    };
    return result;
  }
}