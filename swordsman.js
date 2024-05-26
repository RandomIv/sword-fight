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
    attackCollisionOffsetRight,
    attackCollisionOffsetLeft,
    sprites
  ) {
    super(context, position, size, imageSrc, scale, framesMax, offset);
    this.attackCollision = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      size: { width: 270, height: 200 },
      offsetRight: attackCollisionOffsetRight,
      offsetLeft: attackCollisionOffsetLeft
    };
    this.sprites = sprites;
    this.velocity = velocity;
    this.lastKey = '';
    this.direction = 'Right';
    this.isAttacking = false;
    this.isCollisionSeen = false;
    this.isDead = false;
    this.stance = 'Middle';
    for (const sprite of Object.values(this.sprites)) {
      sprite.image = new Image();
      sprite.image.src = sprite.imageSrc;
    }
  }
  showCollisions() {
    if (this.isCollisionSeen) {
      if (this.isAttacking) {
        this.context.fillStyle = 'green';
        this.context.fillRect(
          this.attackCollision.position.x,
          this.attackCollision.position.y,
          this.attackCollision.size.width,
          this.attackCollision.size.height
        );
      }
      this.context.fillStyle = 'yellow';
      this.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
  }
  draw() {
    super.draw();
    this.showCollisions();
  }
  update() {
    this.draw();
    this.animateFrames();
    this.position.x += this.velocity.speed * this.velocity.direction;
    this.attackCollision.position.x =
      this.position.x - this.attackCollision[`offset${this.direction}`].x;
    this.attackCollision.position.y =
      this.position.y - this.attackCollision[`offset${this.direction}`].y;
  }
  attack() {
    this.isAttacking = true;
  }
  tookHitBy(player) {
    if (this.stance === player.stance) {
      console.log('Attack blocked');
    } else {
      this.isDead = true;
    }
  }
  changeSprite(sprite) {
    if (this.image !== this.sprites[sprite].image) {
      this.image = this.sprites[sprite].image;
      this.framesMax = this.sprites[sprite].framesMax;
      this.framesCurrent = 0;
    }
  }
}
