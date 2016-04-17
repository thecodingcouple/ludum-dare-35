import { Phaser } from 'phaser';

export class Spell extends Phaser.Sprite{ 
    constructor(game, x, y) {
        let bitmapData = game.add.bitmapData(25,25);
        bitmapData.ctx.beginPath();
        bitmapData.ctx.rect(0,0,25,25);
        bitmapData.ctx.fillStyle = 'blue';
        bitmapData.ctx.fill();
        
        super(game, x, y, bitmapData);
    }
}