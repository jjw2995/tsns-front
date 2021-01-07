import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export function ProtectedRoute({ component: Component, ...rest }) {
  // const loggedIn = useSelector((state) => state.auth);
  // const loggedIn = JSON.parse(localStorage.getItem("AUTH")).refreshToken;
  const loggedIn = JSON.parse(localStorage.getItem("AUTH"));

  console.log("@ ProtectedRoute, loggedIn: ", loggedIn);
  return (
    // <Route
    //   {...rest}
    //   render={(props) =>
    //     loggedIn === true ? (
    //       <React.Fragment>
    //         <NavigationBar {...props} />
    //         <Component {...props} />
    //       </React.Fragment>
    //     ) : (
    //       <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    //     )
    //   }
    // />
    <Route
      {...rest}
      render={(props) =>
        loggedIn === true ? (
          <React.Fragment>
            <NavigationBar {...props} />
            <Component {...props} />
          </React.Fragment>
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

export function PublicOnlyRoute({ component: Component, ...rest }) {
  // const loggedIn = useSelector((state) => state.auth);
  // const loggedIn = JSON.parse(localStorage.getItem("AUTH")).refreshToken;
  const loggedIn = JSON.parse(localStorage.getItem("AUTH"));
  // console.log({ ...rest }.location);

  return (
    <Route
      {...rest}
      render={(props) =>
        !loggedIn === true ? (
          <Component {...props} />
        ) : (
          <div></div>
          // <Redirect
          //   to={{
          //     // ${props.location}
          //     pathname: `/home`,
          //     state: { from: props.location },
          //   }}
          // />
        )
      }
    />
  );
}
// export default ProtectedRoute;
