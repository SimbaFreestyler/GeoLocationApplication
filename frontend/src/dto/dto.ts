/* tslint:disable */
/* eslint-disable */

export interface BasicResponse {
  message: string | null;
  success: boolean | null;
}

export interface DriverRequest {
  name: string | null;
  surname: string | null;
}

export interface DriverResponse {
  id: number;
  name: string;
  surname: string;
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
  id: number | null;
  latitude: number | null;
  longitude: number | null;
  timestamp: string | null;
  trackerId: string | null;
}

export interface RouteRequest {
  driverId: number | null;
  endDate: string | null;
  periodType: PeriodType;
  startDate: string | null;
  trackerId: string | null;
  vehicleId: string | null;
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

export interface UserRequest {
  email: string | null;
  password: string | null;
}

export interface UserResponse {
  email: string | null;
  token: string | null;
}

export interface VehicleDriverRequest {
  driverId: number | null;
  endDate: string | null;
  startDate: string | null;
  vehicleId: string | null;
}

export interface VehicleDriverResponse {
  driver: DriverResponse | null;
  endDate: string | null;
  startDate: string | null;
  vehicle: VehicleResponse | null;
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

export interface VehicleRouteResponse {
  endDateTime: string | null;
  startDateTime: string | null;
  trackerId: string | null;
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

export type PeriodType = "TODAY" | "YESTERDAY" | "LAST_WEEK" | "LAST_MONTH" | "LAST_YEAR" | "CUSTOM";
