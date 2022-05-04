import React, { useEffect } from 'react';
import ActionButton from '../ActionButton/ActionButton';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Player from '../Player/Player';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';

const Game = ({ updateState, hitCurrentPlayer, standCurrentPlayer, restartGame, gameState }) => {
    const navigate = useNavigate();


    useEffect(() => {
        if (!gameState.token) {
            console.log('Need redirect to Login page');
            navigate('/login');
        }
        if (gameState.toLogin === true) {
            navigate('/login');
        }
        updateState();
    }, []);

    return (
        <div className='playing_field'>
            <div className='overlay' style={gameState.gameIsEnd === true ? { display: 'block' } : { display: 'none' }}>
                <div className='popup'>
                    <h1 className='resultText'>{gameState.result}</h1>
                    <ActionButton onClick={restartGame} title='Restart' disabled={gameState.loading ? true : false} />
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
                <ActionButton onClick={hitCurrentPlayer} title='Hit' />
                <ActionButton onClick={standCurrentPlayer} title='Stand' />
            </div>
        </div>
    )
}

export default Game