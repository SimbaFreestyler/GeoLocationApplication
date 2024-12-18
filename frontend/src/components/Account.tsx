import { useEffect, useState } from "react";
import { DriverResponse, VehicleResponse, TrackerResponse } from "../dto/dto";
import { getDriverData } from "../actions/drivers";
import AddVehicleForm from "./AddVehicleForm";
import AddTrackerForm from "./AddTrackerForm";
import "../css/account.css";

function Account() {
  const [driverData, setDriverData] = useState<DriverResponse | null>(null);
  const [vehicleData, setVehicleData] = useState<VehicleResponse[] | null>(
    null
  );
  const [trackerData, setTrackerData] = useState<TrackerResponse[] | null>(
    null
  );
  const [addVehicleFormVisible, setAddVehicleFormVisible] =
    useState<boolean>(false);
  const [addTrackerFormVisible, setAddTrackerFormVisible] =
    useState<boolean>(false);

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
    <>
      {addVehicleFormVisible && (
        <div className="modal-overlay">
          <AddVehicleForm onClose={() => setAddVehicleFormVisible(false)} />
        </div>
      )}
      {addTrackerFormVisible && (
        <div className="modal-overlay">
          <AddTrackerForm onClose={() => setAddTrackerFormVisible(false)} />
        </div>
      )}
      <div className="user-container">
        <div className="user-box">
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
          <div className="vehicle-list">
            <h2 className="label-font">Lista pojazdów</h2>
            {vehicleData?.length ? (
              <ul>
                {vehicleData.map((vehicle: VehicleResponse) => (
                  <li key={vehicle.registrationNumber}>
                    <strong>Nr rej.:</strong> {vehicle.registrationNumber} |
                    <strong>VIN:</strong> {vehicle.vinNumber} |
                    <strong>Marka:</strong> {vehicle.brand} |
                    <strong>Model:</strong> {vehicle.model}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="label-font">Brak pojazdów.</p>
            )}
            <button
              className="add-button"
              onClick={() => {
                setAddVehicleFormVisible(true);
              }}
            >
              Dodaj pojazd
            </button>
          </div>
          <div className="tracker-list">
            <h2 className="label-font">Lista lokalizatorów</h2>
            {trackerData?.length ? (
              <ul>
                {trackerData.map((tracker: TrackerResponse) => (
                  <li key={tracker.serialNumber}>
                    <strong>Nr seryjny:</strong> {tracker.serialNumber} |
                    <strong>Nazwa:</strong> {tracker.name} |
                    <strong>Typ:</strong> {tracker.type}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="label-font">Brak lokalizatorów.</p>
            )}
            <button
              className="add-button"
              onClick={() => {
                setAddTrackerFormVisible(true);
              }}
            >
              Dodaj lokalizator
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
