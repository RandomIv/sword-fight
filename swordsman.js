'use strict';
import Sprite from './sprite.js';
export default class Swordsman extends Sprite {
  constructor(
    context,
    position,
    size,
    velocity,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites
  ) {
    super(context, position, size, imageSrc, scale, framesMax, offset);
    this.velocity = velocity;
    this.lastKey = '';
    this.direction = 0;
    this.attackCollision = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset: { x: 230, y: 150 },
      size: { width: 220, height: 150 }
    };
    this.isAttacking = false;
    this.sprites = sprites;
    for (const sprite of Object.values(this.sprites)) {
      sprite.image = new Image();
      sprite.image.src = sprite.imageSrc;
      console.log(sprite);
    }
  }
  update() {
    this.draw();
    this.animateFrames();
    this.position.x += this.velocity.speed * this.velocity.direction;
    if (this.direction === 1) {
      this.attackCollision.position.x = this.position.x;
    } else {
      this.attackCollision.position.x = this.position.x - this.attackCollision.size.width;
    }
  }
  attack() {
    this.isAttacking = true;
    setTimeout(
      () => {
        this.isAttacking = false;
      },
      (1000 / 144) * this.framesHold * this.sprites.attackRight1.framesMax
    );
  }
  changeSprite(sprite) {
    if (this.image !== this.sprites[sprite].image) {
      this.image = this.sprites[sprite].image;
      this.framesMax = this.sprites[sprite].framesMax;
      this.framesCurrent = 0;
    }
  }
}
