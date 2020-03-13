import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { AuthStore } from "../../store/auth";
import { inject, observer } from "mobx-react";

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

    return <h1>Dashboard</h1>;
  }
}

export default Dashboard;
