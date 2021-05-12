// Game state
//---------------------------------------------
let isGameWon;


// Game control state
//---------------------------------------------
let isOpenState = {anyBox: false, infoBox: false, controlBox: false};


// Maze "blueprint" arrays
//---------------------------------------------
// grid is a tool to help build the blueprint, comprised of the other two
let grid, verticals, horizontals;


// Elements
//---------------------------------------------
const gameSpace = document.querySelector('.game-space');
const gameActionContainer = document.querySelector('.game-action-container');
const menuIcon = document.querySelector('.fa-bars');
const helpIcon = document.querySelector('.fa-info-circle');
const menu = document.querySelector('.menu-controls');
const help = document.querySelector('.help-info');
const input = document.querySelector('input');
const win = document.querySelector('.win-message');
const menuClose = document.querySelector('.menu-controls .fa-window-close');
const helpClose = document.querySelector('.help-info .fa-window-close');
const restart = document.querySelector('.restart');
const newGame = document.querySelector('.new-game');


// Style
//---------------------------------------------
const wallColor = getComputedStyle(document.documentElement).getPropertyValue('--wall-color');
const spriteColor = getComputedStyle(document.documentElement).getPropertyValue('--sprite-color');
const goalColor = getComputedStyle(document.documentElement).getPropertyValue('--goal-color');


// Maze, sprite/explorer, and goal properties
//---------------------------------------------
const marginStringPx = getComputedStyle(gameSpace).getPropertyValue('--margin');
const margin = parseInt(marginStringPx.slice(0, -2));
// canvas & maze:
const canvasWidth = window.innerWidth - 2 * margin; // 2 margins, left & right
const maxCanvasHeight = window.innerHeight - 2 * margin; // 2 margins, top & bottom
const f = 1/40; // boundary-body thickness-fraction, (boundaryThickness/canvasWidth)
const boundaryThickness = canvasWidth * f; // only half of thickness is visible
const boundaryWidth = canvasWidth + 2 * boundaryThickness; // xtra long to overlap
const mazeWidth = canvasWidth - boundaryThickness; // a full fraction f, half from each side
const maxMazeHeight = maxCanvasHeight * (1-f); // max, if maze fills "container"

const boundaryLabel = 'boundary';
const wallLabel = 'wall';
const spriteLabel = 'sprite';
const goalLabel = 'goal';
const labels = [spriteLabel, goalLabel];

const boundaryProperties = {
  label: boundaryLabel,
  isStatic: true,
  render: {fillStyle: wallColor}
};
const wallProperties = {
  label: wallLabel,
  render: {fillStyle: wallColor},
  isStatic: true,
  friction: 1,
  restitution: 1
};
const spriteProperties = {
  label: spriteLabel,
  render: {fillStyle: spriteColor}
};
const goalProperties = {
  label: goalLabel,
  isStatic: true,
  render: {fillStyle: goalColor}
};


const w = 0.05; // internal-wall thickness ratio, wrt cell size
const ratio = 0.75;  // sprite (& goal) object size ratio to cell size

let colsString = input.getAttribute('value'); // to take initial and later input
let cols = parseInt(colsString); // default initial html value; then player-controlled

let unit, rows, mazeHeight, canvasHeight, canvasInfo;
let boundaryHeight, boundaryInfo;
let wallThickness, wallLength, wallInfo;
let size, spriteInfo, goalInfo;

const setMazeDimensions = (cols) => {
  unit = mazeWidth/cols; // unit length of a square-shaped cell side
  rows = Math.floor(maxMazeHeight/unit); // maze may not vertically fill container
  mazeHeight = rows * unit; // draw a picture if you're not getting it
  canvasHeight = mazeHeight + boundaryThickness;
  canvasInfo = [canvasWidth, canvasHeight];

  boundaryHeight = canvasHeight + 2 * boundaryThickness; // ..at the corners
  boundaryInfo = [boundaryWidth, boundaryHeight, boundaryThickness, boundaryProperties];

  wallThickness = unit * w;
  wallLength = unit + wallThickness;
  wallInfo = [wallLength, wallThickness, wallProperties];

  size = ratio * unit;  // sprite object size/radius
  spriteInfo = [size, spriteProperties];
  goalInfo   = [size, goalProperties];
};

setMazeDimensions(cols);