import { IonPage, IonSpinner } from "@ionic/react";
import React from "react";

// Component that displays a spinner
export const FullPageLoader: React.FC = () => {
    return (
        <IonPage>
            <div className=" bg-gray-900 flex w-full h-full items-center justify-center">
                <div className="flex-grow-0 flex">
                    <IonSpinner className=" text-gray-100 w-20 h-20 place-self-center align-middle" />
                </div>
            </div>
        </IonPage>
    );
};
