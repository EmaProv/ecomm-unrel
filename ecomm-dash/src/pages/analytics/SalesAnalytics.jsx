import React from "react";
import {
  UilArrowGrowth,
  UilShoppingBag,
  UilEuroCircle,
  UilAngleDoubleUp,
  UilAngleDoubleDown,
  UilClock,
  UilPlus,
} from "@iconscout/react-unicons";
import Recentlysell from "../../components/dataTables/RecetsellTable";
import LightWarehouseTable from "../../components/DataTables/lightTables/LightWHTable";

import SellChart from "../../components/charts/SellChart";
import BuyChart from "../../components/charts/BuyChart";
import EarnChart from "../../components/charts/EarnChart";
import MontlySummaryChart from "../../components/charts/MonthlySummary";

import CustomCard from "../../components/globals/CustomCard";
import { Link } from "react-router-dom";
import "../../styles/salesAnalytics.css";

function SalesAnalytics() {
  return (
    <>
      <div className="sales-analytics-layout">
        <div className="sales-analytics-header">
          <CustomCard background_color="green">
            <span className="global-card-title">
              <UilAngleDoubleDown size="25" />
              Entrate
            </span>
            <span className="global-card-number">100</span>
          </CustomCard>

          <CustomCard background_color="red">
            <span className="global-card-title">
              <UilAngleDoubleUp size="25" />
              Uscite
            </span>
            <span className="global-card-number">100</span>
          </CustomCard>

          <CustomCard background_color="yellow">
            <span className="global-card-title">
              <UilEuroCircle size="25" />
              Guadagno
            </span>
            <span className="global-card-number">20,069</span>
          </CustomCard>
        </div>

        <div className="sales-analytics-actions">
          <Link to="/sales-analytics">
            <button type="button" className="custom_btn">
              <span className="custom_btn_txt">Add Sale</span>
              <span className="custom_btn_ico">
                <UilPlus />
              </span>
            </button>
          </Link>
        </div>

        <div className="sales-analytics-graph-cont">
          <SellChart />
          <BuyChart />
        </div>

        <div className="sales-analytics-graph-cont2">
          <div id="earnChart">
            <EarnChart />
          </div>

          <MontlySummaryChart />
        </div>

        <div className="sales-analytics-table-cont">
          <div className="sales-analytics-table">
            <h5>Ordini</h5>
            <Recentlysell />
          </div>
        </div>
      </div>
    </>
  );
}
export default SalesAnalytics;
