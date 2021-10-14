import { IonButton, IonContent, IonIcon, IonPage, IonTitle, isPlatform } from "@ionic/react";
import { cfaSignInGoogle } from "capacitor-firebase-auth";
import firebase from "firebase";
import { logoGoogle } from "ionicons/icons";
import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import registerToPushNotifications from "../../services/notifications/pushNotificationService";

const uiConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
    callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
            console.log(authResult);
            return true;
        },
    },
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/",
};

const handleGoogleNativeSignIn = () => {
    cfaSignInGoogle().subscribe(() => {
        registerToPushNotifications();
    });
};

/**
 * Page which has the logic for displaying the necessary components that
 * let the user sign in to the application
 */

export const LoginPage: React.FC<any> = () => {
    return (
        <IonPage>
            <IonContent color="new">
                <div className=" h-full w-full items-center flex justify-center flex-col">
                    <div className="text-center my-4">
                        <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
                        <IonTitle className="text-5xl font-heading">Industry 4.0</IonTitle>
                        <h2 className="text-2xl text-gray-300 font-heading">
                            Monitor your machines like never before.
                        </h2>
                    </div>
                    {isPlatform("android") ? (
                        <IonButton className="w-auto" onClick={() => handleGoogleNativeSignIn()}>
                            <IonIcon slot="icon-only" className="pr-2" icon={logoGoogle} /> {"Sign in with Google"}
                        </IonButton>
                    ) : (
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
};
