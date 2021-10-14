import { useMutation, useQuery } from "@apollo/client";
import { IonButton, IonContent, IonLabel, IonPage, IonSpinner } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UPDATE_MACHINE } from "../common/graphql/mutations/machines";
import { CREATE_USER, SUBSCRIBE_TO_MACHINE, UNSUBSCRIBE_FROM_MACHINE } from "../common/graphql/mutations/users";
import { GET_MACHINE_BY_ID } from "../common/graphql/queries/machines";
import { GET_USER_BY_EMAIL } from "../common/graphql/queries/users";
import Error404 from "../components/ErrorMessage";
import Heading from "../components/Heading";
import HealthContainer from "../components/HealthContainer";
import NotificationContainer from "../components/NotificationContainer";
import { createUser } from "../types/createUser";
import { getMachineById } from "../types/getMachineById";
import { getUserByEmail } from "../types/getUserByEmail";
import { subscribeToMachine } from "../types/subscribeToMachine";
import { SensorData } from "../types/types";
import { unsubscribeFromMachine } from "../types/unsubscribeFromMachine";
import { useUserContext } from "../utils/useUserContext";
import { ChangeNotificationsModal } from "./modals/ChangeNotificationsModal";
import "./Page.css";

/**
 * All of the logic for displaying the sensors page.
 */

