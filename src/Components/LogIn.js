// import React, { useState } from "react";

// function LogIn(props){

//     const[user, setUser] = useState({username: "", password: ""});

   
//     function handleChange (event) {
//         const target = event.target;
//         const id = target.id;
//         const value = target.value;
//         setUser({value});
//     };

//     function handleLogin(event) {
//         event.preventDefault();
//         props.login(user.username, user.password);
//     };

//     return(
//     <div>
            
//         <form onSubmit={handleLogin} onChange={handleChange}>
//         <h1>Log in as a user</h1>
//         <input id="username" placeholder="Username" /><br /> 
//         <input id="password" placeholder="Password" /><br />
//         <button>Login</button>
//         </form>
//         {JSON.stringify(user)}
//     </div>
//     );
// }
// export default LogIn;