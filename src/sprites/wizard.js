import { Phaser } from 'phaser';
import { Spell } from './spell';

export class Wizard extends Phaser.Sprite { 
    constructor(game) {
        super(game, 400, 300, 'wizard');
        this.anchor.setTo(0.5, 0.5);    
        this.scale.setTo(0.65, 0.65);
        this.animations.add('right', [0,1,2]);        
        this.animations.add('left', [3,4,5]);
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.body.drag.set(100);
        this.body.maxVelocity.set(200);  
        this.body.collideWorldBounds = true; 
        
        this.spellTime = 0;
        
        this.spells = game.add.group();
        this.spells.enableBody = true;
        this.spells.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(let i = 0; i < 3; i++) {
           let spell = new Spell(game, 0, 0);
           this.spells.add(spell); 
           spell.lifespan = 1;
        }
    }
    
    skate(cursors) {
        
        if (cursors.up.isDown) {
            this.body.velocity.y = -150;        
            this.animations.play('right', 4, true);
        } else {
            this.body.velocity.y = 0;
            this.animations.stop('right');
        }
        
        if (cursors.down.isDown) {            
            this.body.velocity.y = 150;     
            this.animations.play('left', 4, true);
        } else {
            this.body.velocity.y = 0;
            this.animations.stop('left');
        }

        if (cursors.left.isDown) {            
            this.body.velocity.x = -150;
            this.animations.play('left', 4, true);
        } else if (cursors.right.isDown) {            
            this.body.velocity.x = 150;
            this.animations.play('right', 4, true);
        } else {            
            this.body.velocity.x = 0;
        }        
    }
    
    castSpell() {
        if (this.game.time.now > this.spellTime) {
            let spell = this.spells.getFirstExists(false);
            
            if (spell) {                
                spell.casting();
                spell.reset(this.body.x + 32, this.body.y);
                spell.lifespan = 2000;
                spell.rotation = this.rotation;
                this.game.physics.arcade.velocityFromRotation(this.rotation, 100, spell.body.velocity);
                this.spellTime = this.game.time.now + 50;
            }
        }
    }
    
}