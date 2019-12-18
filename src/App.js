import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";
import facade from "./ApiFacade";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    window.history.pushState("/");
  };

  const login = (user, password) => {
    facade
      .login(user, password)
      .then(res => setLoggedIn(true))
      .catch(err => console.log("Incorrect username or password"));
    window.history.pushState("/");
  };

  return (
    <div>
      <Router>
        <Route>
          <ul className="header">
            <li>
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/readme">
                README
              </NavLink>
            </li>

            <li>
              <NavLink activeClassName="active" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </Route>
      </Router>

      <ContentPaths />
    </div>
  );
}

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [userCreds, setUserCreds] = useState(init);

  const performLogin = evt => {
    evt.preventDefault();
    login(userCreds.username, userCreds.password);
  };

  const onChange = evt => {
    setUserCreds({
      ...userCreds,
      [evt.target.id]: evt.target.value
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}

const ContentPaths = ({ login, props }) => {
  return (
    <Router>
      {" "}
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <LogIn login={login} />
      </Route>
      {/* <Route path="/readme">
        <Readme />
      </Route> */}
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <h3>Welcome</h3>
      <SearchFlight />
    </div>
  );
};

const FlightData = flightInfo => {
  return (
    <div>
      <h3>Flight information</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Flight Duration</th>
            <th>Logo</th>
            <th>Agent</th>
            <th>Carrier</th>
            <th>Price</th>
            <th>Booking</th>
          </tr>
        </thead>
        <tbody>
          {flightInfo.map((flight, index) => {
            return (
              <tr key={index}>
                <td>
                  <img
                    src={flight.imageUrl}
                    height="auto"
                    width="100%"
                    alt="Ups"
                  ></img>
                </td>
                <td>{flight.agentsName}</td>
                <td>{flight.carrierName}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{flight.departure}</td>
                <td>{flight.arrival}</td>
                <td>{flight.flightDuration} min</td>
                <td>{flight.price} kr. </td>
                <td>
                  <button>
                    <a href={flight.deeplinkUrl} target="_blank">
                      Confirm booking:
                    </a>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const SearchFlight = ({ flightinfo }) => {
  const [state, setState] = useState({
    outboundDate: "",
    cabinClass: "economy",
    destination: "",
    adults: "1",
    arrival: ""
  });
  const [listData, setListData] = useState([]);

  function handleSearchFlight(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setState({
      ...flightinfo,
      [name]: value
    });
    state.outboundDate
      .split("-")
      .reverse()
      .join("-");
    facade
      .fetchFlightInfo(
        state.outboundDate,
        state.cabinClass,
        state.arrival,
        state.destination,
        state.adults
      )
      .then(res => {
        setListData(res);
      });
  }

  return (
    <div>
      <form>
        <input
          type="text"
          name="arrival"
          placeholder="Departure"
          onChange={handleSearchFlight}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          onChange={handleSearchFlight}
        />
        <input
          type="date"
          name="outboundDate"
          onChange={handleSearchFlight}
          required
        />
        <input
          type="number"
          name="adults"
          placeholder="1"
          min="1"
          size="4"
          onChange={handleSearchFlight}
        />
        <select name="cabinClass" onChange={handleSearchFlight}>
          <option value="economy">Economy</option>
          <option value="premiumeconomy">Premium Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>
        <button onClick={handleSubmit}>Search</button>
      </form>
      <div>{FlightData(listData)}</div>
    </div>
  );
};

export default App;
