const randInt = (max) => {
  // return a pseudo-random integer between zero and max, inclusive ([0, max])
  return Math.round(Math.random() * max);
};

export default randInt;