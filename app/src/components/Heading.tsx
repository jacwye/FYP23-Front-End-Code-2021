import { IonAlert, IonAvatar, IonButton, IonHeader, IonIcon, IonTitle, IonToolbar, isPlatform } from "@ionic/react";
import { cfaSignOut } from "capacitor-firebase-auth";
import { arrowBack, logOut } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../services/firebase";
import { useUserContext } from "../utils/useUserContext";

interface HeadingProps {
    title: string | null | undefined;
    showBackButton?: boolean;
    showProfile?: boolean;
}

/**
 * Component for displaying the header. The header is shown on all of the pages
 */

const Heading: React.FC<HeadingProps> = ({ title, showBackButton = true, showProfile = true }) => {
    const userContext = useUserContext();
    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();

    return (
        <IonHeader>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={"Logout Confirmation"}
                message={"Are you sure you want to logout?"}
                buttons={[
                    {
                        text: "Cancel",
                        role: "cancel",
                        cssClass: "secondary",
                        handler: (blah) => {
                            setShowAlert(false);
                        },
                    },
                    {
                        text: "Okay",
                        handler: () => {
                            if (isPlatform("android")) {
                                cfaSignOut().subscribe();
                            } else {
                                firebaseAuth.signOut();
                            }
                        },
                    },
                ]}
            />
            <IonToolbar color="dark">
                <div className="w-full flex  items-center">
                    <IonButton
                        fill="clear"
                        onClick={() => history.goBack()}
                        className={!showBackButton ? "hidden" : ""}
                        color="light"
                        size="small"
                    >
                        <IonIcon slot="icon-only" icon={arrowBack}></IonIcon>
                    </IonButton>
                    <div className="block flex-grow">
                        <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
                        <IonTitle className="text-base xl:text-2xl font-heading">
                            {title ? title : "Industry 4.0"}
                        </IonTitle>
                    </div>
                    <Link to={`/profile`}>
                        <div className={!showProfile ? "hidden" : "flex flex-row justify-self-end items-center"}>
                            <p className="mx-2 hidden md:block mr-7">{userContext.user && userContext.user!.email}</p>
                            <IonAvatar className="w-8 h-8">
                                <img src={userContext.user?.photoURL || ""} />
                            </IonAvatar>
                        </div>
                    </Link>
                    <IonButton fill="clear" onClick={() => setShowAlert(true)}>
                        <IonIcon size="small" color="danger" slot="icon-only" icon={logOut} />
                    </IonButton>
                </div>
            </IonToolbar>
        </IonHeader>
    );
};

export default Heading;
