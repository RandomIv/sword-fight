'use strict';
import Swordsman from './swordsman.js';
import Sprite from './sprite.js';
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const speed = 3;
const playerSize = { width: 20, height: 200 };
const velocity = { direction: 0, speed };

const background = new Sprite(
  context,
  { x: 0, y: -100 },
  { width: canvas.width, height: canvas.height },
  './images/Background.png',
  0.4
);
const player1 = new Swordsman(
  context,
  { x: 0, y: 330 },
  { ...playerSize },
  { ...velocity },
  './images/player1/IdleRight.png',
  3,
  4,
  { x: 80, y: 70 },
  {
    idleRight: {
      imageSrc: './images/player1/IdleRight.png',
      framesMax: 4
    },
    idleLeft: {
      imageSrc: './images/player1/IdleLeft.png',
      framesMax: 4
    },
    runRight: {
      imageSrc: './images/player1/RunRight.png',
      framesMax: 8
    },
    runLeft: {
      imageSrc: './images/player1/RunLeft.png',
      framesMax: 8
    },
    attackRight1: {
      imageSrc: './images/player1/AttackRight1.png',
      framesMax: 4
    },
    attackLeft1: {
      imageSrc: './images/player1/AttackLeft1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './images/player1/TakeHit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './images/player1/Death.png',
      framesMax: 7
    }
  }
);

const player2 = new Swordsman(
  context,
  { x: 1000, y: 330 },
  { ...playerSize },
  { ...velocity },
  './images/player2/IdleLeft.png',
  3,
  8,
  { x: 80, y: 70 },
  {
    idleRight: {
      imageSrc: './images/player2/IdleRight.png',
      framesMax: 4
    },
    idleLeft: {
      imageSrc: './images/player2/IdleLeft.png',
      framesMax: 4
    },
    runRight: {
      imageSrc: './images/player2/RunRight.png',
      framesMax: 8
    },
    runLeft: {
      imageSrc: './images/player2/RunLeft.png',
      framesMax: 8
    },
    attackRight1: {
      imageSrc: './images/player2/AttackRight1.png',
      framesMax: 4
    },
    attackLeft1: {
      imageSrc: './images/player2/AttackLeft1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './images/player2/TakeHit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './images/player2/Death.png',
      framesMax: 7
    }
  }
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

const checkRectangularCollision = (rect1, rect2) => {
  return (
    rect1.position.x + rect1.size.width >= rect2.position.x &&
    rect2.position.x + rect2.size.width >= rect1.position.x
  );
};
const animate = () => {
  window.requestAnimationFrame(animate);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player1.update();
  player2.update();
  player1.velocity.direction = 0;
  player2.velocity.direction = 0;

  if (player1.isAttacking) {
    if (player1.direction === 1) {
      player1.changeSprite('attackRight1');
    } else {
      player1.changeSprite('attackLeft1');
    }
    return;
  } else {
    if (keys.a.isPressed && player1.lastKey === 'a') {
      player1.velocity.direction = -1;
      player1.changeSprite('runLeft');
    } else if (keys.d.isPressed && player1.lastKey === 'd') {
      player1.velocity.direction = 1;
      player1.changeSprite('runRight');
    } else {
      if (player1.direction === 1) {
        player1.changeSprite('idleRight');
      } else {
        player1.changeSprite('idleLeft');
      }
    }
  }

  if (player2.isAttacking) {
    if (player2.direction === 1) {
      player2.changeSprite('attackRight1');
    } else {
      player2.changeSprite('attackLeft1');
    }
    return;
  } else {
    if (keys.arrowLeft.isPressed && player2.lastKey === 'arrowLeft') {
      player2.velocity.direction = -1;
      player2.changeSprite('runLeft');
    } else if (keys.arrowRight.isPressed && player2.lastKey === 'arrowRight') {
      player2.velocity.direction = 1;
      player2.changeSprite('runRight');
    } else {
      if (player2.direction === 1) {
        player2.changeSprite('idleRight');
      } else {
        player2.changeSprite('idleLeft');
      }
    }
  }

  console.log(
    checkRectangularCollision(player1.attackCollision, player2.attackCollision),
    player1.isAttacking,
    player2.isAttacking
  );

  if (
    checkRectangularCollision(player1.attackCollision, player2.attackCollision) &&
    player1.isAttacking &&
    player2.isAttacking
  ) {
    player1.isAttacking = false;
    player2.isAttacking = false;
    console.log('Sword Clash!');
  } else if (
    checkRectangularCollision(player1.attackCollision, player2) &&
    player1.isAttacking &&
    !player2.isAttacking
  ) {
    player1.isAttacking = false;
    console.log('player 1 hit');
  } else if (
    checkRectangularCollision(player2.attackCollision, player1) &&
    player2.isAttacking &&
    !player1.isAttacking
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
    //for player1
    case 'a':
      keys.a.isPressed = true;
      player1.lastKey = 'a';
      break;
    case 'd':
      keys.d.isPressed = true;
      player1.lastKey = 'd';
      break;
    case ' ':
      if (!player1.isAttacking) player1.attack();
      break;

    //for player2
    case 'ArrowLeft':
      keys.arrowLeft.isPressed = true;
      player2.lastKey = 'arrowLeft';
      break;
    case 'ArrowRight':
      keys.arrowRight.isPressed = true;
      player2.lastKey = 'arrowRight';
      break;
    case 'z':
      if (!player2.isAttacking) player2.attack();
      break;
  }
});
document.addEventListener('keyup', (event) => {
  switch (event.key) {
    //for player1
    case 'a':
      keys.a.isPressed = false;
      break;
    case 'd':
      keys.d.isPressed = false;
      break;
    //for player2
    case 'ArrowLeft':
      keys.arrowLeft.isPressed = false;
      break;
    case 'ArrowRight':
      keys.arrowRight.isPressed = false;
      break;
  }
});
