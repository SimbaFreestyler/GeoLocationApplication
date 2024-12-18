import { request } from "../components/requestConfig";
import { VehicleRequest, VehicleResponse } from "../dto/dto";


export async function createVehicle(vehicle: VehicleRequest): Promise<VehicleResponse | null> {
    try {
        const response = await request("POST", "/vehicle", vehicle);
        return response.data;
    } catch (error) {
        console.error("Error creating vehicle:", error);
        return null;
    }
}