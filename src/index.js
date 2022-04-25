import { Game } from './game.js';
import { Player } from './player';
import { inizializePlayersZone, addCart } from './additionalFunctions.js';
import './style/reset.scss'
import './style/style.scss'

const hitButton = document.querySelector('.hit');
const standButton = document.querySelector('.stand');
const cardDesk = document.querySelector('.card_desk');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');

const game = new Game([new Player('Alex'), new Player('Roman'), new Player('Jack')]);
game.start();
inizializePlayersZone(cardDesk, game.players);
game.players.forEach((player)=>{
    for(let i = 0; i < 2; i++){
        addCart(player, player.cards[i]);
    }
})
const arrayOfPlayersZone = document.querySelectorAll('.player_section');
const arrayOfPlayersScore = document.querySelectorAll('.score');

hitButton.addEventListener('click', () => {
    if(game.gameIsEnd === true) {
        return;
    }
    addCart(game.currentPlayer, game.currentPlayer.cards[game.currentPlayer.cards.length - 1]);
    game.currentPlayer.hit();
});

standButton.addEventListener('click', () => {
    game.currentPlayer.stand();
});

const gameLoop = setInterval(function(){
    // Check current player for adjusting his zone
    for(let i = 0; i < game.players.length; i++) {
        if (arrayOfPlayersZone[i].id === game.currentPlayer.name) {
            arrayOfPlayersZone[i].style.borderColor = 'white';
        } else {
            arrayOfPlayersZone[i].style.borderColor = '#556b2f';
        }
    }
    // Check players score and output those
    for(let i = 0; i < game.players.length; i++) {
        arrayOfPlayersScore[i].textContent = game.players[i].scores;
        if(game.players[i].scores>21) {
            arrayOfPlayersScore[i].style.color = 'red';
        }
    }
    // Check state of all players
    if(game.gameIsEnd === true) {
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }
    // Render visual part for all player
      // Check player move
      
}, 1000);

export default game;