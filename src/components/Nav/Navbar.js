

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// //import { useSelector, useDispatch } from "react-redux";

// import Button from "../UI/Button/Button";

// //import { authActions } from "../../store/authStore";

// import "./Navbar.scss";

// const Navbar = () => {
//   // const navigate = useNavigate();

//   // redux
//   // const dispatch = useDispatch();
//   // const loggedIn = useSelector((state) => state.auth.loggedIn);

//   // const logoutHandler = () => {
//   //   dispatch(authActions.logout());
//   // };

//   // const loginHandler = () => {
//   //   dispatch(authActions.login());
//   // };

//   // const handleOnClick = () => {
//   //   localStorage.clear();

//   //   logoutHandler();

//   //   navigate("/landing");
//   // };

//   // useEffect(() => {
//   //   const loggedInUser = localStorage.getItem("user");
//   //   if (loggedInUser) {
//   //     loginHandler();

//   //     // convert string user local user data back to object
//   //     // const usrObj = JSON.parse(loggedInUser);

//   //     // setUserName(usrObj["userName"]);
//   //   } else {
//   //     logoutHandler();
//   //   }
//   // });

//   return (
//     <nav className="navbar navbar-dark bg-dark text-light">
//       <div className="container-fluid justify-content-center">
//         {loggedIn ? (
//           <React.Fragment>
//             <div className="login-status d-flex justify-content-center">
//               <div className="login-name">
//                 <h2>
//                   {JSON.parse(localStorage.getItem("user"))["userName"]} -&nbsp;
//                 </h2>
//               </div>
//               <div className="logout-btn">
//                 <Button
//                   type="button"
//                   onClick={handleOnClick}
//                   id="logoutBtn"
//                   classNames="btn-secondary"
//                 >
//                   Logout
//                 </Button>
//               </div>
//             </div>
//           </React.Fragment>
//         ) : (
//           <div className="login-status">
//             <h2>Please Log In</h2>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
