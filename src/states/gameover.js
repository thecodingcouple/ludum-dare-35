import { Phaser } from 'phaser';

export class GameOver extends Phaser.State{
    create() {
        let textStyle = {font: '45px Arial', alight: 'center', stroke: 'red', fill: 'red'};
        
        let title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'GAME OVER', textStyle);
        title.anchor.set(0.5);
        
        textStyle.font = '36px Arial';
        
        let instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '"p" key to play again', textStyle);
        instructions.anchor.set(0.5);
        
        let pKey = this.game.input.keyboard.addKey(Phaser.KeyCode.P);
        pKey.onDown.addOnce( () => this.game.state.start('play'));
    }
}