import React from 'react'

const Button = ({textColor, bgColor, text, textSize, handleClick}) => {
  return (
    <button onClick={handleClick} className={`${textColor} ${bgColor} ${textSize} capitalize rounded-md flex justify-center px-4 py-1.5 hover:brightness-90`}>{text}</button>
  )
}

export default Button