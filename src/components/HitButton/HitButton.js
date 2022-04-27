import React from 'react'

const HitButton = ({onClick}) => {
  return (
    <button onClick={onClick} className='buttons'>Hit</button>
  )
}

export default HitButton