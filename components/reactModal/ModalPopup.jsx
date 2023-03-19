import ReactModal from "react-modal";

const ModalPopup = ({isOpen, handleClose, Component, handleConfirm, data, style}) => {
  return (
    <div>
      <ReactModal isOpen={isOpen} onRequestClose={handleClose} className={`${style}`}>
        <Component data={data} handleClose={handleClose} handleConfirm={handleConfirm}/>
      </ReactModal>
    </div>
  );
};

export default ModalPopup;
