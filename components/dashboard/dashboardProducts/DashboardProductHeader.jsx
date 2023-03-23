import Button from '@/components/Button'
import Searchbar from '@/components/searchbar/Searchbar'
import { FunnelIcon, PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'

const DashboardProductHeader = ({ handleOpenAddProductForm, handleChangeSearch, searchValue,}) => {
  return (
    <div className="dashboard-product-header">
          <div className="left">
            <div className="btn-container add-products">
              {/* add products btn  */}
              <Button
                handleClick={handleOpenAddProductForm}
                text={"add Products"}
                Icon={PlusIcon}
                customStyle="btn"
                iconCustomStyle="icon"
              />
            </div>
            <h1 className="text">
              results:{" "}
              <span>
                {searchValue.trim() ? `${searchValue}` : "all products"}
              </span>
            </h1>
          </div>
          <div className="right">
            {/* filter btn container  */}
            <div className="searchbar-container search">
              <Searchbar
                handleChange={handleChangeSearch}
                value={searchValue}
                placeholder={"search products..."}
              />
            </div>
            {/* search btn container  */}
            <div className="btn-container filter">
              {/* add products btn  */}
              <Button
                handleClick={handleOpenAddProductForm}
                text={"filter"}
                Icon={FunnelIcon}
                customStyle="btn"
                iconCustomStyle="icon"
              />
            </div>
          </div>
        </div>
  )
}

export default DashboardProductHeader