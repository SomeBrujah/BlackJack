import React from 'react'
import Game from '../Game/index';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/game' element={<Game />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='*' element={<Game />}/>
      </Routes>
      <Game />
    </div>
  )
}

export default App;