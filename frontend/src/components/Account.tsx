import { useEffect, useState } from "react";
import { VehicleResponse, VehicleTrackerResponse, UserResponse } from "../dto/dto";
import AddVehicleForm from "./AddVehicleForm";
import AddTrackerForm from "./AddTrackerForm";
import "../css/account.css";
import AddVehicleTrackerForm from "./AddVehicleTrackerForm";
import { getVehicleTrackers } from "../actions/vehicles";
import { getUserData } from "../actions/users";

function Account() {
  const [vehicleData, setVehicleData] = useState<VehicleResponse[] | null>(
    null
  );
  const [userData, setUserData] = useState<UserResponse | null>(null);

  const [vehicleTrackers, setVehicleTrackers] = useState<VehicleTrackerResponse[] | null>(
    null
  );
  const [addVehicleFormVisible, setAddVehicleFormVisible] =
    useState<boolean>(false);
  const [addVehicleTrackerFormVisible, setAddVehicleTrackerFormVisible] =
    useState<boolean>(false);

  const loadVehicleTrackerData = async () => {
      const data = await getVehicleTrackers();
      setVehicleTrackers(data);
    };

    const loadUserData = async () => {
    try {
      const data = await getUserData();
      setUserData(data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setUserData(null);
    }
  };

  useEffect(() => {
    loadUserData();
    loadVehicleTrackerData()
    console.log(vehicleTrackers);
  }, []);

  return (
    <>
      {addVehicleFormVisible && (
        <div className="modal-overlay">
          <AddVehicleForm onClose={() => {
            setAddVehicleFormVisible(false);
            loadVehicleTrackerData();
          }}/>
        </div>
      )}
      {addVehicleTrackerFormVisible && (
        <div className="modal-overlay">
          <AddVehicleTrackerForm onClose={() => {
            setAddVehicleTrackerFormVisible(false);
            loadVehicleTrackerData();
          }} />
        </div>
      )}
      <div className="user-container">
        <div className="user-box">
          <h1 className="title">Panel użytkownika</h1>
          <div className="account-info">
            {userData ? (
              <>
                <h2 className="label-font">Dane konta</h2>
                <p className="label-font">
                  <strong>Email:</strong> {userData.email}
                </p>
              </>
            ) : (
              <p className="label-font">Ładowanie danych konta...</p>
            )}
          </div>
          <div className="vehicle-list">
            <h2 className="label-font">Użytkowane pojazdy</h2>
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
            <h2 className="label-font">Lokalizatory w pojazdach</h2>
            {vehicleTrackers?.length ? (
              <ul>
              {vehicleTrackers.map((tracker: VehicleTrackerResponse) => (
                <li key={`${tracker.tracker?.serialNumber}-${tracker.vehicle?.registrationNumber}`}>
                    <strong>Pojazd:</strong> {tracker.vehicle?.brand} {tracker.vehicle?.model} - {tracker.vehicle?.registrationNumber}
                    <br></br>
                    <strong>Lokalizator:</strong> {tracker.tracker?.name} - {tracker.tracker?.serialNumber}
                    <br></br>
                  <strong>Okres:</strong> {tracker.startDate || "N/A"} - {tracker.endDate || "N/A"}
                </li>
              ))}
            </ul>
            ) : (
              <p className="label-font">Brak lokalizatorów.</p>
            )}
            <button
              className="add-button"
              onClick={() => {
                setAddVehicleTrackerFormVisible(true);
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
