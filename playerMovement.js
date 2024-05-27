'use strict';

import { keys } from './inputCheck.js';
import { player1, player2, isGameOver } from './script.js';

export const playerMovement = (player) => {
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

export const checkDirectionOfPlayers = () => {
  if (player1.position.x < player2.position.x) {
    player1.direction = 'Right';
    player2.direction = 'Left';
  } else {
    player1.direction = 'Left';
    player2.direction = 'Right';
  }
};
