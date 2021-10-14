import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { LoginPage } from "./pages/auth/LoginPage";
import { FullPageLoader } from "./pages/FullPageLoader";
import Machines from "./pages/Machines";
import Profile from "./pages/Profile";
import Sensor from "./pages/Sensor";
import Sensors from "./pages/Sensors";
import { useUserContext } from "./utils/useUserContext";

// Render the following components if the user has not logged in
const UnauthenticatedUserRoutes: React.FC = () => {
    return (
        <Switch>
            <Route path="/login" render={(props) => <LoginPage {...props} />} exact={true} />
            <Route path="/" render={() => <Redirect to={`/login`} />} />
        </Switch>
    );
};

// Render the following components if the user has logged in. Depending on
// the URL that the user is accessing the corresponding component will get
// rendered. E.g. - If user goes to '/machine' then the 'Machines' component
// get rendered.
const AppRoutes: React.FC = () => {
    return (
        <>
            <Switch>
                <Route path="/machine/:id" component={Sensors} exact />
                <Route path="/machine/:machineid/sensor/:id" component={Sensor} exact />
                <Route path="/machine" component={Machines} exact />
                <Route path="/profile" component={Profile} exact />
                <Route path="/" render={() => <Redirect to={`/machine`} />} />
            </Switch>
        </>
    );
};

export const AppRouter: React.FC = () => {
    const userContext = useUserContext();

    if (userContext.loading) {
        return <FullPageLoader />;
    }

    if (!userContext.user) {
        return <UnauthenticatedUserRoutes />;
    }

    return <AppRoutes />;
};
