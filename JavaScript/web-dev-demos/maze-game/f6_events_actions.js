// Enable keyboard-control of sprite motion and other key actions
//---------------------------------------------
document.addEventListener('keydown', (event) => {
  const {x: vX, y: vY} = sprite.velocity;
  const velIncrement = 3;
  if (event.key === 'Down' || event.key === 'ArrowDown' || event.key === 'j') {
    Body.setVelocity(sprite, {x: vX, y: vY + velIncrement});
  };
  if (event.key === 'Up' || event.key === 'ArrowUp' || event.key === 'k') {
    Body.setVelocity(sprite, {x: vX, y: vY - velIncrement});
  };
  if (event.key === 'Left' || event.key === 'ArrowLeft' || event.key === 'h') {
    Body.setVelocity(sprite, {x: vX - velIncrement, y: vY});
  };
  if (event.key === 'Right' || event.key === 'ArrowRight' || event.key === 'l') {
    Body.setVelocity(sprite, {x: vX + velIncrement, y: vY});
  };
  if (event.key === 'c') {
    toggleBox(menu, help);
  };
  if (event.key === 'i') {
    toggleBox(help, menu);
  };
  if (isOpenState.anyBox) {
    if (event.key === 'x' || event.key === 'Escape') {
      if (isOpen(help)) closeBox(help);
      if (isOpen(menu)) closeBox(menu);
    };
    if (event.key === 'Enter') {
      if (document.activeElement === helpClose) closeBox(help);
      if (document.activeElement === menuClose) closeBox(menu);
    };
  };
});


// Box actions (by click here, by keys above)
//---------------------------------------------
menuClose.addEventListener('click', (event) => {
  closeBox(menu);
});
helpClose.addEventListener('click', (event) => {
  closeBox(help);
});

const toggleBox = (primary, secondary) => {
  // Show menu (if not already shown), or hide menu (if already shown).
  if (isOpen(secondary)) closeBox(secondary);
  if (isOpen(primary)) closeBox(primary);
  else openBox(primary);
};

menuIcon.addEventListener('click', (event) => {
  toggleBox(menu, help);
});
helpIcon.addEventListener('click', (event) => {
  toggleBox(help, menu);
});


// Game-control actions
//---------------------------------------------
const turnOnGravity = () => {
  world.gravity.y = 1;
};
const turnOffGravity = () => {
  world.gravity.y = 0;
};
const releaseWalls = () => {
  world.bodies.forEach((body) => {
    if (body.label === 'wall') Body.setStatic(body, false);
  });
};

const onWin = () => {
  isGameWon = true;
  turnOnGravity();
  releaseWalls();
  displayWinMessage();
};

const restartGame = (verticals, horizontals) => {
  if (isGameWon) {
    turnOffGravity();
    removeWinMessage();
  }
  removeBodies(world, spriteLabel);
  removeBodies(world, goalLabel);
  removeBodies(world, wallLabel);
  removeBodies(world, boundaryLabel);
  resizeCanvas(canvasHeight);
  buildWalls(world, verticals, horizontals, unit, boundaryInfo, wallInfo);
  buildBoundaries(world, canvasWidth, canvasHeight, boundaryInfo);
  sprite = placeSprite(world, boundaryThickness, unit, spriteInfo);
  goal = placeGoal(world, canvasInfo, boundaryInfo, unit, goalInfo);
  isGameWon = false;
  return [verticals, horizontals];
};

const startNewGame = () => {
  [grid, verticals, horizontals] = createBlankMazeBlueprint(rows, cols);
  [grid, verticals, horizontals] = generateNewMazeBlueprint(rows, cols, grid, verticals, horizontals);
  return restartGame(verticals, horizontals);
};

const resizeCanvas = (h_) => {
  gameActionContainer.style.height = `"${h_}px"`;
  canvas.setAttribute('height', `${h_}`);
};


// Control listeners...
//---------------------------------------------
// Restart:
restart.addEventListener('click', (event) => {
  restartGame(verticals, horizontals);
});
// Start new:
newGame.addEventListener('click', (event) => {
  [verticals, horizontals] = startNewGame();
});
// Complexity (resize maze):
input.addEventListener('keydown', (event) => {
  // other game-control key actions
  let changeCols = false;
  let proposedCols;
  if (event.key === 'Enter') {
    proposedCols = input.value;
    proposedCols = parseInt(proposedCols);
    if (proposedCols === NaN) return;
    else {
      proposedCols = forceIntoRange(proposedCols);
      changeCols = true;
    };
  };
  if (changeCols === true) {
    cols = proposedCols;
    setMazeDimensions(cols);
    startNewGame();
  };
});

const forceIntoRange = (num) => {
  if (num < 3) return 3;
  else if (num > 50) return 50;
  else return num;
};


// Trigger game completion at contact with goal
//---------------------------------------------
Events.on(engine, 'collisionStart', (event) => {
  event.pairs.forEach((collision) => {
    if (labels.includes(collision.bodyA.label)
      && labels.includes(collision.bodyB.label)) {
      onWin();
    };
  });
});
