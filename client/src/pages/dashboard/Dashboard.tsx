import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { AuthStore } from "../../store/auth";
import { inject, observer } from "mobx-react";
import DashboardTable from "./dashboard-table";
import Chart from "./chart";

interface DashboardProps {
  authStore: AuthStore;
}

@inject("authStore")
@observer
class Dashboard extends Component<DashboardProps> {
  render() {
    const { isLoggedIn } = this.props.authStore;

    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div style={{padding: 40}}>
        <DashboardTable/>
        <Chart/>
      </div>
    );
  }
}

export default Dashboard;
