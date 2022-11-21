console.log("actors!! ")

class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        //this.body.onWorldBounds = true;
    }

    fire (x, y, vx, vy)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(vx);
        this.setVelocityY(vy);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;        

        this.createMultiple({
            frameQuantity: 5,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });

        //this.body.collideWorldBounds = true;
    }

    fireBullet (x, y, vx, vy)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y, vx, vy);
        }
    }
}


class Wizard extends Phaser.Physics.Arcade.Sprite {
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
        var bullet = this.bullets.create(100 + i * 48,50, 'bullet');
        bullet.setActive(false);
        bullet.setVisible(false);
    }

    console.log('bb: ', bullet, bullet.body);
    bullet.setVelocityY(-300);
    /*
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i=0; i<5; i++)
    {
        var b = this.bullets.create(200, 200, 'bullet');
        console.log('bb: ', b.body)s
        b.body.setVelocityX(20);
    }
    */
    console.log('bullets added')

    this.facing = [0, 1];
    scene.create_animations(texture_idle, texture_attack);

    this.timer = scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.attack, callbackScope: this });

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

    this.anims.play('wizard_idle');
    //this.bullets.fireBullet(200, 200);
  }


  attack(){ 
    //console.log('wizard attack', this.bullets.countActive(true), this.bullets.countActive(false));
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
    this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(200, 1000), callback: this.attack, callbackScope: this });
  }

  re_enable(){
    this.setImmovable(false);
  }

  preUpdate (time, delta)
  {
    super.preUpdate(time, delta);

    if (this.move_enable){
      this.set_player_velocity();
      this.set_walk_animation();
    }
    else{
      this.setVelocityX(0); 
      this.setVelocityY(0); 
    }

    if (this.scene.keySPACE.isDown && this.attack_enable) {
      this.attack();
    }
  }

  bulletHitWall(bullet, wall){
    bullet.setActive(false);
    bullet.setVisible(false);
  }
}

