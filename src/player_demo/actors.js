console.log("actors !! ")


class Actor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.hp = 100;
    this.bar_bg =  scene.add.rectangle(x, y-20, 80, 8, 0x000000);
    this.bar_fg =  scene.add.rectangle(x-40, y-20, 80, 6, 0x00ff00);
    this.bar_fg.setOrigin(0.1, 0.5)
    this.draw_bar()
  }

  getDamage(value){
      // console.log("dmg.")
      this.bar_fg.width =  80*this.hp/100;
      if ((this.hp - value) > 0)
          this.hp = this.hp - value
      else {
        this.hp = 0;
        //this.disableBody(true, true);
        this.bar_fg.setVisible(false)
        this.bar_bg.setVisible(false)
      }
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
    this.bar_fg.x = this.x-40
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
        */
    }
}

