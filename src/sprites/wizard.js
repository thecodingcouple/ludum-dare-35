import { Phaser } from 'phaser';
import { Spell } from './spell';

export class Wizard extends Phaser.Sprite { 
    constructor(game, x, y) {
        super(game, x, y, 'wizard');
        this.anchor.setTo(0.5, 0.5);    
        this.scale.setTo(0.65, 0.65);
        this.animations.add('right', [0,1,2]);        
        this.animations.add('left', [3,4,5]);
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.body.drag.set(100);
        this.body.maxVelocity.set(500);  
        this.body.collideWorldBounds = true; 
        
        this.spellTime = 0;
        
        this.spells = game.add.group();
        this.spells.enableBody = true;
        this.spells.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.isFacingRight = true;
        
        for(let i = 0; i < 3; i++) {
           let spell = new Spell(game, 350, 300);
           this.spells.add(spell); 
           spell.lifespan = 1;
        }
    }
    
    skate(cursors) {     
        if (cursors.up.isDown) {
            this.body.acceleration.y = -300;                   
        } else if (cursors.down.isDown) {            
            this.body.acceleration.y = 300;           
        } else {
            this.body.acceleration.y = 0;
        }
        if (cursors.left.isDown) {       
            this.body.acceleration.x = -300;
            this.animations.play('left', 4, true);
            this.isFacingRight = false;
        } else if (cursors.right.isDown) {          
            this.body.acceleration.x = 300;
            this.animations.play('right', 4, true);
            this.isFacingRight = true;
        } else {            
            this.body.acceleration.x = 0;
        }        
    }
    
    castSpell() {
        if (this.game.time.now > this.spellTime) {
            let spell = this.spells.getFirstExists(false);
            
            if (spell) {                
                spell.casting();
                let spellOffset = this.isFacingRight ? 32 : -32;
                spell.reset(this.body.x + spellOffset, this.body.y);
                spell.lifespan = 2000;
                spell.rotation = this.rotation;
                let speed = this.isFacingRight ? 550 : -550;
                this.game.physics.arcade.velocityFromAngle(0, speed, spell.body.velocity);
                this.spellTime = this.game.time.now + 1000;
            }
        }
    }
    
}