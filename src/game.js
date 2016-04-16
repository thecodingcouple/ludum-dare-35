import { Phaser } from 'phaser';
import { Start } from './states/start'

export class Game extends Phaser.Game{
    constructor() {
        super(800, 600, Phaser.AUTO, 'game-canvas', null);
        this.state.add('Start', Start);
        this.state.start('Start');
    }
    
}