import { Game } from './game.js';
import { Player } from './player';
import { inizializePlayersZone, addCart } from './additionalFunctions.js';
import './style/reset.scss'
import './style/style.scss'

const hitButton = document.querySelector('.hit');
const standButton = document.querySelector('.stand');
const cardDesk = document.querySelector('.card_desk');

const game = new Game([new Player('Alex'), new Player('Roman'), new Player('Jack')]);
game.start();

hitButton.addEventListener('click', () => {
    
});

standButton.addEventListener('click', () => {

});