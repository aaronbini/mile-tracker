//State Interfaces
export interface IAppState {
  user?: ICurrentUser;
  allTrips?: ITrip[];
  userTrips?: ITrip[];
  currentTrip?: ICurrentTrip;
  loading: boolean;
  newTrip?: INewTrip;
  isAuthenticated: boolean;
}

export interface ICurrentUser {
  userName: string;
  isActive: boolean;
  isAuthenticated: boolean;
  hasUnconfirmedTrips: boolean;
  org: string;
  role: UserRole;
}

export interface INewTrip {
  //could be used to check whether user wants to complete trip before navigating away
  inProgress: boolean;
  //need a Movement interface
  movements: any[];
}

//current trip the user is viewing
export interface ICurrentTrip {
  name: string;
  movements: IMovement[];
  startDate: Date;
  endDate: Date;
}

export interface ITrip {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate: Date;
  totalMiles: number;
  users: string[];
  confirmedUsers: string[];
}

export interface IMovement {
  mode: MovementMode;
  distance: number;
}

//enums
export enum UserRole {
  Visitor,
  Member,
  Administrator
}

export enum MovementMode {
  Car,
  Train,
  Bus,
  Plane
}






