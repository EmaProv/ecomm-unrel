import React from "react";
import {
  UilBox,
  UilShoppingBag,
  UilConstructor,
  UilUsersAlt,
  UilGoogleDriveAlt,
  UilDiscord,
  UilTelegram,
} from "@iconscout/react-unicons";

import CustomCard from "../components/globals/CustomCard";

import UserChart from "../components/charts/UsersChart";
import SellChart from "../components/charts/SellChart";
import BuyChart from "../components/charts/BuyChart";
import LightWarehouseTable from "../components/DataTables/lightTables/LightWHTable";
import RecenteellTable from "../components/dataTables/RecetsellTable";

import { Link } from "react-router-dom";

import "../styles/home.css";

function Home({ mgr }) {
  return (
    <>
      <div className="home-layout">
        <div className="home-card-cont">
          <div className="home-card-info-cont">
            <h4>Overall Info</h4>

            <div className="home-card-info-flex">
              <CustomCard background_color="blue">
                <span className="global-card-title">
                  <UilBox size="25" />
                  Copped
                </span>
                <span className="global-card-number">10</span>
              </CustomCard>
              <CustomCard background_color="violet">
                <span className="global-card-title">
                  <UilBox size="25" />
                  Users
                </span>
                <span className="global-card-number">10</span>
              </CustomCard>
              <CustomCard background_color="yellow">
                <span className="global-card-title">
                  <UilBox size="25" />
                  Saled
                </span>
                <span className="global-card-number">10</span>
              </CustomCard>
            </div>
          </div>

          <div className="home-card-actions-cont">
            <h4>Quick Actions</h4>
            <div className="home-card-actions">
              <Link to="/add-product">
                <div className="home-actions-btn-cont">
                  <div className="home-actions-btn">
                    <UilBox className="home-actions-btn-ico" />
                  </div>
                  <span>Add Product</span>
                </div>
              </Link>

              {mgr && (
                <Link to="/add-admin">
                  <div className="home-actions-btn-cont">
                    <div className="home-actions-btn">
                      <UilConstructor className="home-actions-btn-ico" />
                    </div>
                    <span>Add Admin</span>
                  </div>
                </Link>
              )}
              <Link to="/">
                <div className="home-actions-btn-cont">
                  <div className="home-actions-btn">
                    <UilUsersAlt className="home-actions-btn-ico" />
                  </div>
                  <span>Add User</span>
                </div>
              </Link>
              <Link to="/">
                <div className="home-actions-btn-cont">
                  <div className="home-actions-btn">
                    <UilShoppingBag className="home-actions-btn-ico" />
                  </div>
                  <span>Add Order</span>
                </div>
              </Link>
              <a
                href="https://www.google.com/"
                aria-label="Google Drive"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="home-actions-btn-cont">
                  <div className="home-actions-btn">
                    <UilGoogleDriveAlt className="home-actions-btn-ico" />
                  </div>
                  <span>Øbliq Drive</span>
                </div>
              </a>
              <a
                href="https://www.google.com/"
                aria-label="Discord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="home-actions-btn-cont">
                  <div className="home-actions-btn">
                    <UilDiscord className="home-actions-btn-ico" />
                  </div>
                  <span>Discord</span>
                </div>
              </a>
              <a
                href="https://www.google.com/"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="home-actions-btn-cont">
                  <div className="home-actions-btn">
                    <UilTelegram className="home-actions-btn-ico" />
                  </div>
                  <span>Telegram</span>
                </div>
              </a>
            </div>

            <div className="home-warehouse">
              <Link to="/warehouse">
                <h4>Last Cop</h4>
              </Link>
              <LightWarehouseTable className="home-warehouse-table" />
            </div>
            <div className="home-order">
              <Link to="/add-item">
                <h4>Ordini</h4>
              </Link>
              <RecenteellTable className="home-warehouse-table" />
            </div>
          </div>
        </div>

        <div className="home-charts">
          <div className="home-chart-single">
            <BuyChart />
          </div>
          <div className="home-chart-single">
            <SellChart />
          </div>
          <div className="home-chart-single">
            <UserChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
