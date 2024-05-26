'use strict';
import Swordsman from './swordsman.js';
import Sprite from './sprite.js';
import { kenshi, redKenshi } from './characters.js';
import { keys } from './inputCheck.js';
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const speed = 3;
const playerScale = 3.5;
const playerSize = { width: 90, height: 200 };
const velocity = { direction: 0, speed };

const background = new Sprite(
  context,
  { x: 0, y: -300 },
  { width: canvas.width, height: canvas.height },
  './images/Background.png',
  0.5
);
export const player1 = new Swordsman(
  context,
  { x: 200, y: 410 },
  { ...playerSize },
  { ...velocity },
  './images/Kenshi/stanceMiddleRight.png',
  playerScale,
  4,
  { x: 84 * playerScale, y: 70 * playerScale },
  { x: -45, y: 0 },
  kenshi
);

export const player2 = new Swordsman(
  context,
  { x: 1200, y: 410 },
  { ...playerSize },
  { ...velocity },
  './images/RedKenshi/stanceMiddleLeft.png',
  playerScale,
  8,
  { x: 90 * playerScale, y: 70 * playerScale },
  { x: 220, y: 0 },
  redKenshi
);

const checkRectangularCollision = (rect1, rect2) => {
  return (
    rect1.position.x + rect1.size.width >= rect2.position.x &&
    rect2.position.x + rect2.size.width >= rect1.position.x
  );
};

const animate = () => {
  window.requestAnimationFrame(animate);
  background.update();
  player1.update();
  player2.update();
  player1.velocity.direction = 0;
  player2.velocity.direction = 0;
  if (player1.direction === 1) {
    if (player1.isAttacking) {
      player1.changeSprite(`attack${player1.stance}Right`);
    } else {
      if (keys.a.isPressed && player1.lastKey === 'a') {
        player1.velocity.direction = -1;
        player1.changeSprite('runLeft');
      } else if (keys.d.isPressed && player1.lastKey === 'd') {
        player1.velocity.direction = 1;
        player1.changeSprite('runRight');
      } else {
        player1.changeSprite(`stance${player1.stance}Right`);
      }
    }
  } else {
    if (player1.isAttacking) {
      player1.changeSprite(`attack${player1.stance}Left`);
    } else {
      if (keys.a.isPressed && player1.lastKey === 'a') {
        player1.velocity.direction = -1;
        player1.changeSprite('runLeft');
      } else if (keys.d.isPressed && player1.lastKey === 'd') {
        player1.velocity.direction = 1;
        player1.changeSprite('runRight');
      } else {
        player1.changeSprite(`stance${player1.stance}Left`);
      }
    }
  }
  if (player2.direction === 1) {
    if (player2.isAttacking) {
      player2.changeSprite(`attack${player2.stance}Right`);
    } else {
      if (keys.arrowLeft.isPressed && player2.lastKey === 'arrowLeft') {
        player2.velocity.direction = -1;
        player2.changeSprite('runLeft');
      } else if (keys.arrowRight.isPressed && player2.lastKey === 'arrowRight') {
        player2.velocity.direction = 1;
        player2.changeSprite('runRight');
      } else {
        player2.changeSprite(`stance${player2.stance}Right`);
      }
    }
  } else {
    if (player2.isAttacking) {
      player2.changeSprite(`attack${player2.stance}Left`);
    } else {
      if (keys.arrowLeft.isPressed && player2.lastKey === 'arrowLeft') {
        player2.velocity.direction = -1;
        player2.changeSprite('runLeft');
      } else if (keys.arrowRight.isPressed && player2.lastKey === 'arrowRight') {
        player2.velocity.direction = 1;
        player2.changeSprite('runRight');
      } else {
        player2.changeSprite(`stance${player2.stance}Left`);
      }
    }
  }

  console.log(
    checkRectangularCollision(player1.attackCollision, player2.attackCollision),
    player1.isAttacking,
    player2.isAttacking
  );
  if (player1.framesCurrent === 3 && player2.framesCurrent === 3) {
    if (
      checkRectangularCollision(player1.attackCollision, player2.attackCollision) &&
      player1.isAttacking &&
      player2.isAttacking
    ) {
      console.log('Sword Clash!');
    }
    player1.isAttacking = false;
    player2.isAttacking = false;
  }
  if (player1.framesCurrent === 3) {
    if (
      checkRectangularCollision(player1.attackCollision, player2) &&
      player1.isAttacking &&
      !player2.isAttacking
    ) {
      console.log('player 1 hit');
    }
    player1.isAttacking = false;
  }
  if (player2.framesCurrent === 3) {
    if (
      checkRectangularCollision(player2.attackCollision, player1) &&
      player2.isAttacking &&
      !player1.isAttacking
    ) {
      console.log('player 2 hit');
    }
    player2.isAttacking = false;
  }

  if (player1.position.x < player2.position.x) {
    player1.direction = 1;
    player2.direction = -1;
  } else {
    player1.direction = -1;
    player2.direction = 1;
  }
  if (keys.f.isPressed) {
    player1.isCollisionSeen = true;
    player2.isCollisionSeen = true;
  } else {
    player1.isCollisionSeen = false;
    player2.isCollisionSeen = false;
  }
};

animate();
