class Elf extends Phaser.GameObjects.Sprite {
  constructor(scene, color, x, y) {
    super(scene, x, y);

    this.color = color;

    this.setTexture("elves");
    this.setPosition(x, y);

    this.play(this.color + "Idle");

    scene.add.existing(this);

    this.on("animationcomplete", this.animComplete, this);

    this.alive = true;

    var hx = this.color === "blue" ? 110 : -40;

    this.hp = new HealthBar(scene, x - hx, y - 110);

    this.timer = scene.time.addEvent({
      delay: Phaser.Math.Between(1000, 3000),
      callback: this.fire,
      callbackScope: this,
    });
  }
}
