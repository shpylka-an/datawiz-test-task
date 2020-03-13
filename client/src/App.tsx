import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import "antd/dist/antd.css";
import Navbar from "./components/navbar";
import { Provider } from "mobx-react";
import authStore from "./store/auth"

const stores = {
  authStore
};

authStore.checkIsLoggedIn();

const App = () => (
  <Provider {...stores}>
    <Router>
      <Navbar />
      <Routes />
    </Router>
  </Provider>
);

export default App;
