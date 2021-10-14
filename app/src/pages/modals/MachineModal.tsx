import { useMutation } from "@apollo/client";
import {
    IonButton,
    IonCheckbox,
    IonCol,
    IonContent,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonModal,
    IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { ADD_MACHINE_TO_USER } from "../../common/graphql/mutations/users";
import { getMachines_machines } from "../../types/getMachines";
import "./AddMachineModal.css";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setShow: (show: boolean) => void;
    showAll: boolean;
    onCompleted: () => void;
    userId: string | undefined;
    allMachines: getMachines_machines[];
    selectedMachines: string[];
}

/**
 * All of the logic for displaying the machine selection modal. The user
 * is able to select machines from a list through this modal.
 */

export const MachineModal: React.FC<ModalProps> = ({
    open,
    setOpen,
    setShow,
    showAll,
    onCompleted,
    userId,
    allMachines,
    selectedMachines,
}) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [isDisabled, setDisabled] = useState<boolean>(true);
    const [addMachineToUser] = useMutation(ADD_MACHINE_TO_USER);
    const [filteredMachine, setFilteredMachine] = useState<string>("");
    const [filteredMachineList, setFilteredMachineList] = useState<getMachines_machines[]>(allMachines);

    useEffect(() => {
        if (selected.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [selected]);

    const addMachine = async () => {
        for (const machineId of selected) {
            await addMachineToUser({
                variables: {
                    userId: userId,
                    machineId: machineId,
                },
            });
        }
        onCompleted();
        handleModalClose();
    };

    const handleInputChange = (value: string) => {
        setFilteredMachine(value);
        if (value !== "") {
            const filteredList = allMachines.filter((machine) => {
                return machine.name.toLowerCase().includes(value.toLowerCase());
            });
            setFilteredMachineList(filteredList);
        } else {
            setFilteredMachineList(allMachines);
        }
    };

    const boxChecked = (checkedMachineId: string) => {
        if (selected.includes(checkedMachineId)) {
            setSelected(
                selected.filter((id) => {
                    return id != checkedMachineId;
                }),
            );
        } else {
            setSelected([...selected, checkedMachineId]);
        }
    };

    const isChecked = (id: string): boolean => {
        return selected.includes(id);
    };

    const displayCheckboxList = (machine: getMachines_machines, index: number) => {
        if (machine) {
            if (selectedMachines?.includes(machine.id)) {
                return (
                    <IonItem key={index} disabled={true}>
                        <IonLabel className="text-blue-300">{machine.name}</IonLabel>
                        <IonCheckbox
                            key={machine.id}
                            value={machine.id}
                            onIonChange={(e) => {
                                boxChecked(e.detail.value);
                            }}
                            checked
                        />
                    </IonItem>
                );
            } else {
                return (
                    <IonItem key={index} disabled={false}>
                        <IonLabel>{machine.name}</IonLabel>
                        <IonCheckbox
                            key={machine.id}
                            value={machine.id}
                            onIonChange={(e) => {
                                boxChecked(e.detail.value);
                            }}
                            checked={isChecked(machine.id)}
                        />
                    </IonItem>
                );
            }
        } else {
            return <div></div>;
        }
    };

    const handleModalClose = () => {
        setOpen(false);
        setDisabled(true);
        setSelected([]);
        setFilteredMachine("");
        setFilteredMachineList(allMachines);
        setShow(showAll);
    };

    return (
        <IonModal isOpen={open} onDidDismiss={handleModalClose} cssClass="machine-add-ion-modal">
            <IonContent className="p-3 flex justify-center flex-col">
                <IonListHeader className="py-3">
                    <IonLabel className="text-lg text-center">{`Select a machine to add: (${
                        allMachines ? allMachines.length : 0
                    }) Available`}</IonLabel>
                </IonListHeader>
                <IonList>
                    <IonItem key="filterInput" className="mb-3 border-2">
                        <IonInput
                            key="input"
                            value={filteredMachine}
                            placeholder="Filter Machines"
                            onIonChange={(e) => handleInputChange(e.detail.value!)}
                        />
                    </IonItem>
                </IonList>
                <IonList>
                    {filteredMachineList &&
                        filteredMachineList.map((machine, index) => displayCheckboxList(machine, index))}
                </IonList>
                <IonGrid>
                    <IonRow>
                        <IonCol col-6>
                            <div className="flex justify-center">
                                <IonButton className="w-4/5" onClick={handleModalClose}>
                                    Cancel
                                </IonButton>
                            </div>
                        </IonCol>
                        <IonCol col-6>
                            <div className="flex justify-center">
                                <IonButton className="w-4/5" onClick={() => addMachine()} disabled={isDisabled}>
                                    Save
                                </IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    );
};
