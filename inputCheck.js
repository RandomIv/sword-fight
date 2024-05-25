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
  switch (event.key) {
    case 'f':
      keys.f.isPressed = true;
      break;
    //for player1
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
      break;
    case 's':
      keys.s.isPressed = true;
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
    case 'ArrowUp':
      keys.arrowUp.isPressed = true;
      break;
    case 'ArrowDown':
      keys.arrowDown.isPressed = true;
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
    case 'w':
      keys.w.isPressed = false;
      break;
    case 's':
      keys.s.isPressed = false;
      break;
    //for player2
    case 'ArrowLeft':
      keys.arrowLeft.isPressed = false;
      break;
    case 'ArrowRight':
      keys.arrowRight.isPressed = false;
      break;
    case 'ArrowUp':
      keys.arrowUp.isPressed = false;
      break;
    case 'ArrowDown':
      keys.arrowDown.isPressed = false;
      break;
    case 'f':
      keys.f.isPressed = false;
      break;
  }
});
