import { useContext } from "react";
import { UserContext } from "../pages/auth/UserProvider";

/**
 * Create a context so that data can be accessed anywhere in the app
 * without needing to pass data from a parent to child component
 */
export const useUserContext = () => {
    return useContext(UserContext);
};
