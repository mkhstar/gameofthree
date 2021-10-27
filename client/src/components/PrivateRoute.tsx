import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { socket } from "../helpers/socket";
import { useAuth } from "../hooks/useAuth";
import { AppPrivateRouteProps } from "../types/AppPrivateRouteProps";

interface Props extends RouteProps {
  component:
    | React.ComponentType<AppPrivateRouteProps>
    | React.ComponentType<any>;
}

const PrivateRoute: React.FC<Props> = ({ component: Page, ...rest }) => {
  const fullName = localStorage.getItem("fullName");
  const {
    authAction: { setIsAuthenticated },
  } = useAuth();

  useEffect(() => {
    if (fullName && !socket.connected) {
      socket.auth = { fullName };
      setIsAuthenticated(true);
      socket.connect();
    }
  }, [fullName]);

  return (
    <Route
      {...rest}
      render={(props) =>
        fullName ? (
          <Page {...props} fullName={fullName} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { referrer: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
