import { useEffect, useState } from "react";
import { DriverResponse } from "../dto/dto";
import { getDriverData } from "../actions/drivers";
import "../css/account.css";

function Account() {
    const [driverData, setDriverData] = useState<DriverResponse | null>(null);

    const loadDriverData = async () => {
        try {
            const data = await getDriverData();
            setDriverData(data);
            console.log(data);
        } catch (err) {
            console.error("Error fetching driver data:", err);
            setDriverData(null);
        }
    };

    useEffect(() => {
        loadDriverData();
    }, []);

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="title">Panel użytkownika</h1>
                <div className="account-info">
                    {driverData ? (
                        <>
                            <h2 className="label-font">Dane konta</h2>
                            <p className="label-font">
                                <strong>Imię:</strong> {driverData.name}
                            </p>
                            <p className="label-font">
                                <strong>Nazwisko:</strong> {driverData.surname}
                            </p>
                            <p className="label-font">
                                <strong>Email:</strong> {driverData.user?.email}
                            </p>
                        </>
                    ) : (
                        <p className="label-font">Ładowanie danych konta...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Account;
