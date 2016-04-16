import { Phaser } from 'phaser';
import { Wizard } from '../sprites/wizard';

export class Play extends Phaser.State {
    create() {
        this.wizard = new Wizard(this.game);
               
        this.game.add.existing(this.wizard);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE); 
        this.cursors = this.game.input.keyboard.createCursorKeys();       
        this.game.stage.backgroundColor = "#FFFFFF";
    }
    
    update() {
        this.wizard.skate(this.cursors);
    }
}