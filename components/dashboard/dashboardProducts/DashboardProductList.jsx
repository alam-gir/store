import Confirmation from "@/components/confirmation/Confirmation";
import { productDeleteConfirmationModalState } from "@/lib/atom/modalOpenState";
import ReactModal from "react-modal";
import { useRecoilState } from "recoil";

const DashboardProductList = ({
  product: { id, name, price, brand, category, stock, createdAt },
  handleClick,
}) => {
  const [isOpenDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useRecoilState(productDeleteConfirmationModalState);

  const handleDelete = () => {
    console("confirm");
  };
  return (
    <div
      onClick={(e) => {
        // e.stopPropagation()
        // handleClick()
        // i should put onclick here but i tried to solve stopProgation. but i Failed. thats why i put onclik in every data box.
      }}
      className="product-table-list group  text-md"
    >
      <h2 onClick={handleClick} className="product-table-data font-medium px-4">
        {id}
      </h2>
      <h2 onClick={handleClick} className="product-table-data">
        {name.slice(0, 10)}
      </h2>
      <h2 onClick={handleClick} className="product-table-data">
        {price}
      </h2>
      <h2 onClick={handleClick} className="product-table-data">
        {brand}
      </h2>
      <h2 onClick={handleClick} className="product-table-data hidden md:inline">
        {category}
      </h2>
      <h2 onClick={handleClick} className="product-table-data hidden md:inline">
        {stock}
      </h2>
      <h2 onClick={handleClick} className="product-table-data hidden md:inline">
        {createdAt.toString().slice(0, 9)}
      </h2>
      <h2
        onClick={(e) => {
          e.stopPropagation();
          setOpenDeleteConfirmationModal(true);
          console.log("delete clicked");
        }}
        className="product-table-data delete-btn"
      >
        delete
      </h2>
      <div>
      <ReactModal
          isOpen={isOpenDeleteConfirmationModal}
          onRequestClose={() => setOpenDeleteConfirmationModal(false)}
          className="product-update-confirmation-modal"
        >
          <Confirmation handleConfirm={handleDelete} handleClose={() => setOpenDeleteConfirmationModal(false)}/>
        </ReactModal>
      </div>
    </div>
  );
};

export default DashboardProductList;
