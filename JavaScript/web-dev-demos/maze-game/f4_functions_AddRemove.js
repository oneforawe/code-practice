// Adding and Removing bodies from the world


const buildBoundaries = (world, canvasWidth, canvasHeight, boundaryInfo) => {
  [bW, bH, bT, bProperties] = boundaryInfo;
  const boundaries = [
    // horizontal boundary, top:
    Bodies.rectangle(canvasWidth/2, 0,              bW, bT, bProperties),
    // horizontal boundary, bottom:
    Bodies.rectangle(canvasWidth/2, canvasHeight,   bW, bT, bProperties),
    // vertical boundary, left:
    Bodies.rectangle(0, canvasHeight/2,             bT, bH, bProperties),
    // vertical boundary, right:
    Bodies.rectangle(canvasWidth, canvasHeight/2,   bT, bH, bProperties),
  ];
  World.add(world, boundaries);
};

const buildWalls = (world, verticals, horizontals, unit, boundaryInfo, wallInfo) => {
  [wL, wT, wProperties] = wallInfo;
  bT = boundaryInfo[2];
  // Create vertical internal walls
  verticals.forEach((row, rowIndex) => {
    row.forEach((passage, colIndex) => {
      if (passage) return; // (col=true => passage => do not create a wall)
      const x = bT/2 + unit * (1 + colIndex);
      const y = bT/2 + unit * (0.5 + rowIndex);
      const wall = Bodies.rectangle(x, y, wT, wL, wProperties);
      World.add(world, wall);
    });
  });
  // Create horizontal internal walls
  horizontals.forEach((row, rowIndex) => {
    row.forEach((passage, colIndex) => {
      if (passage) return; // (col=true => passage => do not create a wall)
      const x = bT/2 + unit * (0.5 + colIndex);
      const y = bT/2 + unit * (1 + rowIndex);
      const wall = Bodies.rectangle(x, y, wL, wT, wProperties);
      World.add(world, wall);
    });
  });
};


const placeSprite = (world, boundaryThickness, unit, spriteInfo) => {
  [size_, spriteProperties_] = spriteInfo;
  // Sprite starts in the top left corner:
  startingX = boundaryThickness/2 + unit * 0.5;
  startingY = boundaryThickness/2 + unit * 0.5;
  const sprite_ = Bodies.circle(startingX, startingY, size_/2, spriteProperties_);
  World.add(world, sprite_);
  return sprite_;
};

const placeGoal = (world, canvasInfo, boundaryInfo, unit, goalInfo) => {
  [size_, goalProperties_] = goalInfo;
  [canvasWidth_, canvasHeight_] = canvasInfo;
  boundaryThickness_ = boundaryInfo[2];
  // Goal is in the bottom right corner:
  goalX = canvasWidth_ - boundaryThickness_/2 - unit * 0.5;
  goalY = canvasHeight_ - boundaryThickness_/2 - unit * 0.5;
  const goal_ = Bodies.circle(goalX, goalY, size_/2, goalProperties_);
  World.add(world, goal_);
  return goal_;
};

const removeBodies = (world, bodyLabel) => {
  // for all world object, find the walls
  const imax = world.bodies.length - 1;
  for (let i=imax; i>0; i--) {
    body = world.bodies[i];
    // and remove each wall
    if (body.label == bodyLabel) World.remove(world, body);
  };
};

