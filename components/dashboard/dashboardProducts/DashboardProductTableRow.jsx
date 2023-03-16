
const DashboardProductTableRow = ({product, handleClick}) => {
  return (
    <tr onClick={handleClick} className="product-table-body-row group">
      <td className="product-table-data font-medium">{product?.id}</td>
      <td className="product-table-data">{product?.name}</td>
      <td className="product-table-data">{product?.price}</td>
      <td className="product-table-data">{product?.brand}</td>
      <td className="product-table-data">{product?.category}</td>
      <td className="product-table-data">{product?.stock}</td>
      <td className="product-table-data">{product?.createdAt.toString()}</td>
      <td className="product-table-data">delete edit</td>
    </tr>
  );
};

export default DashboardProductTableRow;
