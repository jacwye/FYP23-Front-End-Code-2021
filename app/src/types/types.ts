export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};

export type Query = {
    __typename?: "Query";
    user?: Maybe<User>;
    user_email?: Maybe<User>;
    machines: Array<Machine>;
    machine?: Maybe<Machine>;
    sensor?: Maybe<Sensor>;
};

export type QueryUserArgs = {
    id: Scalars["ID"];
};

export type QueryUser_EmailArgs = {
    email: Scalars["String"];
};

export type QueryMachineArgs = {
    id: Scalars["ID"];
};

export type QuerySensorArgs = {
    machineId: Scalars["ID"];
    id: Scalars["ID"];
};

export type User = {
    __typename?: "User";
    id: Scalars["ID"];
    email: Scalars["String"];
    machines?: Maybe<Array<Maybe<Scalars["String"]>>>;
    sensors?: Maybe<Array<Maybe<Scalars["String"]>>>;
    machinesSubscribed?: Maybe<Array<Maybe<Machine>>>;
    emails?: Maybe<Array<Maybe<Scalars["String"]>>>;
    androidAppId?: Maybe<Scalars["String"]>;
};

export type Machine = {
    __typename?: "Machine";
    id: Scalars["ID"];
    name: Scalars["String"];
    healthStatus?: Maybe<Status>;
    notificationStatus?: Maybe<NotificationStatus>;
    image: Scalars["String"];
    subscribers?: Maybe<Array<Maybe<Scalars["String"]>>>;
    sensors: Array<Sensor>;
    operatingStatus?: Maybe<OperatingStatus>;
};

export enum Status {
    Nominal = "Nominal",
    Moderate = "Moderate",
    Critical = "Critical",
}

export enum NotificationStatus {
    Working = "Working",
    Unacknowledged = "Unacknowledged",
    Acknowledged = "Acknowledged",
}

export type Sensor = {
    __typename?: "Sensor";
    id: Scalars["ID"];
    machineId: Scalars["ID"];
    name: Scalars["String"];
    healthStatus: Status;
    threshold: Scalars["Float"];
    sensorData: Array<SensorData>;
    latestThresholdBreach?: Maybe<Scalars["String"]>;
};

export type SensorData = {
    __typename?: "SensorData";
    timestamp: Scalars["Date"];
    value: Scalars["Float"];
};

export enum OperatingStatus {
    Online = "Online",
    Offline = "Offline",
}

export type Mutation = {
    __typename?: "Mutation";
    updateMachine?: Maybe<MachineUpdatedResponse>;
    updateSensor?: Maybe<SensorUpdatedResponse>;
    createMachine?: Maybe<MachineCreationResponse>;
    createSensor?: Maybe<SensorCreationResponse>;
    createUser?: Maybe<UserCreationResponse>;
    subscribeToMachine?: Maybe<MachineSubscriptionResponse>;
    unsubscribeFromMachine?: Maybe<MachineSubscriptionResponse>;
    updateUserEmails?: Maybe<EmailUpdateResponse>;
    addMachineToUser?: Maybe<MachineAddedToUserResponse>;
    removeMachineFromUser?: Maybe<MachineRemovedFromUserResponse>;
};

export type MutationUpdateMachineArgs = {
    id: Scalars["ID"];
    input?: Maybe<MachineUpdateInput>;
};

export type MutationUpdateSensorArgs = {
    id: Scalars["ID"];
    machineId: Scalars["ID"];
    input?: Maybe<SensorUpdateInput>;
};

export type MutationCreateMachineArgs = {
    name: Scalars["String"];
    image: Scalars["String"];
};

export type MutationCreateSensorArgs = {
    input?: Maybe<SensorInput>;
};

export type MutationCreateUserArgs = {
    email: Scalars["String"];
};

export type MutationSubscribeToMachineArgs = {
    userId: Scalars["ID"];
    machineId: Scalars["ID"];
};

export type MutationUnsubscribeFromMachineArgs = {
    userId: Scalars["ID"];
    machineId: Scalars["ID"];
};

export type MutationUpdateUserEmailsArgs = {
    userId: Scalars["ID"];
    emails?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type MutationAddMachineToUserArgs = {
    userId: Scalars["ID"];
    machineId: Scalars["ID"];
};

export type MutationRemoveMachineFromUserArgs = {
    userId: Scalars["ID"];
    machineId: Scalars["ID"];
};

export type MachineUpdateInput = {
    name?: Maybe<Scalars["String"]>;
    healthStatus?: Maybe<Status>;
    notificationStatus?: Maybe<NotificationStatus>;
    operatingStatus?: Maybe<OperatingStatus>;
    subscribers?: Maybe<Array<Maybe<Scalars["String"]>>>;
    image?: Maybe<Scalars["String"]>;
};

export type MachineUpdatedResponse = MutationResponse & {
    __typename?: "MachineUpdatedResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    machine?: Maybe<Machine>;
};

export type MutationResponse = {
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
};

export type SensorUpdateInput = {
    name?: Maybe<Scalars["String"]>;
    healthStatus?: Maybe<Status>;
    threshold?: Maybe<Scalars["Float"]>;
    latestThresholdBreach?: Maybe<Scalars["String"]>;
};

export type SensorUpdatedResponse = MutationResponse & {
    __typename?: "SensorUpdatedResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    sensor?: Maybe<Sensor>;
};

export type MachineCreationResponse = MutationResponse & {
    __typename?: "MachineCreationResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    machine?: Maybe<Machine>;
};

export type SensorInput = {
    machineID: Scalars["ID"];
    name: Scalars["String"];
    threshold: Scalars["Float"];
};

export type SensorCreationResponse = MutationResponse & {
    __typename?: "SensorCreationResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    sensor?: Maybe<Sensor>;
};

export type UserCreationResponse = MutationResponse & {
    __typename?: "UserCreationResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    user?: Maybe<User>;
};

export type MachineSubscriptionResponse = MutationResponse & {
    __typename?: "MachineSubscriptionResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    user?: Maybe<User>;
};

export type EmailUpdateResponse = MutationResponse & {
    __typename?: "EmailUpdateResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    user?: Maybe<User>;
};

export type MachineAddedToUserResponse = MutationResponse & {
    __typename?: "MachineAddedToUserResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    user?: Maybe<User>;
};

export type MachineRemovedFromUserResponse = MutationResponse & {
    __typename?: "MachineRemovedFromUserResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    user?: Maybe<User>;
};

export type UserUpdatedResponse = MutationResponse & {
    __typename?: "UserUpdatedResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
};

export enum CacheControlScope {
    Public = "PUBLIC",
    Private = "PRIVATE",
}
