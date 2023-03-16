import React from 'react'
import DashboardProductsTable from './DashboardProductsTable'

const DashboardProducts = ({products}) => {
  return (
    <div>
      <h1>all products</h1>
      <DashboardProductsTable products={products}/>
    </div>
  )
}

export default DashboardProducts