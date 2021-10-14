import React from "react";

interface ContainerProps {
    type: string;
    handleAcknowledge: any;
    handleFixed: any;
}

/**
 * All of the logic for displaying the notification container component.
 * This component displays a message when the state of the machine is critical
 * and notifications have been sent.
 */

const NotificationContainer: React.FC<ContainerProps> = ({ type, handleAcknowledge, handleFixed }) => {
    return (
        <div className="flex justify-center text-white m-1 break-words pre">
            <div className="text-center rounded-lg shadow-xl text-lg responsive-width m-6 bg-white pre border-4 border-red-500">
                {type == "Acknowledgement" && (
                    <>
                        <div className="text-left text-black float-left m-2 ml-4 break-words pre">
                            A sensor on this machine has crossed its threshold, acknowledge the issue to turn
                            notifications off.
                        </div>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold mb-3 py-2 px-4 rounded"
                            onClick={handleAcknowledge}
                        >
                            Acknowledge
                        </button>
                    </>
                )}
                {type == "Fixed" && (
                    <>
                        <div className="text-left text-black float-left m-2 ml-4 break-words pre">
                            This machine needs servicing, when it has been serviced click below to turn notifications
                            back on.
                        </div>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold mb-3 py-2 px-4 rounded"
                            onClick={handleFixed}
                        >
                            Mark as Fixed
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default NotificationContainer;
