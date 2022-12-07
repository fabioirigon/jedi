
class orc extends Actor {
  constructor(scene, x, y, texture_idle, texture_attack) {
    super(scene, x, y, texture_idle, 0);
    this.scene = scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setSize(this.width/2, 2*this.height/3, true);
    this.setOffset(this.width/4, this.height/3);
    this.scene = scene;

    //scene.create_animations(texture_idle, texture_attack);

    this.anims.create({
      key: 'orc_idle',
      frames: this.anims.generateFrameNumbers(texture_idle, {start: 26, end: 27}),
      frameRate: 6,
      yoyo:true,
      repeat: -1
    });
    this.anims.create({
      key: 'orc_walk_up',
      frames: this.anims.generateFrameNumbers(texture_attack, {start: 104, end: 112}),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: 'orc_walk_left',
      frames: this.anims.generateFrameNumbers(texture_attack, {start: 117, end: 125}),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: 'orc_walk_down',
      frames: this.anims.generateFrameNumbers(texture_attack, {start: 130, end: 138}),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: 'orc_walk_right',
      frames: this.anims.generateFrameNumbers(texture_attack, {start: 143, end: 151}),
      frameRate: 15,
      repeat: -1
    });
    // this.anims.create({
    //   key: 'orc_attack_up',
    //   frames: this.anims.generateFrameNumbers(texture_attack, {start: 156, end: 161}),
    //   frameRate: 30,
    //   repeat: -1
    // });
    // this.anims.create({
    //   key: 'orc_attack_left',
    //   frames: this.anims.generateFrameNumbers(texture_attack, {start: 169, end: 174}),
    //   frameRate: 30,
    //   repeat: -1
    // });
    // this.anims.create({
    //   key: 'orc_attack_down',
    //   frames: this.anims.generateFrameNumbers(texture_attack, {start: 182, end: 187}),
    //   frameRate: 30,
    //   repeat: -1
    // });
    // this.anims.create({
    //   key: 'orc_attack_right',
    //   frames: this.anims.generateFrameNumbers(texture_attack, {start: 195, end: 200}),
    //   frameRate: 30,
    //   repeat: -1
    // });
    this.anims.create({
      key: 'orc_death',
      frames: this.anims.generateFrameNumbers(texture_idle, {start: 260, end: 265}),
      frameRate: 2,
      repeat: 0,

    });

    // /home/fip/Documents/UTFPR/Disciplinas/OFC_Int/Phaser/gen_assets/wizard death.png
    this.anims.play('orc_idle');
    this.timer = scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.attack, callbackScope: this });
  }

  set_walk_animation(){
    if (this.body.velocity.x > 0){
      this.anims.play('orc_walk_right', true);
      this.facing = [1, 0];
    }
    else if (this.body.velocity.x < 0){
      this.anims.play('orc_walk_left', true);
      this.facing = [-1, 0];
    }
    else if (this.body.velocity.y > 0){
      this.anims.play('orc_walk_down', true);
      this.facing = [0, 1];
    }
    else if (this.body.velocity.y < 0){
      this.anims.play('orc_walk_up', true);
      this.facing = [0, -1];
    }
    else{
      this.anims.stop();
    }
  }

  attack(){
    //console.log('wizard attack', this.bullets.countActive(true), this.bullets.countActive(false));
    if (this.body.enable == false){
      return;
    }

    //this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(100, 600), callback: this.attack, callbackScope: this });
  }

  preUpdate (time, delta)
  {
    super.preUpdate(time, delta);
    if(this.body.enable){
      this.set_walk_animation();
    }
  }

  die(){
    this.attack_enable = false;
    this.move_enable = false;
    this.body.enable=false;
    this.anims.play('orc_death');
    this.on('animationcomplete', this.vanish);
  }

  vanish(){
    this.setVisible(false);
  }

}
