import React from 'react'

const FormInput = ({index, removeFunc}) => {
    return (
        <label className='form_input' key={`${index}set`}>
            Player {index}:
            <input type='text' id={`Player${index}`}/>
            <button onClick={removeFunc} type='button'>X</button>
        </label>
    )
}

export default FormInput