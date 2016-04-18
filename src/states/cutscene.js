import { Phaser } from 'phaser';
import { Wizard } from '../sprites/wizard';

export class CutScene extends Phaser.State{
    
    create() {
        this.story = ["Press 's' to skip intro...","",
             "The trees at the frozen lake are becoming plant-demons.",
             "Don thine ice skates and turneth those evil folk back into trees!"];
             
        let textStyle = {font: '22px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};
        
        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, '', textStyle);
        this.text.anchor.set(0.5);
        this.text.setScaleMinMax(1);
        
        this.line = [];
        this.wordIndex = 0;
        this.lineIndex = 0;
        
        this.wordDelay = 120;
        this.lineDelay = 400;
        this.listener = () => this.nextState();
        
        this.sKey = this.game.input.keyboard.addKey(Phaser.KeyCode.S);
        this.sKey.onDown.addOnce(this.listener);  
        
        this.nextLine();  
        
        this.wizard = new Wizard(this.game, 400, 300);
        this.game.add.existing(this.wizard);
        this.game.camera.follow(this.wizard, Phaser.Camera.FOLLOW_LOCKON);
        
    }
    
    nextLine() {
        if (this.lineIndex === this.story.length) {
            this.game.time.events.add(400, this.startZoom, this);
            return;
        }
        this.line = this.story[this.lineIndex].split(' ');
        this.wordIndex = 0;
        this.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);
        this.lineIndex++;
    } 

    nextWord() {
        this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");
        this.wordIndex++;
        if (this.wordIndex === this.line.length) {
            this.text.text = this.text.text.concat("\n");
            this.game.time.events.add(this.lineDelay, this.nextLine, this);
        }
    }
    
    startZoom() {
        this.text.destroy();
        this.game.time.events.add(400, this.zoomIn, this);  
    } 
    
    zoomIn() {
        let scale = this.game.world.scale.x + 0.5;
        this.game.world.scale.setTo(scale);
        
        if (this.game.world.scale.x < 8) {
            this.game.time.events.add(400, this.zoomIn, this);
        } else {
            this.nextState();
        }
    }
    
    nextState(){
        this.game.world.scale.setTo(1);
        this.sKey.onDown.remove(this.listener); 
        this.game.state.start('menu');
    }
      
    
}