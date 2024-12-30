/* tslint:disable */
/* eslint-disable */

export interface BasicResponse {
  message: string | null;
  success: boolean | null;
}

export interface Cloneable {
}

export interface Comparable<T> {
}

export interface Coordinate extends Comparable<Coordinate>, Cloneable, Serializable {
  coordinate: Coordinate | null;
  m: number | null;
  valid: boolean | null;
  x: number | null;
  y: number | null;
  z: number | null;
}

export interface CoordinateSequence extends Cloneable {
  dimension: number | null;
  measures: number | null;
}

export interface CoordinateSequenceFactory {
}

export interface DriverRequest {
  name: string | null;
  surname: string | null;
}

export interface DriverResponse {
  id: number | null;
  name: string | null;
  surname: string | null;
}

export interface Envelope extends Comparable<any>, Serializable {
  area: number | null;
  diameter: number | null;
  height: number | null;
  maxX: number | null;
  maxY: number | null;
  minX: number | null;
  minY: number | null;
  null: boolean | null;
  width: number | null;
}

export interface ErrorResponse {
  message: string | null;
}

export interface Geometry extends Cloneable, Comparable<any>, Serializable {
  area: number | null;
  boundary: Geometry | null;
  boundaryDimension: number | null;
  centroid: Point | null;
  coordinate: Coordinate | null;
  coordinates: Coordinate[] | null;
  dimension: number | null;
  empty: boolean | null;
  envelope: Geometry | null;
  envelopeInternal: Envelope | null;
  factory: GeometryFactory | null;
  geometryType: string | null;
  interiorPoint: Point | null;
  length: number | null;
  numGeometries: number | null;
  numPoints: number | null;
  precisionModel: PrecisionModel | null;
  rectangle: boolean | null;
  simple: boolean | null;
  srid: number | null;
  userData: any | null;
  valid: boolean | null;
}

export interface GeometryFactory extends Serializable {
  coordinateSequenceFactory: CoordinateSequenceFactory | null;
  precisionModel: PrecisionModel | null;
  srid: number | null;
}

export interface LocationRequest {
  name: string | null;
  serialNumber: string | null;
  type: string | null;
}

export interface LocationResponse {
  coords: Point | null;
  id: number | null;
  timestamp: string | null;
  trackerId: string | null;
}

export interface Point extends Geometry, Puntal {
  coordinateSequence: CoordinateSequence | null;
  x: number | null;
  y: number | null;
}

export interface PrecisionModel extends Serializable, Comparable<any> {
  floating: boolean | null;
  maximumSignificantDigits: number | null;
  offsetX: number | null;
  offsetY: number | null;
  scale: number | null;
  type: Type | null;
}

export interface Puntal {
}

export interface Serializable {
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

export interface Type extends Serializable {
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
