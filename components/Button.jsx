import React from "react";

const Button = ({textColor, bgColor, text, textSize, handleClick, type}) => {
  const btnTextClr = textColor ? textColor : "text-zinc-900";
  const btnBgClr = bgColor ? bgColor : "bg-zinc-300";

  return (
    <button
      onClick={handleClick}
      className={`${btnTextClr} ${btnBgClr} ${textSize} text-center w-full capitalize font-semibold py-2 tracking-wide hover:brightness-90 rounded-md`}
      type={type}>
      {text}
    </button>
  );
};

export default Button;
