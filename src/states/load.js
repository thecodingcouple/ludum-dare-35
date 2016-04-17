import { Phaser } from 'phaser';

export class Load extends Phaser.State {
    preload() {
       let textStyle = {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};
        
       this.game.add.text(80, 150, 'loading...', textStyle);
       this.game.load.image('wizard', '../assets/wizard.png');
       this.game.load.audio('background', '../assets/happy.mp3');
    }
    
    create() {
        this.game.state.start('menu');
        
        this.background = this.game.add.audio('background');
        
        this.game.sound.setDecodedCallback(this.background, this.start, this)
    }
    
    start() {
        this.background.loopFull(0.4);
    }
}