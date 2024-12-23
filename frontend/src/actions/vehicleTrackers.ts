import { request } from "../components/requestConfig";
import { BasicResponse, VehicleTrackerRequest, VehicleTrackerResponse } from "../dto/dto";

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

export async function deleteVehicleTracker(vehicleTracker: VehicleTrackerResponse): Promise<BasicResponse> {
    try {
        const startDate = Array.isArray(vehicleTracker.startDate)
        ? vehicleTracker.startDate.join("-")
        : vehicleTracker.startDate;
        console.log(startDate);
        const response = await request("DELETE", `/vehicle/tracker/${vehicleTracker.vehicle?.registrationNumber}/${vehicleTracker.tracker?.serialNumber}/${startDate}`);
        
        if (response.status === 200) {
            return {
                success: true,
                message: response.data.message || "Vehicle tracker deleted successfully",
            };
        } else {
            return {
                success: false,
                message: response.data.message || "Failed to delete vehicle tracker",
            };
        }
    } catch (error) {
        console.error("Error deleting vehicle tracker:", error);
        return {
            success: false,
            message: "An error occurred while deleting the vehicle tracker.",
        };
    }
}