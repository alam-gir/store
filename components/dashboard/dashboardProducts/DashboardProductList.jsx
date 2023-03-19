const DashboardProductList = ({
  product: { _id, id, name, price, brand, category, stock, createdAt },
  openProductUpdateModal,
  openDeleteConfirmationModal,
}) => {
  return (
    <div className="product-table-list group  text-md">
      <h2
        onClick={openProductUpdateModal}
        className="product-table-data font-medium px-4"
      >
        {id}
      </h2>
      <h2 onClick={openProductUpdateModal} className="product-table-data">
        {name.slice(0, 10)}
      </h2>
      <h2 onClick={openProductUpdateModal} className="product-table-data">
        {price}
      </h2>
      <h2 onClick={openProductUpdateModal} className="product-table-data">
        {brand}
      </h2>
      <h2
        onClick={openProductUpdateModal}
        className="product-table-data hidden md:inline"
      >
        {category}
      </h2>
      <h2
        onClick={openProductUpdateModal}
        className="product-table-data hidden md:inline"
      >
        {stock}
      </h2>
      <h2
        onClick={openProductUpdateModal}
        className="product-table-data hidden md:inline"
      >
        {createdAt.toString().slice(0, 9)}
      </h2>
      <h2
        onClick={openDeleteConfirmationModal}
        className="product-table-data delete-btn"
      >
        delete
      </h2>
    </div>
  );
};

export default DashboardProductList;
