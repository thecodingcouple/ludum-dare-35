import { Phaser } from 'phaser';

export class CutScene extends Phaser.State{
    
    create() {
        this.story = ["The trees at the frozen lake are becoming plant-demons.",
             "Don thine ice skates and turneth those evil folk back into trees!",
             "Press 's' to continue..."];
             
        let textStyle = {font: '22px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};
        
        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, '', textStyle);
        this.text.anchor.set(0.5);
        
        this.line = [];
        this.wordIndex = 0;
        this.lineIndex = 0;
        
        this.wordDelay = 120;
        this.lineDelay = 400;
        
        let sKey = this.game.input.keyboard.addKey(Phaser.KeyCode.S);
        sKey.onDown.addOnce( () => this.game.state.start('menu'));  
        
        this.nextLine();  
    }
    
    nextLine() {
        if (this.lineIndex === this.story.length){
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
    
    
}