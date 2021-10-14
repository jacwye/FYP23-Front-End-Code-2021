import { useMutation } from "@apollo/client";
import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { REMOVE_MACHINE_FROM_USER } from "../common/graphql/mutations/users";
import { statusColour } from "../common/StatusColour";
import { UpdateMachineModal } from "../pages/modals/UpdateMachineModal";
import { OperatingStatus, Status } from "../types/globalTypes";
import "./Component.css";

interface ContainerProps {
    name: string;
    health: Status | null;
    image: string;
    status: OperatingStatus;
    id: string;
    onCompleted: () => void;
    userId: string | undefined;
}

/**
 * Component for displaying a card containing machine information, such as its
 * name and image, buttons to update or remove that machine
 */

const MachineContainer: React.FC<ContainerProps> = ({ name, health, image, status, id, onCompleted, userId }) => {
    const bg: string = statusColour(health);
    const [removeMachineFromUser] = useMutation(REMOVE_MACHINE_FROM_USER);
    const [updateMachineOpen, setUpdateMachineOpen] = useState(false);

    const handleRemoveButtonClicked = async () => {
        await removeMachineFromUser({
            variables: {
                userId: userId,
                machineId: id,
            },
        });
        onCompleted();
    };

    return (
        <div>
            <UpdateMachineModal
                open={updateMachineOpen}
                setOpen={setUpdateMachineOpen}
                onCompleted={onCompleted}
                machineId={id}
            />
            <div className={`h-full p-3 rounded-lg shadow-xl m-auto bg-${bg}-550 flex flex-col justify-end`}>
                <div className="h-full">
                    <Link to={`/machine/${id}`}>
                        <div className={"w-full h-full p-3 rounded flex flex-col justify-between text-center bg-white"}>
                            <img className="machine-image rounded" src={image} alt="Machine image" />
                            <div>
                                <div className="text-black font-bold text-lg mt-3">{name}</div>
                                <div className="text-black text-base mt-2">{status}</div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <IonGrid>
                        <IonRow>
                            <IonCol col-6>
                                <div className="flex justify-center">
                                    <IonButton
                                        className="w-4/5"
                                        fill="default"
                                        onClick={() => setUpdateMachineOpen(true)}
                                    >
                                        Update
                                    </IonButton>
                                </div>
                            </IonCol>
                            <IonCol col-6>
                                <div className="flex justify-center">
                                    <IonButton
                                        className="w-4/5"
                                        fill="outline"
                                        color="dark"
                                        onClick={() => handleRemoveButtonClicked()}
                                    >
                                        Remove
                                    </IonButton>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </div>
        </div>
    );
};

export default MachineContainer;
