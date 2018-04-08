//Interfaces for State Objects
export interface IAppState {
  user?: IUserState;
  allTrips?: IAllTripsState;
  userTrips?: any[];
  currentTrip?: ICurrentTripState;
  languageName: string;
  enthusiasmLevel: number;
  testDialogOpen: boolean;
  loading: boolean;
}

export interface IUserState {
  userName: string;
  isActive: boolean;
  isAuthenticated: boolean;
  hasUnconfirmedTrips: boolean;
  org: string;
  role: UserRole; //create separate file for UserRole
}

export enum UserRole {
  Visitor,
  Member,
  Administrator
}

export interface INewTripState {
  inProgress: boolean;
  movements: any[];
}
export interface IUserTrips {
  trips: any[];
}
export interface IAllTripsState {
  trips: any[];
}
//current trip the user is viewing
export interface ICurrentTripState {
  name: string;
  movements: any[];
  date: Date;
}

// export interface StoreState {
//   languageName: string;
//   enthusiasmLevel: number;
// }




