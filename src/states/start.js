import { Phaser } from 'phaser';

export class Start extends Phaser.State{
    create() {
        let text = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY, 'Hello World', {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'});
        text.anchor.set(0.5);
        this.game.stage.addChild(text);
    }
}