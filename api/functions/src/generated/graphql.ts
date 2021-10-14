import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLContext } from '../../src/types';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};


export type EmailUpdateResponse = MutationResponse & {
  __typename?: 'EmailUpdateResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<User>;
};

export type Machine = {
  __typename?: 'Machine';
  id: Scalars['ID'];
  name: Scalars['String'];
  healthStatus?: Maybe<Status>;
  notificationStatus?: Maybe<NotificationStatus>;
  image: Scalars['String'];
  subscribers?: Maybe<Array<Maybe<Scalars['String']>>>;
  sensors: Array<Sensor>;
  operatingStatus?: Maybe<OperatingStatus>;
};

export type MachineAddedToUserResponse = MutationResponse & {
  __typename?: 'MachineAddedToUserResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<User>;
};

export type MachineCreationResponse = MutationResponse & {
  __typename?: 'MachineCreationResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  machine?: Maybe<Machine>;
};

export type MachineRemovedFromUserResponse = MutationResponse & {
  __typename?: 'MachineRemovedFromUserResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<User>;
};

export type MachineSubscriptionResponse = MutationResponse & {
  __typename?: 'MachineSubscriptionResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<User>;
};

export type MachineUpdatedResponse = MutationResponse & {
  __typename?: 'MachineUpdatedResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  machine?: Maybe<Machine>;
};

export type MachineUpdateInput = {
  name?: Maybe<Scalars['String']>;
  healthStatus?: Maybe<Status>;
  notificationStatus?: Maybe<NotificationStatus>;
  operatingStatus?: Maybe<OperatingStatus>;
  subscribers?: Maybe<Array<Maybe<Scalars['String']>>>;
  image?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
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
  id: Scalars['ID'];
  input?: Maybe<MachineUpdateInput>;
};


export type MutationUpdateSensorArgs = {
  id: Scalars['ID'];
  machineId: Scalars['ID'];
  input?: Maybe<SensorUpdateInput>;
};


export type MutationCreateMachineArgs = {
  name: Scalars['String'];
  image: Scalars['String'];
};


export type MutationCreateSensorArgs = {
  input?: Maybe<SensorInput>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
};


export type MutationSubscribeToMachineArgs = {
  userId: Scalars['ID'];
  machineId: Scalars['ID'];
};


export type MutationUnsubscribeFromMachineArgs = {
  userId: Scalars['ID'];
  machineId: Scalars['ID'];
};


