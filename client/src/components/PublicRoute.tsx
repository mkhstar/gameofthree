import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";

interface Props extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps>
    | React.ComponentType<any>;
}

const PublicRoute: React.FC<Props> = ({ component: Page, ...rest }) => {
  const fullName = localStorage.getItem("fullName");

  return (
    <Route
      {...rest}
      render={(props) =>
        !fullName ? (
          <Page {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/game",
              state: { referrer: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
