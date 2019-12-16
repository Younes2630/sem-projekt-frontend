// import React, { useState, useEffect } from "react";
// import facade from "../apiFacade";
// function LoggedIn() {
//   const [apiData, setApiData] = useState({ msg: "Fetching" });

//   useEffect(() => {
//     facade.fetchData().then(res => {
//       setApiData(res);
//       console.log(res);
//     });
//   }, []);

//   return (
//     <div>
//       <h2>Getting data from API</h2>
//       <h3>{apiData.msg}</h3>
//     </div>
//   );
// }
// export default LoggedIn;