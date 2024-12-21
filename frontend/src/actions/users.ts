import { request } from "../components/requestConfig";
import { UserResponse } from "../dto/dto";


export async function getUserData(): Promise<UserResponse | null> {
    try {
        const response = await request("GET", "/user", {});
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}