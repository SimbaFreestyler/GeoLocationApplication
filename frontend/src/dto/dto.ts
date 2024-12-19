/* tslint:disable */
/* eslint-disable */

export interface DriverRequest {
  name: string | null;
  surname: string | null;
  user: UserEntity | null;
}

export interface DriverResponse {
  id: number | null;
  name: string | null;
  surname: string | null;
  user: UserResponse | null;
}

export interface ErrorResponse {
  message: string | null;
}

export interface LocationRequest {
  name: string | null;
  serialNumber: string | null;
  type: string | null;
}

export interface LocationResponse {
  name: string | null;
  serialNumber: string | null;
  type: string | null;
}

export interface TrackerRequest {
  name: string;
  serialNumber: string;
  type: string;
}

export interface TrackerResponse {
  name: string;
  serialNumber: string;
  type: string;
}

export interface UserDriverRequest {
  email: string | null;
  name: string | null;
  password: string | null;
  surname: string | null;
}

export interface UserEntity {
  email: string | null;
  password: string | null;
}

export interface UserRequest {
  email: string | null;
  password: string | null;
}

export interface UserResponse {
  email: string | null;
  token: string | null;
}

export interface VehicleRequest {
  brand: string;
  model: string;
  registrationNumber: string;
  vinNumber: string;
}

export interface VehicleResponse {
  brand: string;
  model: string;
  registrationNumber: string;
  vinNumber: string;
}

export interface VehicleTrackerRequest {
  endDate: string | null;
  startDate: string | null;
  trackerId: string | null;
  vehicleId: string | null;
}

export interface VehicleTrackerResponse {
  endDate: string | null;
  startDate: string | null;
  tracker: TrackerResponse | null;
  vehicle: VehicleResponse | null;
}
