console.log("enemy !! ")

/*
class Actor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    //this.body.setCollideWorldBounds(true);
    this.hp = 100;
    this.tam_rec=80;
    this.bar =  scene.add.rectangle(x, y-20, this.tam_rec, 8, 0x000000);
    this.bar_bg =  scene.add.rectangle(x, y-20, (this.hp/100)*this.tam_rec, 6, 0x00ff00);
    this.bar_bg.setOrigin(0.5, 0.5);
    //this.bar = new Phaser.GameObjects.Rectangle(scene, x, y, 100, 20, 0xff0000);
    //this.bar = new HealthBar(scene, x, y);
    this.draw_bar();
  }

  getDamage(value){
    console.log("getDamage");
    this.hp = this.hp - value;
    this.bar_bg.width = (this.hp/100)*this.tam_rec;
  }

  getHPValue(){
    return this.hp;
  }

  preUpdate (time, delta)
  {
      super.preUpdate(time, delta);
      this.draw_bar()
  }

  draw_bar()
  {
    //this.bar.originX = 0.9
    this.bar_bg.x = this.x
    this.bar_bg.y = this.y-20
    this.bar_fg.x = this.x-32
    this.bar_fg.y = this.y-20
        /*
        this.bar.clear();
        //console.log(this.x, this.y)

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 80, 16);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

        if (this.hp < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(0.76 * this.hp);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }
}
        */

console.log("Criando inimigo");
class Enemy extends Actor {

  constructor(scene, x, y, texture, frame, player) {
    super(scene, x, y, texture, frame, player);
    this.move_enable = true;
    this.velocityX = 0;
    this.velocityY = 0;
    this.facing = [0, 1];
    console.log("animation");
    this.create_animations(texture);
    this.walkEnable = 1;
  }

  create_animations(texture){
    this.anims.create({
        key: 'walk_up',
        frames: this.anims.generateFrameNumbers(texture, {start: 9, end: 11}),
        frameRate: 20,
        repeat: -1
        });
    this.anims.create({
        key: 'walk_left',
        frames: this.anims.generateFrameNumbers(texture, {start: 13, end: 15}),
        frameRate: 20,
        repeat: -1
        });
    this.anims.create({
        key: 'walk_down',
        frames: this.anims.generateFrameNumbers(texture, {start: 1, end: 3}),
        frameRate: 20,
        repeat: -1
        });
    this.anims.create({
        key: 'walk_right',
        frames: this.anims.generateFrameNumbers(texture, {start: 4, end: 6}),
        frameRate: 20,
        repeat: -1
        });


    this.anims.create({
        key: 'die',
        frames: this.anims.generateFrameNumbers(texture, {start: 0, end: 0}),
        frameRate: 20,
        repeat: 0
        });    
  }

  set_walk_animation(){
    if (this.body.velocity.x > 0 && this.body.velocity.x*this.body.velocity.x > this.body.velocity.y*this.body.velocity.y){
      this.anims.play('walk_right', true);
      this.facing = [1, 0];
    }
    else if (this.body.velocity.x < 0 && this.body.velocity.x*this.body.velocity.x > this.body.velocity.y*this.body.velocity.y){
      this.anims.play('walk_left', true);
      this.facing = [-1, 0];      
    }
    else if (this.body.velocity.y > 0 && this.body.velocity.y*this.body.velocity.y > this.body.velocity.x*this.body.velocity.x){
      this.anims.play('walk_down', true);
      this.facing = [0, 1];
    }
    else if (this.body.velocity.y < 0 && this.body.velocity.y*this.body.velocity.y > this.body.velocity.x*this.body.velocity.x){
      this.anims.play('walk_up', true);
      this.facing = [0, -1];
    }
    else{
      this.anims.stop();
    }

  }

  update(player){
    var dx = player.x - this.x;
    var dy = player.y - this.y;
    if(this.hp > 0){
      if (dx*dx + dy*dy > 0){
        this.velocityX = dx;
        this.velocityY = dy;
        this.setVelocityX(this.velocityX/10);
        this.setVelocityY(this.velocityY/10);
      }
      else{
        this.setVelocityX(0);
        this.setVelocityY(0);
      }
    } else{
      this.move_enable = false;
    }
    
    this.set_walk_animation();
  }
}

