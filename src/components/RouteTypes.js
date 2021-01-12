import React from "react";
import { Route, Redirect } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export function ProtectedRoute({ component: Component, ...rest }) {
  const auth = JSON.parse(localStorage.getItem("AUTH"));

  return (
    <Route
      {...rest}
      render={(props) => {
        return auth ? (
          <React.Fragment>
            <NavigationBar {...props} />
            <Component {...props} />
          </React.Fragment>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location, applied: true },
            }}
          />
        );
      }}
    />
  );
}

export function PublicOnlyRoute({ component: Component, ...rest }) {
  // const refreshToken = useSelector((state) => state.auth.refreshToken);
  const auth = JSON.parse(localStorage.getItem("AUTH"));

  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? (
          <Component {...props} />
        ) : (
          // <div></div>
          <Redirect
            to={{
              // ${props.location}
              pathname: `/home`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
