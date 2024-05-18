'use strict';
import Swordsman from './swordsman.js';
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const speed = 3;
const playerSize = { width: 100, height: 200 };
const velocity = { direction: 0, speed };

const player1 = new Swordsman(
  context,
  { x: canvas.width / 6, y: canvas.height - canvas.height / 3 },
  { ...playerSize },
  { ...velocity }
);

const player2 = new Swordsman(
  context,
  { x: canvas.width - canvas.width / 6, y: canvas.height - canvas.height / 3 },
  { ...playerSize },
  { ...velocity }
);

const keys = {
  a: {
    isPressed: false
  },
  d: {
    isPressed: false
  },
  arrowLeft: {
    isPressed: false
  },
  arrowRight: {
    isPressed: false
  }
};
const animate = () => {
  window.requestAnimationFrame(animate);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  player1.update();
  player2.update();
  player1.velocity.direction = 0;
  player2.velocity.direction = 0;

  if (keys.a.isPressed && player1.lastKey === 'a') {
    player1.velocity.direction = -1;
  } else if (keys.d.isPressed && player1.lastKey === 'd') {
    player1.velocity.direction = 1;
  }

  if (keys.arrowLeft.isPressed && player2.lastKey === 'arrowLeft') {
    player2.velocity.direction = -1;
  } else if (keys.arrowRight.isPressed && player2.lastKey === 'arrowRight') {
    player2.velocity.direction = 1;
  }

  if (
    player1.attackCollision.position.x + player1.attackCollision.size.width >= player2.position.x &&
    player1.attackCollision.position.x < player2.position.x + player2.size.width &&
    player1.isAttacking
  ) {
    player1.isAttacking = false;
    console.log('player 1 hit');
  }

  if (
    player2.attackCollision.position.x + player2.attackCollision.size.width >= player1.position.x &&
    player2.attackCollision.position.x < player1.position.x + player1.size.width &&
    player2.isAttacking
  ) {
    player2.isAttacking = false;
    console.log('player 2 hit');
  }

  if (player1.position.x < player2.position.x) {
    player1.direction = 1;
    player2.direction = -1;
  } else {
    player1.direction = -1;
    player2.direction = 1;
  }
};

animate();

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'a':
      keys.a.isPressed = true;
      player1.lastKey = 'a';
      break;
    case 'd':
      keys.d.isPressed = true;
      player1.lastKey = 'd';
      break;
    case 'ArrowLeft':
      keys.arrowLeft.isPressed = true;
      player2.lastKey = 'arrowLeft';
      break;
    case 'ArrowRight':
      keys.arrowRight.isPressed = true;
      player2.lastKey = 'arrowRight';
      break;
    case ' ':
      player1.attack();
      break;
    case 'z':
      player2.attack();
      break;
  }
});
document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a':
      keys.a.isPressed = false;
      break;
    case 'd':
      keys.d.isPressed = false;
      break;
    case 'ArrowLeft':
      keys.arrowLeft.isPressed = false;
      break;
    case 'ArrowRight':
      keys.arrowRight.isPressed = false;
      break;
  }
});
