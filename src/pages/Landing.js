import React from "react"
import { useLocalState } from "../store/authStore";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react"

const Landing = () =>{

  // const navigate = useNavigate();

  // useEffect(() => {
  //   // check if someone is logged in, if so then redirect
  //   const loggedInUser = localStorage.getItem("jwt");

  //   // if someone is logged in on page load then go to room selection
  //   if (loggedInUser) {
  //     navigate("/");
  //   }
  // });
  const [username, setUsername] =  useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  function SendLoginRequest(){

      const reqBody = {
        "username" : username,
        "password" : password
      }
    
      /*package.json -> proxy*/
      fetch("api/auth/login", {
        headers: {
          "Content-Type" : "application/json"
        },
        method: "post",
        body: JSON.stringify(reqBody)
      })
      .then((response) => {
        if (response.status === 200){
          return Promise.all([response.json(), response.headers])
        }
        else{
          return Promise.reject("invalid login attempt")
        }
      })
      .then(([body, headers]) => {
        const authValue = headers.get("authorization");
        localStorage.setItem('jwt', authValue);
        navigate("/");
        // setJwt(headers.get("authorization"));
        // window.location.href = "/"
      }).catch((message) => {
        alert(message);
      }); 
  }

  return (
    <>
      <div>
        <label htmlFor="username">Username</label>
        <input type="email" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password}onChange={(event) => setPassword(event.target.value)}/>
      </div>
      <div>
        <button id="submit" type="button" onClick={() => SendLoginRequest()}>
          Login
        </button>
      </div>
    </>
  );

  // const [jwt, setJwt] = useLocalState("", "jwt");

  // return(
  //   <div className="App">
  //     <div>{jwt}</div>
  //   </div>
  // );
};

export default Landing;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm, FormProvider } from "react-hook-form"; // This library adds field validation and makes submitting forms easier
// import { useDispatch } from "react-redux";

// import Form from "../components/Form/Form";
// import UserSelect from "../components/Form/Fields/UserSelect/UserSelect";
// import Button from "../components/UI/Button/Button";

// import { authActions } from "../store/authStore";

// const Landing = () => {
// //   const methods = useForm(); // initialize useform methods
// //   const navigate = useNavigate();

// //   // redux
// //   const dispatch = useDispatch();

// //   const loginHandler = () => {
// //     dispatch(authActions.login());
// //   };

// //   const users = ["Jordan", "Ethan", "Shelby", "Kado", "Eric"];

// //   const handleOnSubmit = (e) => {
// //     // get the value of the user selected in the drop down and use that value to get a matching user name from the array
// //     const userId = e.userSelect;
// //     const userName = users[e.userSelect - 1];

// //     // set local storage to persist login on page refresh
// //     localStorage.setItem("user", JSON.stringify({ userId, userName }));

// //     // redux login dispatch
// //     loginHandler();

// //     // go to room selection
// //     navigate("/");
// //   };

// //   useEffect(() => {
// //     // check if someone is logged in, if so then redirect
// //     const loggedInUser = localStorage.getItem("user");

// //     // if someone is logged in on page load then go to room selection
// //     if (loggedInUser) {
// //       navigate("/");
// //     }
// //   });

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-6 m-auto">
//           <FormProvider {...methods}>
//             <Form
//               action=""
//               id="userSelectForm"
//               classNames=""
//               onSubmit={methods.handleSubmit(handleOnSubmit)} // the methods.handleSubmit() is from 'react-hook-form', does some magic in the background to make form submission cleaner. Pass it your own custom form submission function
//             >
//               <UserSelect id="userSelect" label="Users:" />
//               <Button type="submit" id="submitLogin" classNames="btn-primary">
//                 Login
//               </Button>
//             </Form>
//           </FormProvider>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Landing;
