import ReactModal from "react-modal";

const ModalPopup = ({handleOpen, handleClose, Component, handleConfirm, data, style}) => {
  return (
    <div>
      <ReactModal isOpen={handleOpen} onRequestClose={handleClose} className={`${style}`}>
        <Component data={data} handleClose={handleClose} handleConfirm={handleConfirm}/>
      </ReactModal>
    </div>
  );
};

export default ModalPopup;
