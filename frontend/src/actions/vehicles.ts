import { request } from "../components/requestConfig";
import { VehicleRequest, VehicleResponse, VehicleTrackerRequest, VehicleTrackerResponse } from "../dto/dto";


export async function createVehicle(vehicle: VehicleRequest): Promise<VehicleResponse | null> {
    try {
        const response = await request("POST", "/vehicle", vehicle);
        return response.data;
    } catch (error) {
        console.error("Error creating vehicle:", error);
        return null;
    }
}

export async function getVehicles(): Promise<VehicleResponse[] | null> {
    try {
        const response = await request("GET", "/vehicle");
        return response.data;
    } catch (error) {
        console.error("Error getting vehicles:", error);
        return null;
    }
}

export async function createVehicleTracker(vehicle: VehicleTrackerRequest): Promise<VehicleTrackerResponse | null> {
    try {
        const response = await request("POST", "/vehicle/tracker", vehicle);
        return response.data;
    } catch (error) {
        console.error("Error creating vehicle tracker:", error);
        return null;
    }
}

export async function getVehicleTrackers(): Promise<VehicleTrackerResponse[] | null> {
    try {
        const response = await request("GET", "/vehicle/tracker");
        return response.data;
    } catch (error) {
        console.error("Error getting vehicle trackers:", error);
        return null;
    }
}

