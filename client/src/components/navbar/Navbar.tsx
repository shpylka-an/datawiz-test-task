import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { AuthStore } from "../../store/auth";

interface NavbarProps extends RouteComponentProps {
  authStore: AuthStore;
}

@inject("authStore")
@observer
class Navbar extends Component<NavbarProps> {
  render() {
    const { isLoggedIn, logout } = this.props.authStore;
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: "64px" }}
        selectedKeys={[this.props.location.pathname]}
      >
        {!isLoggedIn && (
          <Menu.Item key="/login">
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
        {isLoggedIn && (
          <Menu.Item key="/dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
        )}
        {isLoggedIn && (
          <Menu.Item key="/logout" onClick={logout}>
            Logout
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

export default withRouter<RouteComponentProps, any>(Navbar);
