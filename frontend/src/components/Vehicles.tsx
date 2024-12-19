import React, { useEffect, useState } from "react";
import { VehicleResponse } from "../dto/dto";
import AddVehicleForm from "./AddVehicleForm";
import { getVehicles } from "../actions/vehicles";

function Vehicles() {
  const [vehicles, setVehicles] = useState<VehicleResponse[] | null>(
    null
  );
  const [addVehicleFormVisible, setAddVehicleFormVisible] =
    useState<boolean>(false);

  const loadVehicleData = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };

  useEffect(() => {
    loadVehicleData();
  }, []);

  return (
    <>
      {addVehicleFormVisible && (
        <div className="modal-overlay">
          <AddVehicleForm
            onClose={() => {
              setAddVehicleFormVisible(false);
              loadVehicleData();
            }}
          />
        </div>
      )}
      <div className="vehicle-list">
        <h2 className="label-font">Lista pojazdów</h2>
        {vehicles?.length ? (
          <ul>
            {vehicles.map((vehicle: VehicleResponse) => (
              <li key={vehicle.registrationNumber}>
                <strong>Marka:</strong> {vehicle.brand}
                <br></br>
                <strong>Model:</strong> {vehicle.model}
                <br></br>
                <strong>Nr rej:</strong> {vehicle.registrationNumber}
                <br></br>
                <strong>VIN:</strong> {vehicle.vinNumber}
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
    </>
  );
}

export default Vehicles;
