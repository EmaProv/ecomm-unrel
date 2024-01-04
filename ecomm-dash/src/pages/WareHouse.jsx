import React from "react";
import { UilBox, UilPlus } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

import CustomCard from "../components/globals/CustomCard";
import SellChart from "../components/charts/SellChart";
import WarehouseTable from "../components/DataTables/WarehouseTable";
import "../styles/warehouse.css";

function WareHouse() {
  return (
    <>
      <div className="warehouse-layout">
        <div className="warehouse-header">
          <CustomCard background_color="blue">
            <span className="global-card-title">
              <UilBox size="25" />
              Products
            </span>
            <span className="global-card-number">10</span>
          </CustomCard>

          <CustomCard background_color="yellow">
            <UilBox size="25" />
            <span className="global-card-title">Recetly Sales</span>
            <span className="global-card-number">10</span>
          </CustomCard>

          <CustomCard background_color="violet">
            <UilBox size="25" />
            <span className="global-card-title">Recently Buy</span>
            <span className="global-card-number">10</span>
          </CustomCard>
        </div>

        <div className="warehouse-action">
          <Link to="/add-product">
            <button type="button" className="custom_btn">
              <span className="custom_btn_txt">Add Item</span>
              <span className="custom_btn_ico">
                <UilPlus />
              </span>
            </button>
          </Link>
        </div>

        <div className="warehouse-table">
          <WarehouseTable />
        </div>
      </div>
    </>
  );
}
export default WareHouse;
