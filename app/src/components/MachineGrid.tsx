import React from "react";
import { getMachines_machines } from "../types/getMachines";
import Error404 from "./ErrorMessage";
import MachineContainer from "./MachineContainer";

interface GridProps {
    allMachines: getMachines_machines[] | null | undefined;
    subscribedMachines: (getMachines_machines | null | undefined)[];
    showAll: boolean | null | undefined;
    onCompleted: () => void;
    userId: string | undefined;
}

/**
 * Component that is used to populate a grid accordingly with cards for machines.
 * Displayed on the machines page.
 */

const MachineGrid: React.FC<GridProps> = ({ allMachines, subscribedMachines, showAll, onCompleted, userId }) => {
    let machines: any[] | null | undefined;
    if (showAll) {
        machines = allMachines;
    } else {
        machines = subscribedMachines;
    }
    return (
        <div>
            {subscribedMachines.length > 0 || showAll ? (
                <div className="responsive-width grid grid-cols-2 gap-5 m-auto pb-20">
                    {machines?.map(function (machine) {
                        return (
                            <MachineContainer
                                key={machine.id}
                                name={machine.name}
                                health={machine.healthStatus}
                                image={machine.image}
                                status={machine.operatingStatus}
                                id={machine.id}
                                onCompleted={onCompleted}
                                userId={userId}
                            />
                        );
                    })}
                </div>
            ) : (
                <Error404 message="You are not subscribed to any machines." />
            )}
        </div>
    );
};

export default MachineGrid;
