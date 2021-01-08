import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export function ProtectedRoute({ component: Component, ...rest }) {
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  // window.scrollTo(0, 0);

  return (
    <Route
      {...rest}
      render={(props) => {
        return refreshToken ? (
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
  const refreshToken = useSelector((state) => state.auth.refreshToken);

  return (
    <Route
      {...rest}
      render={(props) =>
        !refreshToken ? (
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
