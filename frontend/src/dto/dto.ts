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

export interface TrackerRequest {
  name: string | null;
  serialNumber: string | null;
  type: string | null;
}

export interface TrackerResponse {
  name: string | null;
  serialNumber: string | null;
  type: string | null;
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
  brand: string | null;
  model: string | null;
  registrationNumber: string | null;
  vinNumber: string | null;
}

export interface VehicleResponse {
  brand: string | null;
  model: string | null;
  registrationNumber: string | null;
  vinNumber: string | null;
}
