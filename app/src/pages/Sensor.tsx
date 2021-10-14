import { useQuery } from "@apollo/client";
import { IonButton, IonContent, IonPage, IonSpinner, isPlatform } from "@ionic/react";
import axios from "axios";
import FileSaver from "file-saver";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GET_MACHINE_BY_ID } from "../common/graphql/queries/machines";
import { GET_SENSOR_BY_ID } from "../common/graphql/queries/sensors";
import Error404 from "../components/ErrorMessage";
import Heading from "../components/Heading";
import HealthContainer from "../components/HealthContainer";
import LineGraph from "../components/LineGraph";
import { getLinkForSensor } from "../services/download/download";
import { firebaseApp } from "../services/firebase";
import { getMachineById } from "../types/getMachineById";
import { getSensorById } from "../types/getSensorById";
import { SensorData } from "../types/types";
import { getDate, getTime } from "../utils/unixTime";
import "./Page.css";

/**
 * All of the logic for displaying the sensor page.
 */

const Sensor: React.FC = () => {
    const { machineid } = useParams<{ machineid: string }>();
    const { id } = useParams<{ id: string }>();
    const machineQuery = useQuery<getMachineById>(GET_MACHINE_BY_ID, {
        variables: { id: machineid },
    });
    const sensorQuery = useQuery<getSensorById>(GET_SENSOR_BY_ID, {
        variables: { machineId: machineid, id: id },
        fetchPolicy: "network-only",
        pollInterval: 5000,
    });

    const [fftGraphUrl, setfftGraphUrl] = useState(String);
    const [fftDataUrl, setfftDataUrl] = useState(String);

    const machine = machineQuery.data?.machine;
    const sensor = sensorQuery.data?.sensor;

    /**
     * Generating the urls for FFT image and data respectively from firebase storage
     * @param latestThresholdBreach The formatted timestamp for the latest breach of threshold
     */
    const getFFTURl = async (latestThresholdBreach: string | undefined | null) => {
        const imageUrl = await firebaseApp
            .storage()
            .ref()
            .child(`fft/${id}/graph/${latestThresholdBreach}.png`)
            .getDownloadURL();

        if (imageUrl) {
            setfftGraphUrl(imageUrl);
        }

        const dataUrl = await firebaseApp
            .storage()
            .ref()
            .child(`fft/${id}/data/${latestThresholdBreach}.txt`)
            .getDownloadURL();

        if (dataUrl) {
            setfftDataUrl(dataUrl);
        }
    };

    useEffect(() => {
        if (sensor?.latestThresholdBreach) {
            getFFTURl(sensor.latestThresholdBreach);
        }
    });

    // Format the timestamp into a readable string
    const getFormattedDate = (latestThresholdBreach: string) => {
        const dateToJoin = [
            latestThresholdBreach.slice(0, 4),
            "-",
            latestThresholdBreach.slice(4, 6),
            "-",
            latestThresholdBreach.slice(6, 8),
            "T",
            latestThresholdBreach.slice(9, 11),
            ":",
            latestThresholdBreach.slice(11, 13),
            ":",
            latestThresholdBreach.slice(13, 15),
            "+",
            latestThresholdBreach.slice(15, 17),
            ":",
            latestThresholdBreach.slice(17),
        ];
        const formattedString = dateToJoin.join("");

        return formattedString;
    };

    // Send a request to storage to download the FFT Graph Image
    const downloadFFTGraphFile = async (latestThresholdBreach: string) => {
        if (fftGraphUrl) {
            try {
                const response = await axios.get(fftGraphUrl, {
                    responseType: "blob",
                });
                if (response) {
                    const blob = new Blob([response.data], { type: "image/png" });
                    FileSaver.saveAs(blob, `${latestThresholdBreach}.png`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Send a request to storage to download the FFT Graph Data
    const downloadFFTDataFile = async (latestThresholdBreach: string) => {
        if (fftDataUrl) {
            try {
                const response = await axios.get(fftDataUrl, {
                    responseType: "text",
                });
                if (response) {
                    const blob = new Blob([response.data], { type: "text/plain" });
                    FileSaver.saveAs(blob, `${latestThresholdBreach}.txt`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Filter and process the sensor data before rendering the required components
    const processSensorDataDisplay = (
        sensorName: string,
        healthStatus: any,
        threshold: number,
        sensorData: SensorData[],
        latestThresholdBreach: string | null,
    ) => {
        const processedSensorDataArray = processSensorDataArray(sensorData);
        const currentDateValue = processedSensorDataArray[0].timestamp._seconds;
        const currentDataValue = processedSensorDataArray[0].value;
        const sortedSensorDataArray = sortSensorDataArray(processedSensorDataArray);
        const dataToDisplay = formatDisplayData(sortedSensorDataArray);

        return (
            <div className="text-center items-center">
                <HealthContainer
                    name={sensorName}
                    value={currentDataValue}
                    health={healthStatus}
                    machineId={machineid}
                    id={id}
                />
                {dataToDisplay ? (
                    <LineGraph
                        title={`Sensor Values ~ ${getDate(currentDateValue)}`}
                        redThreshold={threshold}
                        data={dataToDisplay}
                    />
                ) : (
                    <Error404 message="There is no data for this sensor" />
                )}
                <div className="text-center">
                    <IonButton
                        shape="round"
                        color="primary"
                        className="responsive-width text-lg normal-case m-4"
                        download="sensor data"
                        href={getLinkForSensor(machineid || "", id || "")}
                    >
                        Download RMS Data
                    </IonButton>
                </div>
                {healthStatus == "Critical" && latestThresholdBreach && fftGraphUrl ? (
                    <div
                        className={
                            "responsive-width grid grid-cols-1 m-auto mt-5 mb-5 py-3 rounded flex flex-col justify-center items-center text-center bg-white"
                        }
                    >
                        <div>
                            <div className="text-black font-bold text-lg mt-3 mb-3">
                                {`FFT Graph for Threshold Breach at`}
                                <br />
                                {`${new Date(getFormattedDate(latestThresholdBreach).toString())}`}
                            </div>
                        </div>
                        <div>
                            <img className="machine-image rounded" src={fftGraphUrl} alt="FFT Graph" />
                        </div>
                        {isPlatform("android") ? (
                            <div className="pt-5" />
                        ) : (
                            <div>
                                <IonButton
                                    shape="round"
                                    color="light"
                                    className={"responsive-width self-center text-lg normal-case m-4"}
                                    onClick={() => downloadFFTGraphFile(latestThresholdBreach)}
                                >
                                    Download FFT Graph
                                </IonButton>
                            </div>
                        )}
                        <div className={"text-left ml-5 mr-5 mt-2 mb-2 self-center"}>
                            <p className={"text-black"}>
                                In this CMS, fast fourier transform (FFT) analysis has been used to analyse machine data
                                in the frequency domain. The FFT graph data can be downloaded as a text file using
                                plotting software for further analysis.
                            </p>
                        </div>
                        {isPlatform("android") ? (
                            <div
                                className={"text-centre ml-5 mr-5 mt-2 mb-2 self-center rounded-sm border border-black"}
                            >
                                <p className={"text-blue-900 p-3"}>
                                    FFT GRAPH AND DATA ARE AVAILABLE TO DOWNLOAD FROM THE WEBSITE
                                </p>
                            </div>
                        ) : (
                            <div>
                                <IonButton
                                    shape="round"
                                    color="light"
                                    className={"responsive-width self-center text-lg normal-case m-4"}
                                    onClick={() => downloadFFTDataFile(latestThresholdBreach)}
                                >
                                    Download FFT Data for Graph
                                </IonButton>
                            </div>
                        )}
                    </div>
                ) : (
                    <div />
                )}
            </div>
        );
    };

    // -----------------------------------------------------------
    // Helper functions for processing the sensor data

    const processSensorDataArray = (sensorData: SensorData[]) => {
        const sensorDataArray: SensorData[] = [];

        if (sensorData) {
            sensorData.forEach((data) => {
                sensorDataArray.push(data);
            });
        }

        return sensorDataArray;
    };

    const sortSensorDataArray = (data: SensorData[]) => {
        const sortedData = data.slice().sort((a, b) => {
            const firstDate: Date = new Date(a.timestamp._seconds);
            const secondDate: Date = new Date(b.timestamp._seconds);

            return firstDate.getTime() - secondDate.getTime();
        });

        return sortedData;
    };

    const formatDisplayData = (data: SensorData[]) => {
        let displayData: { name: any; value: number }[] = [];
        displayData = data.map((individualData) => {
            return { name: getTime(individualData.timestamp._seconds), value: individualData.value };
        });
        if (displayData.length > 20) {
            return displayData.slice(Math.max(displayData.length - 20, 0));
        } else {
            return displayData;
        }
    };

    // -----------------------------------------------------------

    return (
        <IonPage>
            <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
            <Heading title={`${machine ? machine.name : "Loading"}`} />
            <IonContent color="new">
                {sensorQuery.loading ? (
                    <div className="flex w-full h-full justify-center items-center">
                        <IonSpinner className="w-16 h-16" color="light" />
                    </div>
                ) : sensor ? (
                    processSensorDataDisplay(
                        sensor.name,
                        sensor.healthStatus,
                        sensor.threshold,
                        sensor.sensorData,
                        sensor.latestThresholdBreach,
                    )
                ) : (
                    <Error404 message="Couldn't find the sensor you were looking for" />
                )}
            </IonContent>
        </IonPage>
    );
};

export default Sensor;
