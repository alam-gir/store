import { crudOrderState } from "@/lib/atom/dashboard/crudOrder";
import { fetchPOST } from "@/lib/fetch/fetch";
import { CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

const InputField = ({ type, name, value, placeholder }) => {
  // * states

  const setCrudOrderAction = useSetRecoilState(crudOrderState);
  const [disableEdit, setDisableEdit] = useState(true);
  const [newValue, setNewValue] = useState(value);
  const [updateRes, setUpdateRes] = useState({ isLoading: false, res: "" });
  const inputRef = useRef();
  const router = useRouter();
  const orderId = router.query.orderId;

  // * arrow functions
  const handleChange = (e) => {
    setNewValue(e.target.value);
  };

  const handleUpdate = async () => {
    // start loading
    setUpdateRes((prev) => ({ ...prev, isLoading: true }));

    // update logic
    const res = await fetchPOST(
      `/api/db/orders/neworders/${orderId}?field=${name}&value=${newValue}`
    );

    // disable edit mode
    setDisableEdit(true);

    // stop loading
    setUpdateRes((prev) => ({ ...prev, isLoading: false }));

    // change crud action state for refetch
    setCrudOrderAction((prev) => !prev);
  };

  const isDisableSaveButton = () => {
    if (value === newValue) return true;
    if (updateRes.isLoading) return true;
    return false;
  };

  // * effects

  useEffect(() => {
    if (disableEdit) return;
    inputRef?.current?.focus();
  }, [disableEdit]);

  return (
    // styles in globar
    <div className="InputField">
      <label htmlFor={name}>{name}</label>
      <input
        onChange={handleChange}
        ref={inputRef}
        type={type}
        value={newValue}
        placeholder={placeholder}
        id={name}
        name={name}
        disabled={disableEdit}
        className={!disableEdit ? "border border-gray-500 px-2" : ""}
      />
      <div className="edit">
        {disableEdit ? (
          <button
            onClick={() => {
              setDisableEdit(false);
            }}
            className={`group ${!disableEdit ? "!bg-red-400 " : ""} `}
          >
            <PencilIcon className="icon group-hover:text-gray-600" />
          </button>
        ) : (
          <button
            onClick={() => {
              setDisableEdit(false);
              handleUpdate();
            }}
            className="group disabled:brightness-75"
            disabled={isDisableSaveButton()}
          >
            <CheckIcon className="icon group-hover:text-gray-600" />
          </button>
        )}
        {disableEdit ? null : (
          <button
            onClick={() => {
              setDisableEdit(true);
              // if cancel set new valuew = prev value
              setNewValue(value);
            }}
            className="group"
          >
            <XMarkIcon className="icon h-4 w-4 group-hover:text-red-400" />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
