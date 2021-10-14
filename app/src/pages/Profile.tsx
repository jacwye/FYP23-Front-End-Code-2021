import { useMutation, useQuery } from "@apollo/client";
import {
    IonAvatar,
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonList,
    IonModal,
    IonPage,
    IonRow,
} from "@ionic/react";
import { add, trash } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { UPDATE_USER_EMAILS } from "../common/graphql/mutations/users";
import { GET_USER_BY_EMAIL } from "../common/graphql/queries/users";
import Heading from "../components/Heading";
import { getUserByEmail } from "../types/getUserByEmail";
import { useUserContext } from "../utils/useUserContext";
import "./Profile.css";

/**
 * All of the logic for displaying the Profile page
 */

const Profile: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const userContext = useUserContext();
    const [newEmail, setNewEmail] = useState("");
    const [updateUserEmails] = useMutation(UPDATE_USER_EMAILS);
    const userEmail = userContext.user?.email;
    const userQuery = useQuery<getUserByEmail>(GET_USER_BY_EMAIL, {
        variables: { email: userEmail },
    });

    const [emails, setEmails] = useState(userQuery.data?.user_email?.emails!);

    const userId = userQuery.data?.user_email?.id;

    // When the component is loaded, set the emails with the emails received after
    // executing the user query
    useEffect(() => {
        setEmails(userQuery.data?.user_email?.emails!);
    }, [userQuery]);

    function changeNewEmail(emailAddress) {
        setNewEmail(emailAddress);
    }

    function addNewEmail() {
        setEmails([...emails, newEmail]);
        setNewEmail("");
    }

    function removeEmail(index) {
        const removedEmail = emails[index];
        setEmails(
            emails.filter((email) => {
                return email != removedEmail;
            }),
        );
    }

    function saveEmailChanges() {
        updateUserEmails({ variables: { userId: userId, emails: emails } });
        setShowModal(false);
    }

    return (
        <IonPage>
            <Heading title="Industry 4.0" showProfile={false} />

            <IonContent color="new">
                <div className="responsive-width mt-10 ml-auto mr-auto py-5 h-38 bg-white rounded-lg">
                    <div className="responsive-width m-auto items-center flex justify-center flex-col">
                        <IonAvatar className="w-32 h-32 ">
                            <img src={userContext.user?.photoURL || ""} />
                        </IonAvatar>
                        <p className="text-black mt-3">{userContext.user && userContext.user!.displayName}</p>
                        <p className="text-black">{userContext.user && userContext.user!.email}</p>
                    </div>
                </div>
                <div className="m-6">
                    <IonButton
                        className="responsive-width m-auto flex items-center justify-center w-full"
                        onClick={() => setShowModal(true)}
                    >
                        Configure Email Addresses
                    </IonButton>
                </div>
                {emails && (
                    <IonModal
                        backdrop-dismis
                        backdropDismiss={true}
                        onDidDismiss={() => setShowModal(false)}
                        isOpen={showModal}
                        cssClass="profile-ion-modal"
                    >
                        <IonContent className="p-3 flex justify-center flex-col">
                            <div className="p-3 flex justify-center flex-col">
                                <IonList>
                                    {emails.map((email, index) => (
                                        <IonItem key={index}>
                                            <IonInput className="w-2/3" value={email}></IonInput>
                                            {email?.toString() != userEmail?.toString() ? (
                                                <IonButton
                                                    className="remove-button pl-3"
                                                    onClick={() => removeEmail(index)}
                                                >
                                                    <IonIcon slot="icon-only" icon={trash} />
                                                </IonButton>
                                            ) : (
                                                <IonButton
                                                    className="remove-button pl-3"
                                                    onClick={() => removeEmail(index)}
                                                    disabled={true}
                                                >
                                                    <IonIcon slot="icon-only" icon={trash} />
                                                </IonButton>
                                            )}
                                        </IonItem>
                                    ))}
                                    <IonItem>
                                        <IonInput
                                            className="w-2/3"
                                            onIonChange={(e) => changeNewEmail((e.target as HTMLInputElement).value)}
                                            placeholder="Enter a new Email address"
                                            value={newEmail}
                                        ></IonInput>
                                        <IonButton className="remove-button pl-3" onClick={() => addNewEmail()}>
                                            <IonIcon slot="icon-only" icon={add} />
                                        </IonButton>
                                    </IonItem>
                                </IonList>
                            </div>
                            <IonGrid>
                                <IonRow>
                                    <IonCol col-6>
                                        <div className="flex justify-center">
                                            <IonButton className="w-4/5" onClick={() => setShowModal(false)}>
                                                Cancel
                                            </IonButton>
                                        </div>
                                    </IonCol>
                                    <IonCol col-6>
                                        <div className="flex justify-center">
                                            <IonButton className="w-4/5" onClick={() => saveEmailChanges()}>
                                                Save
                                            </IonButton>
                                        </div>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonContent>
                    </IonModal>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Profile;
