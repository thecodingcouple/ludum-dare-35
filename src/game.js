import { Phaser } from 'phaser';
import { Load } from './states/load';
import { CutScene } from './states/cutscene';
import { Menu } from './states/menu';
import { Play } from './states/play';
import { GameOver } from './states/gameover';

export class Game extends Phaser.Game{
    constructor() {
        super(800, 600, Phaser.AUTO, 'game-canvas', null);
        
        this.state.add('load', Load);
        this.state.add('cutscene', CutScene);
        this.state.add('menu', Menu);
        this.state.add('play', Play);
        this.state.add('gameover', GameOver);
        
        this.state.start('load');
    }
    
}