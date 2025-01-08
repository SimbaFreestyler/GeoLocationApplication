import { useEffect, useState } from "react";
import {
  VehicleTrackerResponse,
  UserResponse,
  VehicleDriverResponse,
} from "../dto/dto";
import "../css/account.css";
import AddVehicleTrackerForm from "./AddVehicleTrackerForm";
import { getUserData } from "../actions/users";
import AddVehicleDriverForm from "./AddVehicleDriverForm";
import { deleteVehicleDriver, getVehicleDrivers } from "../actions/vehicleDrivers";
import { deleteVehicleTracker, getVehicleTrackers } from "../actions/vehicleTrackers";

function Account() {
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const [vehicleDrivers, setVehicleDrivers] = useState<
    VehicleDriverResponse[] | null
  >(null);
  const [vehicleTrackers, setVehicleTrackers] = useState<
    VehicleTrackerResponse[] | null
  >(null);
  const [addVehicleDriverFormVisible, setAddVehicleDriverFormVisible] =
    useState<boolean>(false);
  const [addVehicleTrackerFormVisible, setAddVehicleTrackerFormVisible] =
    useState<boolean>(false);

  const loadVehicleTrackerData = async () => {
    const data = await getVehicleTrackers();
    console.log(data);
    setVehicleTrackers(data);
  };

  const loadVehicleDriverData = async () => {
    const data = await getVehicleDrivers();
    console.log(data);
    setVehicleDrivers(data);
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

  const handleVehicleDriverDelete = async (
    vehicleDriver: VehicleDriverResponse
  ) => {
    try {
      await deleteVehicleDriver(vehicleDriver);
      loadVehicleDriverData();
    } catch (err) {
      console.error("Error deleting vehicle driver", err);
    }
  };

  const handleVehicleTrackerDelete = async (
    vehicleTracker: VehicleTrackerResponse
  ) => {
    try {
      await deleteVehicleTracker(vehicleTracker);
      loadVehicleTrackerData();
    } catch (err) {
      console.error("Error deleting vehicle trcker:", err);
    }
  };

  useEffect(() => {
    loadUserData();
    loadVehicleTrackerData();
    loadVehicleDriverData();
    console.log(vehicleTrackers);
  }, []);

  return (
    <>
      {addVehicleDriverFormVisible && (
        <div className="modal-overlay">
          <AddVehicleDriverForm
            onClose={() => {
              setAddVehicleDriverFormVisible(false);
              loadVehicleDriverData();
            }}
          />
        </div>
      )}
      {addVehicleTrackerFormVisible && (
        <div className="modal-overlay">
          <AddVehicleTrackerForm
            onClose={() => {
              setAddVehicleTrackerFormVisible(false);
              loadVehicleTrackerData();
            }}
          />
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
          <div className="list vehicle-driver-list right">
            <h2 className="label-font">Kierowcy pojazdów</h2>
            {vehicleDrivers?.length ? (
              <ul>
                {vehicleDrivers.map((driver: VehicleDriverResponse) => (
                  <li
                    key={`${driver.driver?.id}-${driver.vehicle?.registrationNumber}-${driver.startDate}`}
                  >
                    <div>
                      <strong>Pojazd:</strong> {driver.vehicle?.brand}{" "}
                      {driver.vehicle?.model} -{" "}
                      {driver.vehicle?.registrationNumber}
                      <br></br>
                      <strong>Kierowca:</strong> {driver.driver?.name}{" "}
                      {driver.driver?.surname}
                      <br></br>
                      <strong>Okres:</strong> {driver.startDate || "N/A"} -{" "}
                      {driver.endDate || "N/A"}
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => handleVehicleDriverDelete(driver)}
                    >
                      Usuń
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="label-font">Brak kierowców.</p>
            )}
            <button
              className="add-button"
              onClick={() => {
                setAddVehicleDriverFormVisible(true);
              }}
            >
              Dodaj kierowcę
            </button>
          </div>
          <div className="list vehicle-tracker-list right">
            <h2 className="label-font">Lokalizatory w pojazdach</h2>
            {vehicleTrackers?.length ? (
              <ul>
                {vehicleTrackers.map((tracker: VehicleTrackerResponse) => (
                  <li
                    key={`${tracker.tracker?.serialNumber}-${tracker.vehicle?.registrationNumber}-${tracker.startDate}`}
                  >
                    <div>
                      <strong>Pojazd:</strong> {tracker.vehicle?.brand}{" "}
                      {tracker.vehicle?.model} -{" "}
                      {tracker.vehicle?.registrationNumber}
                      <br></br>
                      <strong>Lokalizator:</strong> {tracker.tracker?.name} -{" "}
                      {tracker.tracker?.serialNumber}
                      <br></br>
                      <strong>Okres:</strong> {tracker.startDate || "N/A"} -{" "}
                      {tracker.endDate || "N/A"}
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => handleVehicleTrackerDelete(tracker)}
                    >
                      Usuń
                    </button>
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
