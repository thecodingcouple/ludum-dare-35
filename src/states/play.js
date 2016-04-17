import { Phaser } from 'phaser';
import { Wizard } from '../sprites/wizard';
import { Monster } from '../sprites/monster';

export class Play extends Phaser.State {
    preload() {
        
       this.game.load.audio('spell', '../assets/spell1_0.wav');
    }
    
    create() {
        
        this.game.add.tileSprite(0, 0, 800, 600, 'background');
        this.wizard = new Wizard(this.game);
        this.monster = new Monster(this.game);
               
        this.game.add.existing(this.wizard);
        this.game.add.existing(this.monster);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE); 
        this.cursors = this.game.input.keyboard.createCursorKeys();       
        this.game.stage.backgroundColor = "#FFFFFF";
        
        this.game.input.keyboard.addKeyCapture([ Phaser.KeyCode.SPACEBAR ]);
        
        
        this.spell = this.game.add.audio('spell');
        this.spell.volume = 0.5;
        this.game.sound.setDecodedCallback(this.spell, this.start, this)
    }
    
    update() {
        this.wizard.skate(this.cursors);
        this.monster.chill();
        
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {                  
            this.wizard.castSpell();
            this.spell.play();
        }
    }
}