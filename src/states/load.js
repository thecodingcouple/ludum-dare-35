import { Phaser } from 'phaser';

export class Load extends Phaser.State {
    preload() {
       let textStyle = {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};
        
       this.game.add.text(80, 150, 'loading...', textStyle);
       this.game.load.image('background', '../assets/icelake_hmm.png');
       this.game.load.image('tree', '../assets/tree.png');     
       this.game.load.spritesheet('wizard', '../assets/wizardsprite.png', 95, 123, 3);         
       this.game.load.spritesheet('monster', '../assets/monster.png', 64, 64, 5);
       this.game.load.spritesheet('icicle', '../assets/icicle_0.png', 64, 64, 8);
       this.game.load.spritesheet('explosion', '../assets/boom3.png', 128, 128, 64)
       this.game.load.audio('backgroundAudio', '../assets/happy.mp3');       
       this.game.load.audio('spell', '../assets/spell1_0.wav');
       this.game.load.audio('kaboom', '../assets/explosion1.mp3');
       this.game.load.audio('shapeshift', '../assets/qubodup-crash.ogg');
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