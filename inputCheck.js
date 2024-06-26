'use strict';

import { player1, player2 } from './script.js';

export const keys = {
  a: {
    isPressed: false
  },
  d: {
    isPressed: false
  },
  w: {
    isPressed: false
  },
  s: {
    isPressed: false
  },
  arrowLeft: {
    isPressed: false
  },
  arrowRight: {
    isPressed: false
  },
  arrowUp: {
    isPressed: false
  },
  arrowDown: {
    isPressed: false
  },
  f: {
    isPressed: false
  },
  r: {
    isPressed: false
  }
};

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyR') {
    keys.r.isPressed = true;
  }

  //for player1
  if (!player1.isAttacking) {
    switch (event.code) {
      case 'KeyA':
        keys.a.isPressed = true;
        player1.lastKey = 'a';
        break;
      case 'KeyD':
        keys.d.isPressed = true;
        player1.lastKey = 'd';
        break;
      case 'KeyW':
        keys.w.isPressed = true;
        player1.stance = 'High';
        break;
      case 'KeyS':
        keys.s.isPressed = true;
        player1.stance = 'Low';
        break;
      case 'Space':
        player1.attack();
        break;
    }
  }

  //for player2
  if (!player2.isAttacking) {
    switch (event.code) {
      case 'ArrowLeft':
        keys.arrowLeft.isPressed = true;
        player2.lastKey = 'arrowLeft';
        break;
      case 'ArrowRight':
        keys.arrowRight.isPressed = true;
        player2.lastKey = 'arrowRight';
        break;
      case 'ArrowUp':
        keys.arrowUp.isPressed = true;
        player2.stance = 'High';
        break;
      case 'ArrowDown':
        keys.arrowDown.isPressed = true;
        player2.stance = 'Low';
        break;
      case 'KeyZ':
        player2.attack();
        break;
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'KeyR') {
    keys.r.isPressed = false;
  }

  //for player1
  if (!player1.isAttacking) {
    switch (event.code) {
      case 'KeyA':
        keys.a.isPressed = false;
        break;
      case 'KeyD':
        keys.d.isPressed = false;
        break;
      case 'KeyW':
        keys.w.isPressed = false;
        player1.stance = 'Middle';
        break;
      case 'KeyS':
        keys.s.isPressed = false;
        player1.stance = 'Middle';
        break;
    }
  }

  //for player2
  if (!player2.isAttacking) {
    switch (event.code) {
      case 'ArrowLeft':
        keys.arrowLeft.isPressed = false;
        break;
      case 'ArrowRight':
        keys.arrowRight.isPressed = false;
        break;
      case 'ArrowUp':
        keys.arrowUp.isPressed = false;
        player2.stance = 'Middle';
        break;
      case 'ArrowDown':
        keys.arrowDown.isPressed = false;
        player2.stance = 'Middle';
        break;
    }
  }
});