const Sensors: React.FC = () => {
    const [disabled, setDisabled] = useState(false);
    const { id } = useParams<{ id: string }>();

    const [updateMachine] = useMutation(UPDATE_MACHINE);
    const machine_data = useQuery<getMachineById>(GET_MACHINE_BY_ID, {
        variables: { id: id },
        pollInterval: 5000,
    });

    const [changeNotificationsOpen, setChangeNotificationsOpen] = useState(false);
    const userContext = useUserContext();
    const userEmail = userContext.user?.email;
    const userQuery = useQuery<getUserByEmail>(GET_USER_BY_EMAIL, {
        variables: { email: userEmail },
    });

    let userId = userQuery.data?.user_email?.id;
    const [createUserMutation] = useMutation<createUser>(CREATE_USER);

    const [isSubscribed, setSubscribed] = useState(
        userQuery.data?.user_email?.machinesSubscribed?.some(function (machine) {
            return String(machine?.id) == id;
        }),
    );

    let subButtonMessage: string;
    const [unsubscribeMutation] = useMutation<unsubscribeFromMachine>(UNSUBSCRIBE_FROM_MACHINE);
    const [subscribeMutation] = useMutation<subscribeToMachine>(SUBSCRIBE_TO_MACHINE);
    if (isSubscribed) {
        subButtonMessage = "Unsubscribe from Machine";
    } else {
        subButtonMessage = "Subscribe to Machine";
    }

    const handleSubscribe = async () => {
        // Used to stop button spamming
        if (disabled) {
            return;
        }
        setDisabled(true);

        if (!userId) {
            const newUser = await createUserMutation({
                variables: {
                    email: userEmail,
                },
            });
            userId = newUser.data?.createUser?.user?.id;
            setSubscribed(false);
        }

        if (isSubscribed) {
            try {
                const result = await unsubscribeMutation({
                    variables: {
                        userId: userId,
                        machineId: id,
                    },
                }).then(() => {
                    setDisabled(false);
                });
            } catch (e) {
                console.log(e);
            }

            setSubscribed(false);
            subButtonMessage = "Subscribe to Machine";
        } else {
            try {
                const result = await subscribeMutation({
                    variables: {
                        userId: userId,
                        machineId: id,
                    },
                }).then(() => {
                    setDisabled(false);
                });
            } catch (e) {
                console.log(e);
            }

            setSubscribed(true);
            subButtonMessage = "Unsubscribe from Machine";
        }
    };

    const userEmails = userQuery.data?.user_email?.emails;
    const [subscribedEmails, setSubscribedEmails] = useState(machine_data.data?.machine?.subscribers);
    const [unacknowledged, setUnacknowledged] = useState(
        machine_data.data?.machine?.notificationStatus == "Unacknowledged",
    );
    const [acknowledged, setAcknowledged] = useState(machine_data.data?.machine?.notificationStatus == "Acknowledged");

    const handleAcknowledgement = () => {
        setUnacknowledged(false);
        setAcknowledged(true);
    };

    const handleFixing = () => {
        updateMachine({ variables: { id: id, input: { notificationStatus: "Working" } } });
        setAcknowledged(false);
    };

    useEffect(() => {
        setSubscribedEmails(machine_data.data?.machine?.subscribers);
        setUnacknowledged(machine_data.data?.machine?.notificationStatus == "Unacknowledged");
        setAcknowledged(machine_data.data?.machine?.notificationStatus == "Acknowledged");
    }, [machine_data]);

    const allSensors = machine_data.data?.machine?.sensors;

    const processHealthContainer = (name: string, sensorData: SensorData[], healthStatus: any, sensorId: string) => {
        if (sensorData && sensorData.length > 0) {
            const latestSensorValue = latestSensorData(sensorData);
            return (
                <HealthContainer
                    name={name}
                    value={latestSensorValue}
                    health={healthStatus}
                    machineId={id}
                    id={sensorId}
                    key={id}
                />
            );
        }
    };

    const latestSensorData = (data: SensorData[]) => {
        const sortedData = data.slice().sort((a, b) => {
            const firstDate: Date = new Date(a.timestamp._seconds);
            const secondDate: Date = new Date(b.timestamp._seconds);

            return secondDate.getTime() - firstDate.getTime();
        });

        return sortedData[0].value;
    };

    const displayOperatingStatus = () => {
        if (machine_data.data?.machine?.operatingStatus) {
            return (
                <div className="responsive-width grid grid-cols-1 m-auto mt-3 text-center pt-1 pb-1 border border-white rounded">
                    <IonLabel className="text-lg text-center p-3">{`Machine Status: ${machine_data.data?.machine?.operatingStatus}`}</IonLabel>
                </div>
            );
        } else {
            return (
                <div className="text-center m-2 p-3">
                    <IonLabel className="text-lg text-center">Machine Status: Unknown</IonLabel>
                </div>
            );
        }
    };

    return (
        <IonPage>
            {userEmails && subscribedEmails && (
                <ChangeNotificationsModal
                    open={changeNotificationsOpen}
                    setOpen={setChangeNotificationsOpen}
                    userEmails={userEmails}
                    subscribedEmails={subscribedEmails}
                    machineID={id}
                    setSubscribedEmails={setSubscribedEmails}
                />
            )}
            <Heading title={machine_data.data?.machine?.name} />
            <IonContent color="new">
                {machine_data.loading && userQuery.loading ? (
                    <div className="flex w-full h-full justify-center items-center">
                        <IonSpinner className="w-16 h-16" color="light" />
                    </div>
                ) : machine_data.data?.machine ? (
                    <>
                        <div>{displayOperatingStatus()}</div>
                        <div className="download text-center">
                            <IonButton
                                shape="round"
                                color="light"
                                className="responsive-width text-lg normal-case m-4"
                                onClick={handleSubscribe}
                            >
                                {subButtonMessage}
                            </IonButton>
                        </div>
                        {unacknowledged && (
                            <NotificationContainer
                                type={"Acknowledgement"}
                                handleAcknowledge={handleAcknowledgement}
                                handleFixed={handleFixing}
                            />
                        )}
                        {acknowledged && (
                            <NotificationContainer
                                type={"Fixed"}
                                handleAcknowledge={handleAcknowledgement}
                                handleFixed={handleFixing}
                            />
                        )}
                        <div className="pb-20">
                            {allSensors && allSensors.length > 0 ? (
                                allSensors
                                    .slice()
                                    .sort((a, b) =>
                                        a.healthStatus > b.healthStatus
                                            ? 1
                                            : a.healthStatus === b.healthStatus
                                            ? a.name > b.name
                                                ? 1
                                                : -1
                                            : -1,
                                    )
                                    .map((sensor) =>
                                        processHealthContainer(
                                            sensor.name,
                                            sensor.sensorData,
                                            sensor.healthStatus,
                                            sensor.id,
                                        ),
                                    )
                            ) : (
                                <Error404 message="You have not subscribed to any sensors for this machine. Please add a sensor." />
                            )}
                        </div>
                    </>
                ) : (
                    <Error404 message="This machine does not exist" />
                )}
                <div className="flex justify-center pb-20">
                    <IonButton className="text-center" onClick={() => setChangeNotificationsOpen(true)}>
                        Change Notification Settings
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Sensors;
