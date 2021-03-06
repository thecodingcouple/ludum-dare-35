import { Phaser } from 'phaser';
import { Wizard } from '../sprites/wizard';
import { Monster } from '../sprites/monster';
import { Tree } from '../sprites/tree';

export class Play extends Phaser.State {    
    create() {
        
        this.game.add.tileSprite(0, 0, 800, 600, 'background');        
        this.game.physics.startSystem(Phaser.Physics.ARCADE); 
        
        this.kaboomSoundEffect = this.game.add.audio('kaboom');
        this.kaboomSoundEffect.volume = 0.5;
        
        this.shapeshiftSoundEffect = this.game.add.audio('shapeshift');
        this.shapeshiftSoundEffect.volume = 0.5;
        
        this.victorySoundEffect = this.game.add.audio('victory');
        this.victorySoundEffect.volume = 0.5;  
        
        this.wizard = new Wizard(this.game, 350, 300);
        this.game.add.existing(this.wizard);
        
        this.trees = this.game.add.group(); 
        this.monsters = this.game.add.group();
        
        // starting monsters
        for(let x = 0; x < 5; x++) {            
            let width = this.game.width - 20;
            let height = this.game.height * .20 * x;
            let monster = new Monster(this.game, width, height);            
            this.monsters.add(monster);
        }
        this.monsters.add(new Monster(this.game, 64, 120));
        this.monsters.add(new Monster(this.game, 64, 600));
        
        // initial tree obstacles
       
        this.trees.add(new Tree(this.game, 400, 70));
        this.trees.add(new Tree(this.game, 200, 150));
        this.trees.add(new Tree(this.game, 200, 450));
        this.trees.add(new Tree(this.game, 400, 370));
        this.trees.add(new Tree(this.game, 400, 300));
        this.trees.add(new Tree(this.game, 400, 230));
        this.trees.add(new Tree(this.game, 600, 450));
        this.trees.add(new Tree(this.game, 600, 150));
        
        
        this.cursors = this.game.input.keyboard.createCursorKeys();       
        this.game.stage.backgroundColor = "#FFFFFF";        
        this.game.input.keyboard.addKeyCapture([ Phaser.KeyCode.SPACEBAR ]);
    }
    
    update() {
        this.wizard.skate(this.cursors);
        this.monsters.callAll('munch');
        
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR) && this.wizard.alive === true ) {                  
            this.wizard.castSpell();
        }
        
        this.monsters.forEach(this.game.physics.arcade.moveToObject, this.game.physics.arcade, false, this.wizard, 150);
        
        this.game.physics.arcade.collide(this.wizard, this.trees);
        this.game.physics.arcade.collide(this.monsters, this.trees);        
        this.game.physics.arcade.collide(this.monsters, this.monsters);
        this.game.physics.arcade.overlap(this.wizard.spells, this.trees, this.spellTouchesTree, null, this);
        this.game.physics.arcade.overlap(this.wizard, this.monsters, this.monsterTouchesWizard, null, this);
        this.game.physics.arcade.overlap(this.wizard.spells, this.monsters, this.monsterShot, null, this);
    }
    
    spellTouchesTree(spell, tree) {
        spell.kill();
    }
    
    monsterTouchesWizard(wizard, monster) {;
        wizard.kill();        
        
        let explosion = this.game.add.sprite(128, 128, 'explosion');
        let explosionAnimantion = explosion.animations.add('explode');
        explosionAnimantion.onComplete.add(() => this.game.state.start('gameover'), this);
        
        explosion.reset(wizard.body.x, wizard.body.y);
        explosion.play('explode', 60, false, true);
        this.kaboomSoundEffect.play();
    }
    
    monsterShot(spell, monster) {
        spell.kill();
        
        this.shapeshiftSoundEffect.play();
        
        let tree = new Tree(this.game, monster.x, monster.y);
        this.trees.add(tree);
        
        monster.destroy();
        
        if(this.monsters.children.length === 0) {           
            this.victorySoundEffect.play();               
            this.game.state.start('win');
        }
    }
}