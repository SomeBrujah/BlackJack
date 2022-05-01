import React from 'react';

const Card = ({value, suit}) => {
  return (
    <div className='card'>
        <div className='card_upper'>{value}{suit}</div>
        <div className='card_bottom'>{value}{suit}</div>
    </div>
  )
};

export default Card;