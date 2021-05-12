/*
code: JavaScript

purpose:

This file generates and operates a single-player 2-dimensional maze-game web
app, with a sprite / explorer that the player controls by keyboard.

The goal is to start from one side of the maze, traverse the maze to the other
side and touch a "goal object".

The maze is constructed using a rectangular grid of square-shaped cells, in
rows and columns, with each cell about the size of the explorer (a bit larger
to contain it), and walls placed / generated at some of the cell boundaries (in
a partly-randomized process.)

vocabulary:

As game-playing display screens are usually oriented vertically, facing the
player,
"vertical" refers to the "up-and-down" direction of the screen, and
"horizontal" refers to the "left-and-right" direction of the screen.

files:

This file works as part of a file-file set:
index.html, style.css, variables.js, functions.js, index.js

*/


// JavaScript files to be executed first
//---------------------------------------------
// variables.js
// functions.js


// Build backend
//---------------------------------------------
// Create maze arrays / "blueprints"
[grid, verticals, horizontals] = createBlankMazeBlueprint(rows, cols);
[grid, verticals, horizontals] = generateNewMazeBlueprint(rows, cols, grid, verticals, horizontals);


// Initialize canvas and ~physics/world
//---------------------------------------------
const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;
const engine = Engine.create();
engine.world.gravity.y = 0;
const {world} = engine;
const render = Render.create({
  element: gameActionContainer,
  engine: engine,
  options: {
    width: canvasWidth,
    height: canvasHeight,
    wireframes: false
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

const canvas = document.querySelector('canvas');


// Build maze
//---------------------------------------------
buildBoundaries(world, canvasWidth, canvasHeight, boundaryInfo);


buildWalls(world, verticals, horizontals, unit, boundaryInfo, wallInfo);
let sprite = placeSprite(world, boundaryThickness, unit, spriteInfo);
let goal = placeGoal(world, canvasInfo, boundaryInfo, unit, goalInfo);

