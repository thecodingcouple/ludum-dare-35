import { Phaser } from 'phaser';

export class Menu extends Phaser.State{
    create() {
        let textStyle = {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};
        
        let title = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Ice Wizard', textStyle);
        title.anchor.set(0.5);
        
        let instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, 'press the "s" key to start', textStyle);
        instructions.anchor.set(0.5);
        
        let sKey = this.game.input.keyboard.addKey(Phaser.KeyCode.S);
        sKey.onDown.addOnce( () => this.game.state.start('play'));
    }
}