import React, { useEffect, useState } from 'react'
import FormInput from '../FormInput/FormInput';
import { useNavigate } from 'react-router-dom';

const Login = ({ loginInGame, gameState }) => {
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(gameState.token) {
      navigate('/game');
    }
  }, [gameState.token])

  console.log(gameState);
  const [inputs, setInput] = useState([<FormInput index={1} key={1}/>, <FormInput index={2} key={2}/>]);

  const removePlayer = () => {
    const newState = inputs;
    setInput(() => {
      return newState
    })
  };

  const addPlayer = () => {
    setInput(() => {
      return [...inputs, <FormInput index={inputs.length + 1} removeFunc={removePlayer} key={inputs.length + 1} />];
    })
    console.log()
  };

  const handleSubmit = () => {
    const nameFields = document.querySelectorAll('input[type=text]');
    const playerNames = [];
    nameFields.forEach((player)=>{
      if(player.value) {
        playerNames.push(player.value);
      }
    })

    loginInGame(playerNames);
  }
  return (
    <div className='login_modale'>
      <form className='login_form' onSubmit={handleSubmit} id='sendForm'>
        {inputs}
        <button className='buttons' type='button' onClick={addPlayer} key='buttonAddPlayers'>Add Player</button>
        <button className='buttons' type='button' onClick={handleSubmit} key='buttonShowData'>Go to game</button>
      </form>
    </div>
  )
}

export default Login