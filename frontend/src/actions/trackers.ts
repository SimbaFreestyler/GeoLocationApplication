import { request } from "../components/requestConfig";
import { BasicResponse, TrackerRequest, TrackerResponse } from "../dto/dto";

export async function createTracker(vehicle: TrackerRequest): Promise<TrackerResponse | null> {
    try {
        const response = await request("POST", "/tracker", vehicle);
        return response.data;
    } catch (error) {
        console.error("Error creating tracker:", error);
        return null;
    }
}

export async function getTrackers(): Promise<TrackerResponse[] | null> {
    try {
        const response = await request("GET", "/tracker");
        return response.data;
    } catch (error) {
        console.error("Error getting trackers:", error);
        return null;
    }
}

export async function deleteTracker(serialNumber: string): Promise<BasicResponse> {
    try {
        const response = await request("DELETE", `/tracker/${serialNumber}`);
        
        if (response.status === 200) {
            return {
                success: true,
                message: response.data.message || "Tracker deleted successfully",
            };
        } else {
            return {
                success: false,
                message: response.data.message || "Failed to delete tracker",
            };
        }
    } catch (error) {
        console.error("Error deleting tracker:", error);
        return {
            success: false,
            message: "An error occurred while deleting tracker.",
        };
    }
}