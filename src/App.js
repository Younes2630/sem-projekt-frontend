import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import "./App.css";
import facade from "./apiFacade";
import LogIn from "./components/LogIn";
import LoggedIn from "./components/LoggedIn";
import Persons from "./components/Persons";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then(res => setLoggedIn(true))
      .catch(err => console.log("Incorrect username or password"));
  };
  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            {!loggedIn ? (
              <LogIn login={login} />
            ) : (
                <div className="main">
                  <div className="wrap">
                    <LoggedIn />
                    <button onClick={logout}>Logout</button>
                  </div>
                </div>
              )}
          </Route>
          <Route path="/persons"><Persons facade={facade} /></Route>
        </Switch>
      </Router>

    </div>
  );
}

const Header = () => {
  return (
    <ul className="menu">
      <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
      <li><NavLink to="/persons" activeClassName="active">Persons</NavLink></li>
    </ul>
  );
}

export default App;
