import { DriverRequest, DriverResponse } from "../dto/dto";
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