import axios from "axios";
import React, { Component, createContext } from "react";
import urljoin from "url-join";
import { refreshApolloAuthentication } from "../../services/api/apolloClient";
import { firebaseAuth } from "../../services/firebase";

interface UserContextType {
    user: firebase.User | null;
    loading: boolean;
}

/**
 * A wrapper that is used to store the user information. This is wrapped around the router
 * so that all of the child components get access to the user information.
 */

export const UserContext = createContext<UserContextType>({ user: null, loading: true });

class UserProvider extends Component {
    state = {
        user: null,
        loading: true,
    };

    componentDidMount = () => {
        firebaseAuth.onAuthStateChanged((userAuth) => {
            this.setState({ user: userAuth, loading: false });
            axios.post(urljoin(process.env.REACT_APP_ENDPOINT_URL || "", "ingestor", "userEmail"), {
                email: userAuth?.email,
            });
            refreshApolloAuthentication();
        });
    };
    render() {
        return <UserContext.Provider value={{ ...this.state }}>{this.props.children}</UserContext.Provider>;
    }
}

export default UserProvider;
