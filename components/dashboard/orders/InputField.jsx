import { CheckIcon, PencilIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";

const InputField = ({ type, name, value, placeholder }) => {
  const [disableEdit, setDisableEdit] = useState(true);
  const inputRef = useRef();
  useEffect(() => {
    if (disableEdit) return;
    inputRef?.current?.focus();
  }, [disableEdit]);
  return (
    <div className="InputField">
      <label htmlFor={name}>{name}</label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        placeholder={placeholder}
        id={name}
        name={name}
        disabled={disableEdit}
        className={!disableEdit ? "border border-gray-500 px-2" : ""}
      />
      <div className="edit">
        <button
          onClick={() => {
            setDisableEdit((prev) => !prev);
          }}
          className={`group ${!disableEdit ? "!bg-red-400 " : ""} `}
        >
          {disableEdit ? (
            <PencilIcon className="icon group-hover:text-gray-600" />
          ) : (
            <CheckIcon className="icon group-hover:text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
};

export default InputField;
