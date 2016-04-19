import { Phaser } from 'phaser';

export class Load extends Phaser.State {
    preload() {
       let textStyle = {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};
        
       this.game.add.text(80, 150, 'loading...', textStyle);
       this.game.load.image('background', 'http://thecodingcouple.github.io/ludum-dare-35/assets/icelake_hmm.png');
       this.game.load.image('tree', 'http://thecodingcouple.github.io/ludum-dare-35/assets/tree.png');     
       this.game.load.spritesheet('wizard', 'http://thecodingcouple.github.io/ludum-dare-35/assets/wizardsprite.png', 95, 123, 6);         
       this.game.load.spritesheet('monster', 'http://thecodingcouple.github.io/ludum-dare-35/assets/monster.png', 64, 64, 5);
       this.game.load.spritesheet('icicle', 'http://thecodingcouple.github.io/ludum-dare-35/assets/icicle_0.png', 64, 64, 8);
       this.game.load.spritesheet('explosion', 'http://thecodingcouple.github.io/ludum-dare-35/assets/boom3.png', 128, 128, 64)
       this.game.load.audio('backgroundAudio', 'http://thecodingcouple.github.io/ludum-dare-35/assets/happy.mp3');       
       this.game.load.audio('spell', 'http://thecodingcouple.github.io/ludum-dare-35/assets/spell1_0.wav');
       this.game.load.audio('kaboom', 'http://thecodingcouple.github.io/ludum-dare-35/assets/explosion1.mp3');
       this.game.load.audio('shapeshift', 'http://thecodingcouple.github.io/ludum-dare-35/assets/qubodup-crash.ogg');
       this.game.load.audio('victory', 'http://thecodingcouple.github.io/ludum-dare-35/assets/chipquest.wav');
    }
    
    create() {
        this.game.state.start('cutscene');
        
        this.background = this.game.add.audio('backgroundAudio');
        
        this.game.sound.setDecodedCallback(this.background, this.start, this)
    }
    
    start() {
        this.background.loopFull(0.4);
    }
}
