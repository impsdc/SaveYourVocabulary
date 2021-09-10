import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/style.scss";
import Index from "./views/Index";
import Login from "./views/Login";
import Research from "./views/Research";
import Account from "./views/Account";
import WordDetail from "./views/WordDetail";

import GuestRoute from "./_helpers/GuestRoute";
import PrivateRoute from "./_helpers/PrivateRoute";

import {ThemeProvider} from "styled-components"
import {useDarkMode} from "./components/ThemeMode"
import {LightTheme, DarkTheme, GlobalStyles} from "./constants/style"

const App: React.FC = () => {
  const [theme, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? LightTheme : DarkTheme;

  if(!mountedComponent) return <div/>
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Index} />
          <Route exact path="/search" component={Research} />
          <Route path="/account" component={Account} />
          <Route exact path="/word/:wordId" component={WordDetail} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
