const URL = "http://localhost:8080/sem-projekt/";
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function ApiFacade() {
  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password
    });

    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
      });
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const getTokenInfo = () => {
    let jwt = localStorage.getItem("jwtToken");
    let jwtData = jwt.split(".")[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData;
  };

  const setToken = token => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const fetchData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + options).then(handleHttpErrors);
  };

  const fetchFlightInfo = (
    startDate,
    cabinClass,
    arrival,
    destination,
    adults
  ) => {
    const options = makeOptions("GET", true);
    return fetch(
      URL +
        startDate +
        "/" +
        cabinClass +
        "/" +
        arrival +
        "/" +
        destination +
        "/" +
        adults,
      options
    ).then(handleHttpErrors);
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getTokenInfo,
    fetchFlightInfo
  };
}

const facade = ApiFacade();
export default facade;
