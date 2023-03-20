import Button from "@/components/Button";
import Searchbar from "@/components/searchbar/Searchbar";
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import DashboardProductsTable from "./DashboardProductsTable";

const DashboardProducts = () => {
  const [searchValue, setSearchValue] = useState('')
  const handleChangeSearch = (e)=> {
    setSearchValue((e.target.value))
  }
  return (
    <div>
      <div className="dashboard-product-wrapper">
        <div className="dashboard-product-header">
          <div className="btn-container">
            <Button text={"add Products"} Icon={PlusIcon} customStyle="btn" iconCustomStyle="icon"/>
          </div>
          <h1 className="text">results: <span>{"all products"}</span></h1>
          <div className="searchbar-container">
            <Searchbar handleChange={handleChangeSearch} value={searchValue} placeholder={"search products..."}/>
          </div>
        </div>
        {/* <DashboardProductsTable/> */}
      </div>
    </div>
  );
};

export default DashboardProducts;
