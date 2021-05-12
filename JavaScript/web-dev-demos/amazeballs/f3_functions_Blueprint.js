// Maze generation (step 1/2: arrays)
//---------------------------------------------
// true => places been to / passed through
// false => places not been to / passed through
// create cells, vertical walls, and horizontal walls:
const createBlankMazeBlueprint = (rows, cols) => {
  const grid_ = Array(rows).fill(null).map( () => Array(cols).fill(false) );
  const verticals_ = Array(rows).fill(null).map( () => Array(cols-1).fill(false) );
  const horizontals_ = Array(rows-1).fill(null).map( () => Array(cols).fill(false) );
  return [grid_, verticals_, horizontals_];
};

const shuffle = (array) => {
  let counter = array.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  };
  return array;
};

const recursiveGridGenerationStep = (row, col) => {
  // If [row,col] was already visited, then done (with this step/process)
  if (grid[row][col]) return;
  // Mark cell as visted
  grid[row][col] = true;
  // Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row-1, col, 'up'],
    [row+1, col, 'down'],
    [row, col-1, 'left'],
    [row, col+1, 'right']
  ]);
  // For each neighbor...
  for (let neighbor of neighbors) {
    // ...as a proposed ("prop") next location...
    const [propRow, propCol, direction] = neighbor;
    // if that neighbor is out-of-bounds, don't move there (skip)
    if (propRow < 0 || propRow >= rows || propCol < 0 || propCol >= cols) {
      continue;
    }
    // or if neighbor is already visited, skip
    if (grid[propRow][propCol]) continue;
    // otherwise remove the appropriate wall to move to next cell
    if (direction === 'up')   horizontals[row-1][col] = true;
    if (direction === 'down') horizontals[row][col] = true;
    if (direction === 'left')  verticals[row][col-1] = true;
    if (direction === 'right') verticals[row][col] = true;
    recursiveGridGenerationStep(propRow, propCol);
    // Recursion will pull back to the next available option if the process
    // reaches a dead end. (What if pockets of unreachable "dead cells" may
    // be created? How does this code avoid that? Looks like it avoids it.)
  };
};

// Randomize starting cell location, then generate grid and walls arrays
const generateNewMazeBlueprint = (rows, cols, grid, verticals, horizontals) => {
  startingRow = Math.floor(rows*Math.random());
  startingCol = Math.floor(cols*Math.random());
  recursiveGridGenerationStep(startingRow, startingCol);
  return [grid, verticals, horizontals];
};


