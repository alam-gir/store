import Link from "next/link";
import React from "react";
import DashboardProductTableRow from "./DashboardProductTableRow";

const DashboardProductsTable = ({products}) => {
  console.log(products)
  return (
    <div className="product-table-container">
      <div className="product-table-wrapper">
        <table className="product-table">
          {/* header */}
          <thead className="product-table-header">
            <tr>
              <th scope="col" className="product-table-head">id</th>
              <th scope="col" className="product-table-head">name</th>
              <th scope="col" className="product-table-head">price</th>
              <th scope="col" className="product-table-head">brand</th>
              <th scope="col" className="product-table-head">category</th>
              <th scope="col" className="product-table-head">stock</th>
              <th scope="col" className="product-table-head">created date</th>
              <th scope="col" className="product-table-head">action</th>
            </tr>
          </thead>
          {/* body */}
          <tbody className="product-table-body">
            {products?.map(product => (
              <DashboardProductTableRow key={product._id} product={product}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardProductsTable;
