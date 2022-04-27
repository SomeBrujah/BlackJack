import React, { useEffect } from 'react'

const Player = ({name, score, cards, currenPlayerName}) => {
  console.log(`Component Player is mount.`)

  return (
    <div id={name} className={currenPlayerName === name ? 'active' : 'player_section section'}>
        <h1 id={name + '_name'} className='player_name section'>{name}</h1>
        <h1 id={name + '_score'} className='player_score section'>{score}</h1>
        <div id={name + 'cards'} className='player_cards'>{cards}</div>
    </div>
  )
}

export default Player