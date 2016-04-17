import { Phaser } from 'phaser';

export class Load extends Phaser.State {
    preload() {
       let textStyle = {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};
        
       this.game.add.text(80, 150, 'loading...', textStyle);
       this.game.load.image('background', '../assets/icelake_hmm.png');
       this.game.load.image('tree', '../assets/tree.png');     
       this.game.load.spritesheet('wizard', '../assets/wizardsprite.png', 95, 123, 3);         
       this.game.load.spritesheet('monster', '../assets/monster.png', 64, 64, 5);
       this.game.load.audio('backgroundAudio', '../assets/happy.mp3');
    }
    
    create() {
        this.game.state.start('menu');
        
        this.background = this.game.add.audio('backgroundAudio');
        
        this.game.sound.setDecodedCallback(this.background, this.start, this)
    }
    
    start() {
        this.background.loopFull(0.4);
    }
}