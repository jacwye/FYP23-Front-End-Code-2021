import React from "react";
import {
    CartesianGrid,
    DotProps,
    Label,
    Legend,
    Line,
    LineChart,
    ReferenceLine,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type CustomDotProps = DotProps & { value?: number; redThreshold: number };

/**
 * Component used to display the Line Graph that is used to show the RMS values
 */

const DotType: React.FC<CustomDotProps> = (props: CustomDotProps) => {
    const { cx, cy, value, redThreshold } = props;
    if (!redThreshold) {
        return (
            <svg x={(cx || 0) - 10} y={(cy || 0) - 10} width={20} height={20}>
                <circle cx="10" cy="10" r="6" stroke="#8884df" strokeWidth="2" fill="white" />
            </svg>
        );
    }

    if (value && value > redThreshold) {
        return (
            <svg x={(cx || 0) - 10} y={(cy || 0) - 14} height="20" width="20">
                <polygon points="10,0 20,20 0,20" fill="red" />
                <text fill="#ffffff" fontSize="12" fontFamily="Verdana" x="8" y="17">
                    !
                </text>
            </svg>
        );
    }

    if (value && value > 0.9 * redThreshold) {
        return (
            <svg x={(cx || 0) - 10} y={(cy || 0) - 14} height="20" width="20">
                <polygon points="10,0 20,20 0,20" fill="orange" />
                <text fill="#ffffff" fontSize="12" fontFamily="Verdana" x="8" y="17">
                    !
                </text>
            </svg>
        );
    }

    return (
        <svg x={(cx || 0) - 10} y={(cy || 0) - 10} width={20} height={20}>
            <circle cx="10" cy="10" r="6" stroke="#8884df" strokeWidth="2" fill="white" />
        </svg>
    );
};

interface LineGraphProps {
    title: string;
    data: { name: string; value: number }[];
    redThreshold: number | null;
}

const LineGraph: React.FC<LineGraphProps> = ({ title, data, redThreshold }) => {
    /* Keeps track of the window dimensions.  Updates when window resizes */
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    React.useEffect(() => {
        const handleResize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    return (
        <div className="flex justify-center text-black">
            <div className="bg-white rounded-lg shadow-xl pt-4 pb-4 responsive-width m-4 ">
                <h1 className="text-xl text-center leading-normal">{title}</h1>
                <LineChart
                    width={dimensions.width > 655 ? 590 : dimensions.width - 70}
                    height={300}
                    data={data}
                    margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
                >
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884df"
                        isAnimationActive={false} // allows hollow dots to appear for unkown reason
                        activeDot={{ r: 8 }}
                        dot={<DotType redThreshold={redThreshold} />}
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ReferenceLine y={redThreshold} alwaysShow stroke="red" strokeDasharray="3 3">
                        <Label value="Threshold" position="top" />
                    </ReferenceLine>
                    <Tooltip />
                    <Legend />
                </LineChart>
            </div>
        </div>
    );
};

export default LineGraph;
