import { request } from "../components/requestConfig";
import { BasicResponse, VehicleDriverRequest, VehicleDriverResponse } from "../dto/dto";

export async function createVehicleDriver(vehicle: VehicleDriverRequest): Promise<VehicleDriverResponse | null> {
    try {
        const response = await request("POST", "/vehicle/driver", vehicle);
        return response.data;
    } catch (error) {
        console.error("Error creating vehicle driver:", error);
        return null;
    }
}

export async function getVehicleDrivers(): Promise<VehicleDriverResponse[] | null> {
    try {
        const response = await request("GET", "/vehicle/driver");
        return response.data;
    } catch (error) {
        console.error("Error getting vehicle drivers:", error);
        return null;
    }
}

export async function deleteVehicleDriver(vehicleDriver: VehicleDriverResponse): Promise<BasicResponse> {
    try {
        const startDate = Array.isArray(vehicleDriver.startDate)
        ? vehicleDriver.startDate.join("-")
        : vehicleDriver.startDate;
        const response = await request("DELETE", `/vehicle/driver/${vehicleDriver.vehicle?.registrationNumber}/${vehicleDriver.driver?.id}/${startDate}`);
        
        if (response.status === 200) {
            return {
                success: true,
                message: response.data.message || "Vehicle driver deleted successfully",
            };
        } else {
            return {
                success: false,
                message: response.data.message || "Failed to delete vehicle driver",
            };
        }
    } catch (error) {
        console.error("Error deleting vehicle driver:", error);
        return {
            success: false,
            message: "An error occurred while deleting the vehicle driver.",
        };
    }
}