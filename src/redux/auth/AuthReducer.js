import { SET_AUTH, HYDRATE_AUTH, CLEAR_AUTH } from "./AuthTypes";

export const authReducer = (state = {}, { type, payload }) => {
  switch (type) {
    // called when [just logged in, refreshing tokens]
    case SET_AUTH:
      let toStore = { ...state, ...payload };
      localStorage.setItem("AUTH", JSON.stringify(toStore));
      return toStore;
    case HYDRATE_AUTH:
      const data = JSON.parse(localStorage.getItem("AUTH"));
      // console.log("REPRIME_STORE_AUTH - data from storage");
      // console.log(JSON.stringify(data));
      if (data) {
        return { ...state, ...data };
      } else {
        return state;
      }

    case CLEAR_AUTH:
      localStorage.removeItem("AUTH");
      return {};

    default:
      return state;
  }
};

// export default authReducer = (state, action) => {
//   switch (action.type) {
//     case SET_AUTH:
//       return { ...state, refreshToken: action.payload };
//     // case REMOVE_REF_TOKEN:

//     default:
//       return state;
//   }
// };

// export default authReducer;

// import React, { useState } from "react";
// import { Route } from "react-router-dom";

// import { useSelector, useDispatch } from "react-redux";
// import jwt_decode from "jwt-decode";
// import { getAuth } from "../redux/auth/actions";
// import store from "../redux/store";

// export const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const auth = useSelector((state) => state);
//   // console.log(auth);
//   // const refTok = useSelector((state) => state.auth.refreshToken);

//   // let decodedTok = {};
//   // let isLoggedIn;

//   // try {
//   //   let a = jwt_decode(refTok);
//   //   // console.log("JASD");
//   //   decodedTok = a;
//   //   // console.log(JSON.stringify(a));
//   //   console.log(a.exp > new Date());
//   //   console.log(a.exp < new Date());
//   //   isLoggedIn = a.exp < new Date();
//   // } catch (error) {
//   //   console.log(error);
//   // }
//   // const dispatch = useDispatch();

//   React.useEffect(() => {
//     store.dispatch(getAuth());
//   }, []);

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         // console.log(rest);
//         // if()
//         return (
//           <div>
//             {/* <h5>{JSON.stringify(auth)}</h5> */}
//             <pre className="text-left">{JSON.stringify(auth, null, 2)}</pre>
//             {/* <pre className="text-left">
//               {JSON.stringify(isLoggedIn, null, 2)}
//             </pre> */}
//             <Component {...props} />
//           </div>
//         );
//       }}
//     />
//   );
// };
