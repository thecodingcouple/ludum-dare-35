import { Phaser } from 'phaser';

export class Spell extends Phaser.Sprite{ 
    constructor(game, x, y) {        
        super(game, x, y, 'icicle');
        this.animations.add('casting', [0,1,2,3,4,5,6,7,8]);
        
        this.soundEffect = this.game.add.audio('spell');
        this.soundEffect.volume = 0.5;
    }
    
    casting() {
        this.animations.play('casting', 5, true);
        this.soundEffect.play();
    }
}