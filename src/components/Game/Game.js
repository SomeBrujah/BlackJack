import React, { useEffect } from 'react';
import HitButton from '../HitButton/HitButton';
import StandButton from '../StandButton/StandButton';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import Player from '../Player/Player';
import Card from '../Card/Card';
import RestartButton from '../restartButton/RestartButton';

const Game = ({ updateState, hitCurrentPlayer, standCurrentPlayer, restartGame, gameState }) => {
    console.log('Component game is mount');
    useEffect(() => {
        updateState()
    }, []);

    return (
        <div className='playing_field'>
            <div className='overlay' style={gameState.gameIsEnd === true ? {display:'block'} : {display:'none'}}>
                <div className='popup'>
                    <h1 className='resultText'>{gameState.result}</h1>
                    <RestartButton onClick={restartGame}/>
                </div>
            </div>
            <div className='card_desk'>
                {!gameState.loading
                    ? gameState.players.map((player) => {
                        return <Player key={player.name + '_id'}
                            name={player.name}
                            score={player.scores}
                            cards={player.cards.map((card, index) => {
                                return <Card key={`${index}${card.value}${card.suit}`}
                                suit={card.suit}
                                value={card.value}
                                />
                            })}
                            currenPlayerName={gameState.currentPlayer.name}
                        />
                    })
                    : <LoadingSpinner text={'Загрузка игроков'} />}
            </div>
            <div className='sidebar'>
                <div className='card_deck'></div>
                <HitButton onClick={hitCurrentPlayer}/>
                <StandButton onClick={standCurrentPlayer}/>
            </div>
        </div>
    )
}

export default Game