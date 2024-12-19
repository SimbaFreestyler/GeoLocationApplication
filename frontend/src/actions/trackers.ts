import { request } from "../components/requestConfig";
import { TrackerRequest, TrackerResponse } from "../dto/dto";

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