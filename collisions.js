import { player1, player2 } from './script.js';

const checkRectangularCollision = (rect1, rect2) => {
  return (
    rect1.position.x + rect1.size.width >= rect2.position.x &&
    rect2.position.x + rect2.size.width >= rect1.position.x
  );
};

const checkHit = (player1, player2) => {
  if (
    checkRectangularCollision(player1.attackCollision, player2) &&
    player1.isAttacking &&
    !player2.isAttacking &&
    player1.framesCurrent === 2
  ) {
    player2.takeHitBy(player1);
  }
};

export const checkSwordsCollisions = () => {
  if (
    checkRectangularCollision(player1.attackCollision, player2.attackCollision) &&
    player1.isAttacking &&
    player2.isAttacking &&
    player1.framesCurrent >= 2 &&
    player2.framesCurrent >= 2
  ) {
    player1.isAttacking = false;
    player2.isAttacking = false;
  } else {
    checkHit(player1, player2);
    checkHit(player2, player1);
  }

  if (player1.framesCurrent === 3) {
    player1.isAttacking = false;
  }

  if (player2.framesCurrent === 3) {
    player2.isAttacking = false;
  }
};
