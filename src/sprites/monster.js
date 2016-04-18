import { Phaser } from 'phaser';

export class Monster extends Phaser.Sprite {
    constructor(game, x, y) {        
        super(game, x, y, 'monster');
        this.anchor.setTo(0.5, 0.5);             
        this.animations.add('munch', [0,1,2,3]);
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.enableBody = true;
        this.body.collideWorldBounds = true; 
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.immovable = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
    }
    
    munch() {
        this.animations.play('munch', 5, true);
    }
}