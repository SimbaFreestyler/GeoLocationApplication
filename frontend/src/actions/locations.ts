import { request } from "../components/requestConfig";
import { LocationResponse } from "../dto/dto";

export async function getVehicleLocations(vehicleId: string, startDate: string, endDate: string): Promise<LocationResponse[] | null> {
    try {
        const response = await request("GET", `/location/vehicle/${vehicleId}/${startDate}/${endDate}`);
        return response.data;
    } catch (error) {
        console.error("Error getting vehicle locations:", error);
        return null;
    }
}