export type MutationUpdateUserEmailsArgs = {
  userId: Scalars['ID'];
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationAddMachineToUserArgs = {
  userId: Scalars['ID'];
  machineId: Scalars['ID'];
};


export type MutationRemoveMachineFromUserArgs = {
  userId: Scalars['ID'];
  machineId: Scalars['ID'];
};

export type MutationResponse = {
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export enum NotificationStatus {
  Working = 'Working',
  Unacknowledged = 'Unacknowledged',
  Acknowledged = 'Acknowledged'
}

export enum OperatingStatus {
  Online = 'Online',
  Offline = 'Offline'
}

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  user_email?: Maybe<User>;
  machines: Array<Machine>;
  machine?: Maybe<Machine>;
  sensor?: Maybe<Sensor>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUser_EmailArgs = {
  email: Scalars['String'];
};


export type QueryMachineArgs = {
  id: Scalars['ID'];
};


export type QuerySensorArgs = {
  machineId: Scalars['ID'];
  id: Scalars['ID'];
};

export type Sensor = {
  __typename?: 'Sensor';
  id: Scalars['ID'];
  machineId: Scalars['ID'];
  name: Scalars['String'];
  healthStatus: Status;
  threshold: Scalars['Float'];
  sensorData: Array<SensorData>;
  latestThresholdBreach?: Maybe<Scalars['String']>;
};

export type SensorCreationResponse = MutationResponse & {
  __typename?: 'SensorCreationResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  sensor?: Maybe<Sensor>;
};

export type SensorData = {
  __typename?: 'SensorData';
  timestamp: Scalars['Date'];
  value: Scalars['Float'];
};

export type SensorInput = {
  machineID: Scalars['ID'];
  name: Scalars['String'];
  threshold: Scalars['Float'];
};

export type SensorUpdatedResponse = MutationResponse & {
  __typename?: 'SensorUpdatedResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  sensor?: Maybe<Sensor>;
};

export type SensorUpdateInput = {
  name?: Maybe<Scalars['String']>;
  healthStatus?: Maybe<Status>;
  threshold?: Maybe<Scalars['Float']>;
  latestThresholdBreach?: Maybe<Scalars['String']>;
};

export enum Status {
  Nominal = 'Nominal',
  Moderate = 'Moderate',
  Critical = 'Critical'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  machines?: Maybe<Array<Maybe<Scalars['String']>>>;
  sensors?: Maybe<Array<Maybe<Scalars['String']>>>;
  machinesSubscribed?: Maybe<Array<Maybe<Machine>>>;
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  androidAppId?: Maybe<Scalars['String']>;
};

export type UserCreationResponse = MutationResponse & {
  __typename?: 'UserCreationResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<User>;
};

export type UserUpdatedResponse = MutationResponse & {
  __typename?: 'UserUpdatedResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  User: ResolverTypeWrapper<User>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Machine: ResolverTypeWrapper<Machine>;
  Status: Status;
  NotificationStatus: NotificationStatus;
  Sensor: ResolverTypeWrapper<Sensor>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  SensorData: ResolverTypeWrapper<SensorData>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  OperatingStatus: OperatingStatus;
  Mutation: ResolverTypeWrapper<{}>;
  MachineUpdateInput: MachineUpdateInput;
  MachineUpdatedResponse: ResolverTypeWrapper<MachineUpdatedResponse>;
  MutationResponse: ResolversTypes['MachineUpdatedResponse'] | ResolversTypes['SensorUpdatedResponse'] | ResolversTypes['MachineCreationResponse'] | ResolversTypes['SensorCreationResponse'] | ResolversTypes['UserCreationResponse'] | ResolversTypes['MachineSubscriptionResponse'] | ResolversTypes['EmailUpdateResponse'] | ResolversTypes['MachineAddedToUserResponse'] | ResolversTypes['MachineRemovedFromUserResponse'] | ResolversTypes['UserUpdatedResponse'];
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  SensorUpdateInput: SensorUpdateInput;
  SensorUpdatedResponse: ResolverTypeWrapper<SensorUpdatedResponse>;
  MachineCreationResponse: ResolverTypeWrapper<MachineCreationResponse>;
  SensorInput: SensorInput;
  SensorCreationResponse: ResolverTypeWrapper<SensorCreationResponse>;
  UserCreationResponse: ResolverTypeWrapper<UserCreationResponse>;
  MachineSubscriptionResponse: ResolverTypeWrapper<MachineSubscriptionResponse>;
  EmailUpdateResponse: ResolverTypeWrapper<EmailUpdateResponse>;
  MachineAddedToUserResponse: ResolverTypeWrapper<MachineAddedToUserResponse>;
  MachineRemovedFromUserResponse: ResolverTypeWrapper<MachineRemovedFromUserResponse>;
  UserUpdatedResponse: ResolverTypeWrapper<UserUpdatedResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  ID: Scalars['ID'];
  User: User;
  String: Scalars['String'];
  Machine: Machine;
  Sensor: Sensor;
  Float: Scalars['Float'];
  SensorData: SensorData;
  Date: Scalars['Date'];
  Mutation: {};
  MachineUpdateInput: MachineUpdateInput;
  MachineUpdatedResponse: MachineUpdatedResponse;
  MutationResponse: ResolversParentTypes['MachineUpdatedResponse'] | ResolversParentTypes['SensorUpdatedResponse'] | ResolversParentTypes['MachineCreationResponse'] | ResolversParentTypes['SensorCreationResponse'] | ResolversParentTypes['UserCreationResponse'] | ResolversParentTypes['MachineSubscriptionResponse'] | ResolversParentTypes['EmailUpdateResponse'] | ResolversParentTypes['MachineAddedToUserResponse'] | ResolversParentTypes['MachineRemovedFromUserResponse'] | ResolversParentTypes['UserUpdatedResponse'];
  Boolean: Scalars['Boolean'];
  SensorUpdateInput: SensorUpdateInput;
  SensorUpdatedResponse: SensorUpdatedResponse;
  MachineCreationResponse: MachineCreationResponse;
  SensorInput: SensorInput;
  SensorCreationResponse: SensorCreationResponse;
  UserCreationResponse: UserCreationResponse;
  MachineSubscriptionResponse: MachineSubscriptionResponse;
  EmailUpdateResponse: EmailUpdateResponse;
  MachineAddedToUserResponse: MachineAddedToUserResponse;
  MachineRemovedFromUserResponse: MachineRemovedFromUserResponse;
  UserUpdatedResponse: UserUpdatedResponse;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EmailUpdateResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['EmailUpdateResponse'] = ResolversParentTypes['EmailUpdateResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MachineResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Machine'] = ResolversParentTypes['Machine']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  healthStatus?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  notificationStatus?: Resolver<Maybe<ResolversTypes['NotificationStatus']>, ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subscribers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  sensors?: Resolver<Array<ResolversTypes['Sensor']>, ParentType, ContextType>;
  operatingStatus?: Resolver<Maybe<ResolversTypes['OperatingStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MachineAddedToUserResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MachineAddedToUserResponse'] = ResolversParentTypes['MachineAddedToUserResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MachineCreationResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MachineCreationResponse'] = ResolversParentTypes['MachineCreationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MachineRemovedFromUserResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MachineRemovedFromUserResponse'] = ResolversParentTypes['MachineRemovedFromUserResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MachineSubscriptionResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MachineSubscriptionResponse'] = ResolversParentTypes['MachineSubscriptionResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MachineUpdatedResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MachineUpdatedResponse'] = ResolversParentTypes['MachineUpdatedResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  updateMachine?: Resolver<Maybe<ResolversTypes['MachineUpdatedResponse']>, ParentType, ContextType, RequireFields<MutationUpdateMachineArgs, 'id'>>;
  updateSensor?: Resolver<Maybe<ResolversTypes['SensorUpdatedResponse']>, ParentType, ContextType, RequireFields<MutationUpdateSensorArgs, 'id' | 'machineId'>>;
  createMachine?: Resolver<Maybe<ResolversTypes['MachineCreationResponse']>, ParentType, ContextType, RequireFields<MutationCreateMachineArgs, 'name' | 'image'>>;
  createSensor?: Resolver<Maybe<ResolversTypes['SensorCreationResponse']>, ParentType, ContextType, RequireFields<MutationCreateSensorArgs, never>>;
  createUser?: Resolver<Maybe<ResolversTypes['UserCreationResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email'>>;
  subscribeToMachine?: Resolver<Maybe<ResolversTypes['MachineSubscriptionResponse']>, ParentType, ContextType, RequireFields<MutationSubscribeToMachineArgs, 'userId' | 'machineId'>>;
  unsubscribeFromMachine?: Resolver<Maybe<ResolversTypes['MachineSubscriptionResponse']>, ParentType, ContextType, RequireFields<MutationUnsubscribeFromMachineArgs, 'userId' | 'machineId'>>;
  updateUserEmails?: Resolver<Maybe<ResolversTypes['EmailUpdateResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserEmailsArgs, 'userId'>>;
  addMachineToUser?: Resolver<Maybe<ResolversTypes['MachineAddedToUserResponse']>, ParentType, ContextType, RequireFields<MutationAddMachineToUserArgs, 'userId' | 'machineId'>>;
  removeMachineFromUser?: Resolver<Maybe<ResolversTypes['MachineRemovedFromUserResponse']>, ParentType, ContextType, RequireFields<MutationRemoveMachineFromUserArgs, 'userId' | 'machineId'>>;
}>;

export type MutationResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'MachineUpdatedResponse' | 'SensorUpdatedResponse' | 'MachineCreationResponse' | 'SensorCreationResponse' | 'UserCreationResponse' | 'MachineSubscriptionResponse' | 'EmailUpdateResponse' | 'MachineAddedToUserResponse' | 'MachineRemovedFromUserResponse' | 'UserUpdatedResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  user_email?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUser_EmailArgs, 'email'>>;
  machines?: Resolver<Array<ResolversTypes['Machine']>, ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType, RequireFields<QueryMachineArgs, 'id'>>;
  sensor?: Resolver<Maybe<ResolversTypes['Sensor']>, ParentType, ContextType, RequireFields<QuerySensorArgs, 'machineId' | 'id'>>;
}>;

export type SensorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Sensor'] = ResolversParentTypes['Sensor']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machineId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  healthStatus?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  threshold?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sensorData?: Resolver<Array<ResolversTypes['SensorData']>, ParentType, ContextType>;
  latestThresholdBreach?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SensorCreationResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SensorCreationResponse'] = ResolversParentTypes['SensorCreationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sensor?: Resolver<Maybe<ResolversTypes['Sensor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SensorDataResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SensorData'] = ResolversParentTypes['SensorData']> = ResolversObject<{
  timestamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SensorUpdatedResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SensorUpdatedResponse'] = ResolversParentTypes['SensorUpdatedResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sensor?: Resolver<Maybe<ResolversTypes['Sensor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machines?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  sensors?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  machinesSubscribed?: Resolver<Maybe<Array<Maybe<ResolversTypes['Machine']>>>, ParentType, ContextType>;
  emails?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  androidAppId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserCreationResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserCreationResponse'] = ResolversParentTypes['UserCreationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserUpdatedResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserUpdatedResponse'] = ResolversParentTypes['UserUpdatedResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  Date?: GraphQLScalarType;
  EmailUpdateResponse?: EmailUpdateResponseResolvers<ContextType>;
  Machine?: MachineResolvers<ContextType>;
  MachineAddedToUserResponse?: MachineAddedToUserResponseResolvers<ContextType>;
  MachineCreationResponse?: MachineCreationResponseResolvers<ContextType>;
  MachineRemovedFromUserResponse?: MachineRemovedFromUserResponseResolvers<ContextType>;
  MachineSubscriptionResponse?: MachineSubscriptionResponseResolvers<ContextType>;
  MachineUpdatedResponse?: MachineUpdatedResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sensor?: SensorResolvers<ContextType>;
  SensorCreationResponse?: SensorCreationResponseResolvers<ContextType>;
  SensorData?: SensorDataResolvers<ContextType>;
  SensorUpdatedResponse?: SensorUpdatedResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserCreationResponse?: UserCreationResponseResolvers<ContextType>;
  UserUpdatedResponse?: UserUpdatedResponseResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GraphQLContext> = Resolvers<ContextType>;
