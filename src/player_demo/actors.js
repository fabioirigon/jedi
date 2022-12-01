console.log("actors !! ")


class Actor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    //this.body.setCollideWorldBounds(true);
    this.hp = 100;
    this.bar_bg =  scene.add.rectangle(x, y-21, 82, 8, 0x000000);
    this.bar_fg =  scene.add.rectangle(x-1, y-20, 80, 4, 0x00ff00);
    this.draw_bar()
  }

  damage(value){
      if ((this.hp - value) > 0){
          this.hp = this.hp - value;
          this.bar_fg.width =  80*this.hp/100;
        }
      else {
        this.hp = 0;
        //this.disableBody(true, true);
        this.bar_fg.setVisible(false);
        this.bar_bg.setVisible(false);
      }
  }

  getHP(){
    return this.hp;
  }

  preUpdate (time, delta)
  {
      super.preUpdate(time, delta);
      this.draw_bar()
  }

  draw_bar()
  {
    this.bar_bg.x = this.x
    this.bar_bg.y = this.y-21
    this.bar_fg.x = this.x
    this.bar_fg.y = this.y-21
    }
}

