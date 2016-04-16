import { Phaser } from 'phaser';

export class Wizard extends Phaser.Sprite{ 
    constructor(game) {
        super(game, 400, 300, 'wizard');
        this.anchor.setTo(0.5, 0.5);    
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.body.drag.set(100);
        this.body.maxVelocity.set(200);  
        this.body.collideWorldBounds = true; 
    }
    
    skate(cursors) {
        if (cursors.up.isDown) {
            this.game.physics.arcade.accelerationFromRotation(this.rotation, 200, this.body.acceleration);
        } else {
            this.body.acceleration.set(0);
        }

        if (cursors.left.isDown) {
            this.body.angularVelocity = -300;
        } else if (cursors.right.isDown) {
            this.body.angularVelocity = 300;
        } else {
            this.body.angularVelocity = 0;
        }        
    }
}