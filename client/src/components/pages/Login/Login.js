import React, { useState } from 'react'
import FormInput from './FormInput';
import axios from 'axios';

const Login = () => {
  const [inputs, setInput] = useState([]);
  
  const removePlayer = () =>{
    const newState = inputs;
    setInput(()=>{
     return newState
    })
  };

  const addPlayer = () => {
    setInput(()=>{
      return [...inputs, <FormInput index={inputs.length+1} removeFunc={removePlayer} key={inputs.length+1}/>];
    })
    console.log()
  };

  const handleSubmit = () => {
    const el = document.getElementById('sendForm');
    const arr = el.elements;
    const req = [];
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].value) {
        req.push(`${arr[i].value}`);
        console.log(arr[i].value);
      }
    }
  }
  return (
    <div className='login_modale'>
      <form className='login_form' onSubmit={handleSubmit} id='sendForm'>
        <label className='form_input'key={'email_key'}>
          Email: 
          <input type='text' id='email_form' />
        </label>
        {inputs}
        <button type='button' onClick={addPlayer} key='buttonAddPlayers'>Add Player</button>
        <button type='button' onClick={handleSubmit} key='buttonShowData'>Show data of form</button>
        <button type='submit' key='sendRequest'>Send</button>
      </form>
    </div>
  )
}

export default Login