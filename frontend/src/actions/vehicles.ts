import { request } from "../components/requestConfig";
import { BasicResponse, VehicleDriverRequest, VehicleDriverResponse, VehicleRequest, VehicleResponse, VehicleTrackerRequest, VehicleTrackerResponse } from "../dto/dto";


export async function createVehicle(vehicle: VehicleRequest): Promise<VehicleResponse | null> {
    try {
        const response = await request("POST", "/vehicle", vehicle);
        return response.data;
    } catch (error) {
        console.error("Error creating vehicle:", error);
        return null;
    }
}

export async function deleteVehicle(registrationNumber: string): Promise<BasicResponse> {
    try {
        const response = await request("DELETE", `/vehicle/${registrationNumber}`);
        
        if (response.status === 200) {
            return {
                success: true,
                message: response.data.message || "Vehicle deleted successfully",
            };
        } else {
            return {
                success: false,
                message: response.data.message || "Failed to delete vehicle",
            };
        }
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        return {
            success: false,
            message: "An error occurred while deleting the vehicle.",
        };
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

