import { Phaser } from 'phaser';
import { Spell } from './spell';

export class Wizard extends Phaser.Sprite { 
    constructor(game) {
        super(game, 400, 300, 'wizard');
        this.anchor.setTo(0.5, 0.5);    
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.body.drag.set(100);
        this.body.maxVelocity.set(200);  
        this.body.collideWorldBounds = true; 
        
        this.spellTime = 0;
        
        this.spells = game.add.group();
        this.spells.enableBody = true;
        this.spells.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(let i = 0; i < 10; i++) {
           let spell = new Spell(game, 0, 0);
           this.spells.add(spell); 
           spell.lifespan = 1;
        }
    }
    
    skate(cursors) {
        if (cursors.up.isDown) {
            this.game.physics.arcade.accelerationFromRotation(this.rotation, 200, this.body.acceleration);
        } else {
            this.body.acceleration.set(0);
        }

        if (cursors.left.isDown) {
            this.body.angularVelocity = -300;
        } else if (cursors.right.isDown) {
            this.body.angularVelocity = 300;
        } else {
            this.body.angularVelocity = 0;
        }        
    }
    
    castSpell() {
        if (this.game.time.now > this.spellTime) {
            let spell = this.spells.getFirstExists(false);
            
            if (spell) {
                spell.reset(this.body.x + 32, this.body.y + 32);
                spell.lifespan = 2000;
                spell.rotation = this.rotation;
                this.game.physics.arcade.velocityFromRotation(this.rotation, 100, spell.body.velocity);
                this.spellTime = this.game.time.now + 50;
            }
        }
    }
}