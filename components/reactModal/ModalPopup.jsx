import { XMarkIcon } from "@heroicons/react/24/outline";
import ReactModal from "react-modal";

const ModalPopup = ({hadnleOpen, hadnleClose, Component, data, style}) => {
  return (
    <div>
      <ReactModal isOpen={hadnleOpen} onRequestClose={hadnleClose} className={`${style}`}>
        <XMarkIcon  onClick={hadnleClose} className="modal-close-icon"/>
        <Component data={data}/>
      </ReactModal>
    </div>
  );
};

export default ModalPopup;
