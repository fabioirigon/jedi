
class Wizard extends Actor {
  constructor(scene, x, y, texture_idle, texture_attack) {
    super(scene, x, y, texture_idle, 0);
    this.scene = scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.setSize(this.width/2, 2*this.height/3, true);
    this.setOffset(this.width/4, this.height/3);
    this.scene = scene

    //this.bullets = new Bullets(scene);
    this.bullets = scene.physics.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 5; i++)
    {
        var bullet = this.bullets.create(-10,-10, 'bullet');
        bullet.setActive(false);
        bullet.setVisible(false);
    }

    console.log('bullets added')

    //scene.create_animations(texture_idle, texture_attack);

    this.anims.create({
        key: 'wizard_idle',
        frames: this.anims.generateFrameNumbers(texture_idle, {start: 0, end: 5}),
        frameRate: 6,
        yoyo:true,
        repeat: -1
        });
    this.anims.create({
        key: 'wizard_attack',
        frames: this.anims.generateFrameNumbers(texture_attack, {start: 0, end: 5}),
        frameRate: 20,
        repeat: 1
        });
    this.anims.create({
        key: 'wizard_death',
        frames: this.anims.generateFrameNumbers('wizardDeath_sp', {start: 0, end: 4}),
        frameRate: 10,
        repeat: 1,

        });

    // /home/fip/Documents/UTFPR/Disciplinas/OFC_Int/Phaser/gen_assets/wizard death.png    
    this.anims.play('wizard_idle');
    this.timer = scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.attack, callbackScope: this });
  }


  attack(){ 
    //console.log('wizard attack', this.bullets.countActive(true), this.bullets.countActive(false));
    if (this.body.enable == false){
        return;
    }
    var vx = this.scene.player.x - this.x
    var vy = this.scene.player.y - this.y
    var bullet = this.bullets.getFirstDead(false);
    if (bullet){
        bullet.body.reset(this.x, this.y);
        bullet.setActive(true);
        bullet.setVisible(true);

        bullet.setVelocityX(vx);
        bullet.setVelocityY(vy);        
    }
    this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(100, 600), callback: this.attack, callbackScope: this });
  }

  preUpdate (time, delta)
  {
    super.preUpdate(time, delta);
  }

  bulletHitWall(bullet, wall){
    bullet.setActive(false);
    bullet.setVisible(false);
  }
  die(){
    this.attack_enable = false;
    this.move_enable = false;
    this.body.enable=false;
    this.anims.play('wizard_death');
    this.on('animationcomplete', this.vanish);    
  }
  vanish(){
    this.setVisible(false);
  }

}

