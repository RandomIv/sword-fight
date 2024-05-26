'use strict';
import Swordsman from './swordsman.js';
import Sprite from './sprite.js';
import { kenshi, redKenshi } from './characters.js';
import { keys } from './inputCheck.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const endGameText = document.getElementById('endGameText');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let isGameOver = false;
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
const checkRectangularCollision = (rect1, rect2) => {
  return (
    rect1.position.x + rect1.size.width >= rect2.position.x &&
    rect2.position.x + rect2.size.width >= rect1.position.x
  );
};
const playerMovement = (player) => {
  player.velocity.direction = 0;
  const lastKey = player.lastKey;
  const stance = player.stance;
  const direction = player.direction;
  if (player.isDead) {
    player.changeSprite(`death${direction}`);
    if (player.framesCurrent === player.framesMax - 1) {
      isGameOver = true;
    }
  } else if (player.isAttacking) {
    player.changeSprite(`attack${stance}${direction}`);
  } else {
    if ((lastKey === 'a' || lastKey === 'arrowLeft') && keys[lastKey].isPressed) {
      player.velocity.direction = -1;
      player.changeSprite('runLeft');
    } else if ((lastKey === 'd' || lastKey === 'arrowRight') && keys[lastKey].isPressed) {
      player.velocity.direction = 1;
      player.changeSprite('runRight');
    } else {
      player.changeSprite(`stance${stance}${direction}`);
    }
  }
};

const checkDirectionOfPlayers = () => {
  if (player1.position.x < player2.position.x) {
    player1.direction = 'Right';
    player2.direction = 'Left';
  } else {
    player1.direction = 'Left';
    player2.direction = 'Right';
  }
};

const checkHit = (player1, player2) => {
  if (
    checkRectangularCollision(player1.attackCollision, player2) &&
    player1.isAttacking &&
    !player2.isAttacking &&
    player1.framesCurrent === 3
  ) {
    player2.takeHitBy(player1);
  }
};
const checkSwordsCollisions = () => {
  if (
    checkRectangularCollision(player1.attackCollision, player2.attackCollision) &&
    player1.isAttacking &&
    player2.isAttacking &&
    player1.framesCurrent === 2 &&
    player2.framesCurrent === 2
  ) {
    console.log('Sword Clash!');
  }
  checkHit(player1, player2);
  checkHit(player2, player1);
  if (player1.framesCurrent === 3) {
    player1.isAttacking = false;
  }

  if (player2.framesCurrent === 3) {
    player2.isAttacking = false;
  }
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
