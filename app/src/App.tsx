import { ApolloProvider } from "@apollo/client";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import UserProvider from "./pages/auth/UserProvider";
import Machines from "./pages/Machines";
import Sensor from "./pages/Sensor";
import Sensors from "./pages/Sensors";
import { apolloClient } from "./services/api/apolloClient";
import "./theme/main.css";
/* Theme variables */
import "./theme/variables.css";

// Render the relevant components that are part of the app
const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <ApolloProvider client={apolloClient}>
                    <IonSplitPane contentId="main">
                        <IonRouterOutlet id="main">
                            <Route path="/machine/:id" component={Sensors} exact />
                            <Route path="/machine/:machineid/sensor/:id" component={Sensor} exact />
                            <Route path="/machine" component={Machines} exact />
                            <Redirect from="/" to="/machine" exact />
                        </IonRouterOutlet>
                    </IonSplitPane>
                    <UserProvider>
                        <AppRouter />
                    </UserProvider>
                </ApolloProvider>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
