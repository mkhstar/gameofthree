import { RouteComponentProps } from "react-router";

export interface AppPrivateRouteProps extends RouteComponentProps {
    fullName: string;
}