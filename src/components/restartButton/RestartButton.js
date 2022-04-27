import React from 'react';

const RestartButton = ({onClick}) => {
  return (
    <button onClick={onClick} className='buttons'>Restart</button>
  )
};

export default RestartButton;