import React, { useEffect, useState } from "react";
import { DriverResponse } from "../dto/dto";
import AddDriverForm from "./AddDriverForm";
import { getDrivers } from "../actions/drivers";

function Drivers() {
  const [drivers, setDrivers] = useState<DriverResponse[] | null>(
    null
  );

  const [addDriverFormVisible, setAddDriverFormVisible] =
    useState<boolean>(false);

  const loadDriverData = async () => {
    const data = await getDrivers();
    setDrivers(data);
  };

  useEffect(() => {
    loadDriverData();
  }, []);

  return (
    <>
      {addDriverFormVisible && (
        <div className="modal-overlay">
          <AddDriverForm onClose={() => {
            setAddDriverFormVisible(false);
            loadDriverData();
            }} />
        </div>
      )}
      <div className="tracker-list">
        <h2 className="label-font">Lista kierowców</h2>
        {drivers?.length ? (
          <ul>
            {drivers.map((driver: DriverResponse) => (
              <li key={driver.id}>
                <strong>Id:</strong> {driver.id}
                <br></br>
                <strong>Imię:</strong> {driver.name}
                <br></br>
                <strong>Nazwisko:</strong> {driver.surname}
              </li>
            ))}
          </ul>
        ) : (
          <p className="label-font">Brak kierowców.</p>
        )}
        <button
          className="add-button"
          onClick={() => {
            setAddDriverFormVisible(true);
          }}
        >
          Dodaj kierowcę
        </button>
      </div>
    </>
  );
}

export default Drivers;
