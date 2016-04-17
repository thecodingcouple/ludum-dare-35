import { Phaser } from 'phaser';

export class Monster extends Phaser.Sprite {
    constructor(game) {        
        super(game, 400, 300, 'monster');
        this.anchor.setTo(0.5, 0.5);  
        
        this.monster = game.add.sprite(400, 300, 'monster');
        this.monster.animations.add('chill', [1,2,3,4]);
    }
    
    chill() {
        this.monster.animations.play('chill', 5, true);
    }
}