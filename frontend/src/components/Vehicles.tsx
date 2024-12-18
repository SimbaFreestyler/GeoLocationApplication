import React, { useState } from "react";
import { VehicleResponse } from "../dto/dto";
import AddVehicleForm from "./AddVehicleForm";

function Vehicles() {
  const [vehicleData, setVehicleData] = useState<VehicleResponse[] | null>(
    null
  );
  const [addVehicleFormVisible, setAddVehicleFormVisible] =
    useState<boolean>(false);

  return (
    <>
      {addVehicleFormVisible && (
        <div className="modal-overlay">
          <AddVehicleForm onClose={() => setAddVehicleFormVisible(false)} />
        </div>
      )}
      <div className="vehicle-list">
        <h2 className="label-font">Lista pojazdów</h2>
        {vehicleData?.length ? (
          <ul>
            {vehicleData.map((vehicle: VehicleResponse) => (
              <li key={vehicle.registrationNumber}>
                <strong>Nr rej.:</strong> {vehicle.registrationNumber} |
                <strong>VIN:</strong> {vehicle.vinNumber} |
                <strong>Marka:</strong> {vehicle.brand} |<strong>Model:</strong>{" "}
                {vehicle.model}
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
