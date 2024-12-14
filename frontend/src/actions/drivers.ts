import { DriverResponse } from "../dto/dto";
import { request } from "../components/requestConfig";

export async function getDriverData(): Promise<DriverResponse | null> {
    try {
        const response = await request("GET", "/driver", {});
        return response.data;
    } catch (error) {
        console.error("Error fetching driver data:", error);
        return null;
    }
}