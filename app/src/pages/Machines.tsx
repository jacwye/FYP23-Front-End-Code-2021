import { useMutation, useQuery } from "@apollo/client";
import {
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonLabel,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonSpinner,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useState } from "react";
import { UPDATE_MACHINE } from "../common/graphql/mutations/machines";
import { GET_MACHINES } from "../common/graphql/queries/machines";
import { GET_USER_BY_EMAIL } from "../common/graphql/queries/users";
import ColourKey from "../components/ColourKey";
import Error404 from "../components/ErrorMessage";
import Heading from "../components/Heading";
import MachineGrid from "../components/MachineGrid";
import { getMachines, getMachines_machines } from "../types/getMachines";
import { getUserByEmail } from "../types/getUserByEmail";
import { useUserContext } from "../utils/useUserContext";
import { MachineModal } from "./modals/MachineModal";
import "./Page.css";

/**
 * All of the logic for displaying the Machines page. The initial bit of code
 * is used to set up the variables that are going to be used in the component.
 */

const Machines: React.FC = () => {
    const machinesQuery = useQuery<getMachines>(GET_MACHINES);
    const [addMachineOpen, setAddMachineOpen] = useState<boolean>(false);
    const [showAll, setShow] = useState(true);
    const [selectedValue, setSelectedValue] = useState("all");
    const [updateMachine] = useMutation(UPDATE_MACHINE);

    // Sort machines by health status
    // (critical, moderate, nominal) happens to be alphabetical so currently just sorting alphabetically
    let allMachines = machinesQuery.data?.machines;
    allMachines = allMachines?.slice().sort((a, b) => (a.healthStatus! > b.healthStatus! ? 1 : -1));

    const userContext = useUserContext();
    const userEmail = userContext.user?.email;
    const userQuery = useQuery<getUserByEmail>(GET_USER_BY_EMAIL, {
        variables: { email: userEmail },
    });

    const subscribedMachineRefs = userQuery.data?.user_email?.machinesSubscribed;
    const subscribedMachines: (getMachines_machines | null | undefined)[] = [];

    // Populating subscribed machines array with the real data from the actual machines
    // since the reference obtained via the user only contains the ID data of the relevant machine
    allMachines?.forEach(function (machine) {
        subscribedMachineRefs?.findIndex(function (subMachine) {
            if (subMachine && String(machine?.id) == String(subMachine?.id)) {
                subscribedMachines.push(machine);
            }
        });
    });

    const userId = userQuery.data?.user_email?.id;
    const userMachines = userQuery.data?.user_email?.machines;
    const selectedMachines: getMachines_machines[] = [];

    // For each machine check whether the user has added that machine to its machines list.
    // If it has then populate the selectedMachines id with it.
    allMachines?.forEach((machine) => {
        if (userMachines?.includes(machine.id)) {
            selectedMachines.push(machine);
        }
    });

    // Check whether all of the sensors for a machine are nominal, if not then update
    // the machines status with the status of the most critical sensor (ie - moderate or critical)
    function checkMachineStatus() {
        if (allMachines && allMachines.length > 0) {
            allMachines?.forEach((machine) => {
                const sortedSensors = machine?.sensors
                    ?.slice()
                    .sort((a, b) => (a.healthStatus! > b.healthStatus! ? 1 : -1));
                if (sortedSensors && sortedSensors.length > 0) {
                    const machineStatus = sortedSensors[0].healthStatus;
                    updateMachine({ variables: { id: machine.id, input: { healthStatus: machineStatus } } });
                }
            });
        }
    }

    const changeMachinesShown = (segment) => {
        userQuery.refetch();
        setSelectedValue(String(segment));
        if (String(segment) == "all") {
            setShow(true);
        } else if (String(segment) == "subscribed") {
            setShow(false);
        }
    };

    const handleOnMachineModalCompleted = () => {
        userQuery.refetch();
    };

    checkMachineStatus();

    return (
        <IonPage>
            {allMachines && (
                <MachineModal
                    open={addMachineOpen}
                    setOpen={setAddMachineOpen}
                    setShow={setShow}
                    showAll={showAll}
                    onCompleted={handleOnMachineModalCompleted}
                    userId={userId}
                    allMachines={allMachines.slice().sort((a, b) => {
                        return a.name.toString() > b.name.toString() ? 1 : -1;
                    })}
                    selectedMachines={selectedMachines.slice().map((machine) => {
                        return machine.id;
                    })}
                />
            )}
            <Heading title="Industry 4.0" showBackButton={false} />

            <IonContent color="new">
                {machinesQuery.loading ? (
                    <div className="flex w-full h-full justify-center items-center">
                        <IonSpinner className="w-16 h-16" color="light" />
                    </div>
                ) : allMachines && allMachines.length > 0 ? (
                    <div>
                        <div className="responsive-width m-auto p-3">
                            <ColourKey />
                        </div>
                        <div className="py-3">
                            <IonSegment
                                mode="ios"
                                color="primary"
                                className="ion-segment"
                                onIonChange={(e) => changeMachinesShown(e.detail.value)}
                                value={selectedValue}
                            >
                                <IonSegmentButton className="ion-segment-button" value={"all"}>
                                    <IonLabel color="dark">All Machines</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton className="ion-segment-button" value={"subscribed"}>
                                    <IonLabel color="dark">Subscribed Machines</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </div>
                        <MachineGrid
                            allMachines={selectedMachines}
                            subscribedMachines={subscribedMachines}
                            showAll={showAll}
                            onCompleted={handleOnMachineModalCompleted}
                            userId={userId}
                        />
                    </div>
                ) : (
                    <Error404 message="You have not added any machines. Please add a machine" />
                )}
                <IonFab vertical="bottom" horizontal="center" slot="fixed">
                    <IonFabButton color="light" onClick={() => setAddMachineOpen(true)} className={"mb-3"}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default Machines;
