'use strict';
import Swordsman from './swordsman.js';
import Sprite from './sprite.js';
import { kenshi, redKenshi } from './characters.js';
import { keys } from './inputCheck.js';
import { checkSwordsCollisions } from './collisions.js';
import { playerMovement, checkDirectionOfPlayers } from './playerMovement.js';
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const endGameText = document.getElementById('endGameText');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
export let isGameOver = false;
const speed = 3;
const playerScale = 3.5;
const playerSize = { width: 90, height: 200 };
const playerOffset = { x: 87 * playerScale, y: 70 * playerScale };
const velocity = { direction: 0, speed };
const attackCollisionOffsetRight = { x: -40, y: 0 };
const attackCollisionOffsetLeft = { x: 210, y: 0 };
export let player1;
export let player2;
const background = new Sprite(
  context,
  { x: 0, y: -300 },
  { width: canvas.width, height: canvas.height },
  './images/Background.png',
  0.5
);
const newGame = () => {
  endGameText.style.display = 'none';
  isGameOver = false;
  player1 = new Swordsman(
    context,
    { x: 200, y: 410 },
    { ...playerSize },
    { ...velocity },
    './images/Kenshi/stanceMiddleRight.png',
    playerScale,
    4,
    { ...playerOffset },
    attackCollisionOffsetRight,
    attackCollisionOffsetLeft,
    kenshi
  );
  player2 = new Swordsman(
    context,
    { x: 1200, y: 410 },
    { ...playerSize },
    { ...velocity },
    './images/RedKenshi/stanceMiddleLeft.png',
    playerScale,
    8,
    { ...playerOffset },
    attackCollisionOffsetRight,
    attackCollisionOffsetLeft,
    redKenshi
  );
};

const gameOver = () => {
  endGameText.style.display = 'block';
  endGameText.innerText = `${player1.isDead ? 'Player 2' : 'Player 1'}  has won! 
  Press 'r' to restart`;
};

const animate = () => {
  window.requestAnimationFrame(animate);
  background.update();

  if (!isGameOver) {
    player1.update();
    player2.update();
    playerMovement(player1);
    playerMovement(player2);
  }

  checkSwordsCollisions();
  checkDirectionOfPlayers();

  if (isGameOver) {
    gameOver();
  }

  if (keys.r.isPressed) {
    newGame();
  }
};
newGame();
animate();
