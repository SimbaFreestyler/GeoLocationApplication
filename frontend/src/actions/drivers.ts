import { BasicResponse, DriverRequest, DriverResponse } from "../dto/dto";
import { request } from "../components/requestConfig";

export async function createDriver(vehicle: DriverRequest): Promise<DriverResponse | null> {
    try {
        const response = await request("POST", "/driver", vehicle);
        return response.data;
    } catch (error) {
        console.error("Error creating driver:", error);
        return null;
    }
}

export async function getDrivers(): Promise<DriverResponse[] | null> {
    try {
        const response = await request("GET", "/driver");
        return response.data;
    } catch (error) {
        console.error("Error getting drivers:", error);
        return null;
    }
}

export async function getDriverData(): Promise<DriverResponse | null> {
    try {
        const response = await request("GET", "/driver", {});
        return response.data;
    } catch (error) {
        console.error("Error fetching driver data:", error);
        return null;
    }
}

export async function deleteDriver(id: number | null): Promise<BasicResponse> {
    try {
        const response = await request("DELETE", `/driver/${id}`);
        
        if (response.status === 200) {
            return {
                success: true,
                message: response.data.message || "Driver deleted successfully",
            };
        } else {
            return {
                success: false,
                message: response.data.message || "Failed to delete driver",
            };
        }
    } catch (error) {
        console.error("Error deleting driver:", error);
        return {
            success: false,
            message: "An error occurred while deleting driver.",
        };
    }
}