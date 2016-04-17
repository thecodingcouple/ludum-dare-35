import { Phaser } from 'phaser';

export class Load extends Phaser.State {
    preload() {
       let textStyle = {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};
        
       this.game.add.text(80, 150, 'loading...', textStyle);
       this.game.load.image('wizard', '../assets/wizard.png');
       this.game.load.audio('background', '../assets/happy.mp3');
       this.game.load.audio('spell', '../assets/spell1_0.wav');
    }
    
    create() {
        this.game.state.start('menu');
        
        this.background = this.game.add.audio('background');
        this.spell = this.game.add.audio('spell');
        
        this.game.sound.setDecodedCallback([ this.background, this.spell ], this.start, this)
    }
    
    start() {
        this.background.loopFull(0.6);
    }
}