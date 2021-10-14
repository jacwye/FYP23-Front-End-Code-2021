import { useMutation, useQuery } from "@apollo/client";
import {
    IonAlert,
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonLabel,
    IonListHeader,
    IonModal,
    IonRow,
} from "@ionic/react";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { UPDATE_MACHINE } from "../../common/graphql/mutations/machines";
import { GET_MACHINE_BY_ID } from "../../common/graphql/queries/machines";
import { firebaseApp } from "../../services/firebase";
import { getMachineById } from "../../types/getMachineById";
import { updateMachine } from "../../types/updateMachine";
import "./UpdateMachineModal.css";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onCompleted: () => void;
    machineId: string;
}

const SUPPORTED_IMAGE_FORMATS = ["jpeg", "jpg", "png"];

/**
 * All of the logic for displaying the update machine modal. The user
 * is able to upload a new image for a machine through this modal.
 */

export const UpdateMachineModal: React.FC<ModalProps> = ({ open, setOpen, onCompleted, machineId }) => {
    const [image, setImage] = useState<File>();
    const [updateError, setUpdateError] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const currentMachineImage = useQuery<getMachineById>(GET_MACHINE_BY_ID, {
        variables: { id: machineId },
    }).data?.machine?.image;
    const [updateMachineMutation] = useMutation<updateMachine>(UPDATE_MACHINE);

    const imageUploadHandler = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            setImage(imageFile);
        }
    };

    const uploadImageToCloudStorage = async (image: File) => {
        const fileExtension = image?.name.split(".").pop();
        if (!fileExtension || !SUPPORTED_IMAGE_FORMATS.includes(fileExtension)) {
            throw new Error(
                `file extension <${fileExtension}> does not match the supported formats: ${SUPPORTED_IMAGE_FORMATS}`,
            );
        }

        if (currentMachineImage) {
            const fileMetaData = await firebaseApp.storage().refFromURL(currentMachineImage).getMetadata();
            if (fileMetaData.name != "defaultImage.png") {
                await firebaseApp.storage().refFromURL(currentMachineImage).delete();
            }
        }

        // Store the image in the database
        const key = `images/${uuid()}.${fileExtension}`;
        const imageRef = firebaseApp.storage().ref(key);
        await imageRef.put(image);
        return key;
    };

    const getDownloadURL = async (key: string) => {
        return await firebaseApp.storage().ref(key).getDownloadURL();
    };

    const handleUpdateMachine = async () => {
        if (!image) {
            setUpdateError(true);
            return;
        }

        setDisabled(true);

        const key = await uploadImageToCloudStorage(image);
        const downloadURL = await getDownloadURL(key);
        await updateMachineMutation({
            variables: {
                id: machineId,
                input: {
                    image: downloadURL,
                },
            },
        });
        onCompleted();
        setOpen(false);
        setDisabled(false);
    };

    return (
        <IonModal isOpen={open} onDidDismiss={() => setOpen(false)} cssClass="machine-update-ion-modal">
            <IonContent className="p-3 flex justify-center flex-col">
                <IonListHeader className="py-3">
                    <IonLabel className="text-lg text-center">Update Image</IonLabel>
                </IonListHeader>
                <div className="flex flex-col">
                    <div className="flex flex-col items-center space-y-6">
                        <IonLabel className="flex space-x-3 items-center">
                            <p>Image:</p>
                            <input
                                name="myFile"
                                type="file"
                                onChange={imageUploadHandler}
                                accept="image/*"
                                className="rounded border-2 p-2"
                            />
                        </IonLabel>
                    </div>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol col-6>
                            <div className="flex justify-center">
                                <IonButton className="w-4/5" disabled={disabled} onClick={() => setOpen(false)}>
                                    Cancel
                                </IonButton>
                            </div>
                        </IonCol>
                        <IonCol col-6>
                            <div className="flex justify-center">
                                <IonButton className="w-4/5" disabled={disabled} onClick={() => handleUpdateMachine()}>
                                    Save
                                </IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            <IonAlert
                isOpen={updateError}
                onDidDismiss={() => setUpdateError(false)}
                header={"Alert"}
                message={"You must update an image for the machine"}
                buttons={["OK"]}
            />
        </IonModal>
    );
};
