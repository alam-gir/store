import React from "react";

const Button = ({
  textColor,
  bgColor,
  text,
  Icon,
  textSize,
  customStyle,
  iconCustomStyle,
  handleClick,
  type,
  disable,
}) => {
  const btnTextClr = textColor ? textColor : "text-zinc-900";
  const btnBgClr = bgColor ? bgColor : "bg-zinc-300";

  return (
    <button
      onClick={handleClick}
      className={`${btnTextClr} ${customStyle} ${textSize} flex justify-center items-center text-center w-full capitalize font-semibold py-2 tracking-wide rounded-md hover:brightness-90 shadow-lg ${
        disable ? "brightness-75 cursor-not-allowed" : ""
      }`}
      disabled={disable}
      type={type}
    >
      {text}
      <Icon className={iconCustomStyle} />
    </button>
  );
};

export default Button;
