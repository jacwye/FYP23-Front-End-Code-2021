import { Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken } from "@capacitor/core";
import axios from "axios";
import urljoin from "url-join";
import { firebaseAuth } from "../firebase";
const { PushNotifications } = Plugins;
import { createBrowserHistory } from "history";

/**
 * Function for dealing with push notifications on the android app.
 * Only gets called from the app and has no effect on the web app.
 */
export default function registerToPushNotifications() {
    PushNotifications.register();

    /**
     * When registration is successfull, send the token to the backend
     * so that it can be saved in the database.
     */
    PushNotifications.addListener("registration", (token: PushNotificationToken) => {
        axios.post(urljoin(process.env.REACT_APP_ENDPOINT_URL || "", "ingestor", "androidAppFcm"), {
            email: firebaseAuth.currentUser?.email,
            appId: token.value,
        });
    });

    /**
     * When a user opens the push notification navigate to them to the sensor
     * page for the sensor thats was in the notification
     */
    PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification: PushNotificationActionPerformed) => {
            const data = notification.notification.data;
            const history = createBrowserHistory();
            history.push(`/machine/${data.machineId}/sensor/${data.sensorId}`);
            const pathUrl = window.location.href;
            window.location.href = pathUrl;
        },
    );
}
