import { Phaser } from 'phaser';
import { Wizard } from '../sprites/wizard';

export class Play extends Phaser.State {
    create() {
        this.wizard = new Wizard(this.game);
               
        this.game.add.existing(this.wizard);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE); 
        this.cursors = this.game.input.keyboard.createCursorKeys();       
        this.game.stage.backgroundColor = "#FFFFFF";
        
        this.game.input.keyboard.addKeyCapture([ Phaser.KeyCode.SPACEBAR ]);
    }
    
    update() {
        this.wizard.skate(this.cursors);
        
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {                  
            this.wizard.castSpell();
        }
    }
}