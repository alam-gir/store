import ReactModal from "react-modal";

const ModalPopup = ({handleOpen, handleClose, Component, data, style}) => {
  return (
    <div>
      <ReactModal isOpen={handleOpen} onRequestClose={handleClose} className={`${style}`}>
        <Component data={data} handleClose={handleClose}/>
      </ReactModal>
    </div>
  );
};

export default ModalPopup;
