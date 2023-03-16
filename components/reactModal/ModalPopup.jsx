import ReactModal from "react-modal";

const ModalPopup = ({isOpen, hadnleCloseProductModal}) => {
  return (
    <div>
      <ReactModal isOpen={isOpen} onRequestClose={hadnleCloseProductModal}>
        <div>this is modal</div>
      </ReactModal>
    </div>
  );
};

export default ModalPopup;
