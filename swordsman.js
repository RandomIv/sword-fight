'use strict';
export default class Swordsman {
  constructor(context, position, size, velocity) {
    this.context = context;
    this.position = position;
    this.size = size;
    this.velocity = velocity;
    this.lastKey = '';
    this.direction = 1;
    this.attackCollision = {
      position: { x: this.position.x + this.size.width * this.direction, y: this.position.y },
      size: { width: 100, height: 50 }
    };
    this.isAttacking = false;
  }
  draw() {
    this.context.fillStyle = 'yellow';
    this.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);

    if (this.isAttacking) {
      this.context.fillStyle = 'green';
      this.context.fillRect(
        this.attackCollision.position.x,
        this.attackCollision.position.y,
        this.attackCollision.size.width,
        this.attackCollision.size.height
      );
    }
  }
  update() {
    this.draw();
    this.position.x += this.velocity.speed * this.velocity.direction;
    this.attackCollision.position.x = this.position.x + this.size.width * this.direction;
  }
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
