import { Phaser } from 'phaser';

export class Tree extends Phaser.Sprite {
    constructor(game, x, y) {             
        super(game, x, y, 'tree');
        this.anchor.setTo(0.5, 0.5);          
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.enableBody = true;
        this.body.collideWorldBounds = true; 
        this.body.moves = false;
        this.immovable = true;
        
        this.body.width -= 32;
        this.body.height -= 32;
        
        this.physicsBodyType = Phaser.Physics.ARCADE;
    }
}