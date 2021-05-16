import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./assets/style.scss";
import index from "./views/index";
import login from "./views/login";
import search from "./views/search";
import account from "./views/account";
import logOut from "./views/logout";

import GuestRoute from "./_helpers/GuestRoute";
import PrivateRoute from "./_helpers/PrivateRoute";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <GuestRoute exact path="/login" component={login} />
          <GuestRoute exact path="/logout/" component={logOut} />
          <PrivateRoute exact path="/" component={index} />
          <PrivateRoute exact path="/search" component={search} />
          <PrivateRoute exact path="/account" component={account} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
