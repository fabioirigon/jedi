console.log("actors # ")


class Actor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.hp = 100;
    this.bar =  scene.add.rectangle(x, y-20, 80, 8, 0x000000);
    this.bar_bg =  scene.add.rectangle(x, y-20, 40, 6, 0x00ff00);
    this.bar_bg.setOrigin(0.1, 0.5)
    //this.bar = new Phaser.GameObjects.Rectangle(scene, x, y, 100, 20, 0xff0000);
    //this.bar = new HealthBar(scene, x, y);
    this.draw_bar()
  }
  getDamage(value){
      this.hp = this.hp - value;
  }

  getHPValue(){
    return this.hp;
  }

  checkFlip(){ 
    if (this.body.velocity.x < 0) {
      //this.scaleX = -1;
      this.flipX = true;
    } else {
      //this.scaleX = 1;
      this.flipX = false;
    }
  }


    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        this.draw_bar()
    }

    draw_bar()
    {
        //this.bar.originX = 0.9
        this.bar.x = this.x
        this.bar.y = this.y-20
        this.bar_bg.x = this.x
        this.bar_bg.y = this.y-20
       
    }

}

class Enemy extends Actor {

  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
  }


  update(player)
  {
    var dx = player.x - this.x;
    var dy = player.y - this.y;
    if (dx*dx + dy*dy < 150*150)
    {
        this.setVelocityX(dx);
        this.setVelocityY(dy);
    }
    else{
        this.setVelocityX(0);
        this.setVelocityY(0);
    }
  }
}