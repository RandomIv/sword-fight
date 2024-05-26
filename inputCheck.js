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
  }
};
document.addEventListener('keydown', (event) => {
  //for player1
  switch (event.key) {
    case 'a':
      keys.a.isPressed = true;
      player1.lastKey = 'a';
      break;
    case 'd':
      keys.d.isPressed = true;
      player1.lastKey = 'd';
      break;
    case 'w':
      keys.w.isPressed = true;
      player1.stance = 'High';
      break;
    case 's':
      keys.s.isPressed = true;
      player1.stance = 'Low';
      break;
    case ' ':
      if (!player1.isAttacking) player1.attack();
      break;
  }
  //for player2
  switch (event.key) {
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
    case 'z':
      player2.attack();
      break;
  }
});
document.addEventListener('keyup', (event) => {
  //for player1
  switch (event.key) {
    case 'a':
      keys.a.isPressed = false;
      break;
    case 'd':
      keys.d.isPressed = false;
      break;
    case 'w':
      keys.w.isPressed = false;
      player1.stance = 'Middle';
      break;
    case 's':
      keys.s.isPressed = false;
      player1.stance = 'Middle';
      break;
  }
  //for player2
  switch (event.key) {
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
});
