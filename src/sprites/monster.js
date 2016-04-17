import { Phaser } from 'phaser';

export class Monster extends Phaser.Sprite {
    constructor(game) {        
        super(game, game.world.randomX, 50, 'monster');
        this.anchor.setTo(0.5, 0.5);  
        this.animations.add('munch', [1,2,3,4]);
    }
    
    munch() {
        this.animations.play('munch', 5, true);
    }
}