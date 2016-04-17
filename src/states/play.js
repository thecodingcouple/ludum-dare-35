import { Phaser } from 'phaser';
import { Wizard } from '../sprites/wizard';
import { Monster } from '../sprites/monster';

export class Play extends Phaser.State {
    preload() {
        
       this.game.load.audio('spell', '../assets/spell1_0.wav');
    }
    
    create() {
        
        this.game.add.tileSprite(0, 0, 800, 600, 'background');        
        this.game.physics.startSystem(Phaser.Physics.ARCADE); 
        
        this.wizard = new Wizard(this.game);
        this.game.add.existing(this.wizard);
        
        this.monsters = this.game.add.group();
        this.monsters.enableBody = true;
        
        for(let x = 0; x < 5; x++) {
            
            let monster = new Monster(this.game);            
            this.monsters.add(monster);
        }
        
        this.monsters.setAll('body.velocity.x', 0);
        this.monsters.setAll('body.velocity.y', 0);
        
        this.cursors = this.game.input.keyboard.createCursorKeys();       
        this.game.stage.backgroundColor = "#FFFFFF";
        
        this.game.input.keyboard.addKeyCapture([ Phaser.KeyCode.SPACEBAR ]);
        
        
        this.spell = this.game.add.audio('spell');
        this.spell.volume = 0.5;
        this.game.sound.setDecodedCallback(this.spell, this.start, this)
    }
    
    update() {
        this.wizard.skate(this.cursors);
        this.monsters.callAll('munch');
        
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {                  
            this.wizard.castSpell();
            this.spell.play();
        }
        
        this.monsters.forEach(this.game.physics.arcade.moveToObject, this.game.physics.arcade, false, this.wizard, 2000, 2000);
        this.monsters.forEach(this.game.physics.arcade.collide, this.game.physics.arcade, false,  this.wizard, this.monsters, this.collisionHandler, null, this);
    }
    
    collisionHandler() {
        console.log('collision occurred');
    }
}