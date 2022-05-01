import React from 'react'

const ActionButton = ({ onClick, title, disabled}) => {
  return (
    <button onClick={onClick} className='buttons' disabled={disabled}>{title}</button>
  )
}

export default ActionButton;