import React from "react";
import { UilUsersAlt, UilConstructor } from "@iconscout/react-unicons";

import UserChart from "../../components/charts/UsersChart";
import Usertable from "../../components/dataTables/UserTable";
import CustomCard from "../../components/globals/CustomCard";
import "../../styles/usersAnalytics.css";

function UsersAnalytics() {
  return (
    <>
      <div className="users-analytics-layout">
        <div className="users-analytics-header">
          <CustomCard background_color="blue">
            <UilUsersAlt size="35" />
            <span className="global-card-title">Utenti Registrati</span>
            <span className="global-card-number">100</span>
          </CustomCard>

          <CustomCard background_color="yellow">
            <UilConstructor size="35" />
            <span className="global-card-title">Amministratori</span>
            <span className="global-card-number">5</span>
          </CustomCard>

          <div className="user-analytics-stats">
            <div className="users_stats">
              <h4>Utenti Totali: </h4>
              <span>570</span>
            </div>

            <div className="users_stats">
              <span>Nuovi Utenti</span>
              <span>15</span>
            </div>
          </div>
        </div>

        <div className="user-analytic-dash">
          <UserChart />
        </div>

        <div className="userman-table">
          <Usertable />
        </div>
      </div>
    </>
  );
}

export default UsersAnalytics;
