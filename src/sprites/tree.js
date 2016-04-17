import { Phaser } from 'phaser';

export class Tree extends Phaser.Sprite {
    constructor(game) {
             
        super(game, game.world.randomX, game.world.randomY, 'tree');
        this.anchor.setTo(0.5, 0.5);          
        
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.enableBody = true;
        this.body.collideWorldBounds = true; 
        this.body.moves = false;
        this.immovable = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
    }
}