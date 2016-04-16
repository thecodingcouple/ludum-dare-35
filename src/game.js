import { Phaser } from 'phaser';
import { Load } from './states/load';
import { Menu } from './states/menu';
import { Play } from './states/play';

export class Game extends Phaser.Game{
    constructor() {
        super(800, 600, Phaser.AUTO, 'game-canvas', null);
        
        this.state.add('load', Load);
        this.state.add('menu', Menu);
        this.state.add('play', Play);
        
        this.state.start('load');
    }
    
}