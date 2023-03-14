import React from "react";

const Button = ({
  textColor,
  bgColor,
  text,
  textSize,
  px,
  handleClick,
  type,
}) => {
  return (
    <button
      onClick={handleClick}
      className={`${textColor} ${bgColor} ${textSize} capitalize rounded-lg flex justify-center px-4 ${px} font-semibold  py-1.5 hover:brightness-90 `}
      type={type}>
      {text}
    </button>
  );
};

export default Button;
