import React from "react";
import { Link } from "react-router-dom";
import { statusColour } from "../common/StatusColour";
import "./Component.css";

interface ContainerProps {
    name: string | undefined;
    value: number | undefined | null;
    health: string | undefined | null;
    machineId: string;
    id: string;
}

/**
 * Component which shows the health and latest RMS value for a sensor
 */

const HealthContainer: React.FC<ContainerProps> = ({ name, value, health, machineId, id }) => {
    const bg: string = statusColour(health);
    return (
        <div className="responsive-width grid grid-cols-1 m-auto py-3">
            <Link to={`/machine/${machineId}/sensor/${id}`}>
                <div className={`h-12 py-3 rounded-lg shadow-xl font-bold text-lg m-auto bg-${bg}-550`}>
                    <div className="truncate text-left text-black float-left m-auto ml-3">{name && name}</div>
                    <div className="text-right text-black float-right m-auto mr-4">{value ? value : "unknown"}</div>
                </div>
            </Link>
        </div>
    );
};

export default HealthContainer;
