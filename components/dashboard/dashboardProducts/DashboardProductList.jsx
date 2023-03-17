
const DashboardProductList = ({product:{id, name, price, brand, category, stock, createdAt}, handleClick}) => {
  return (
    <div onClick={handleClick} className="product-table-list group  text-md">
      <h2 className="product-table-data font-medium px-4">{id}</h2>
      <h2 className="product-table-data">{name.slice(0,10)}</h2>
      <h2 className="product-table-data">{price}</h2>
      <h2 className="product-table-data">{brand}</h2>
      <h2 className="product-table-data hidden md:inline">{category}</h2>
      <h2 className="product-table-data hidden md:inline">{stock}</h2>
      <h2 className="product-table-data hidden md:inline">{createdAt.toString().slice(0,9)}</h2>
      <h2 onClick={(e)=> {
        e.stopPropagation()
        console.log("delete")}} className="product-table-data delete-btn">delete</h2>
    </div>
  );
};

export default DashboardProductList;
