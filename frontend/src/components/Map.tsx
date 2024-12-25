import { useEffect, useRef, useState } from "react";
import leaflet, { map } from "leaflet";
import "../css/map.css";
import { DriverResponse } from "../dto/dto";
import AddDriverRouteForm from "./AddDriverRouteForm";
import AddVehicleRouteForm from "./AddVehicleRouteForm";

type DriverRoute = {
  driverId: number;
  fullName: string;
  startDate: string;
  endDate: string;
};

type VehicleRoute = {
  registrationNumber: string;
  fullName: string;
  startDate: string;
  endDate: string;
};

function Map() {
  const mapRef = useRef<leaflet.Map | null>(null);
  const [driverRoutes, setDriverRoutes] = useState<DriverRoute[]>(() => {
    const savedRoutes = localStorage.getItem("driverRoutes");
    return savedRoutes ? JSON.parse(savedRoutes) : [];
  });

  const [vehicleRoutes, setVehicleRoutes] = useState<VehicleRoute[]>(() => {
    const savedRoutes = localStorage.getItem("vehicleRoutes");
    return savedRoutes ? JSON.parse(savedRoutes) : [];
  });

  const [addDriverRouteFormVisible, setAddDriverRouteFormVisible] =
    useState<boolean>(false);

  const [addVehicleRouteFormVisible, setAddVehicleRouteFormVisible] =
    useState<boolean>(false);

  const handleDriverRouteDelete = async (id: number | null, startDate:string) => {
    try {
      const updatedDrivers = driverRoutes.filter((driver) => !(driver.driverId === id && driver.startDate === startDate));
      setDriverRoutes(updatedDrivers);
    } catch (err) {
      console.error("Błąd podczas usuwania trasy kierowcy:", err);
    }
  };

  const handleVehicleRouteDelete = async (id: string | null, startDate: string) => {
    try {
      const updatedVehicles = vehicleRoutes.filter((vehicle) => !(vehicle.registrationNumber === id && vehicle.startDate === startDate));
      setVehicleRoutes(updatedVehicles);
    } catch (err) {
      console.error("Błąd podczas usuwania trasy pojazdu:", err);
    }
  };

  useEffect(() => {
    if (!mapRef.current && document.getElementById("map")) {
      mapRef.current = leaflet.map("map").setView([51.505, -0.09], 13);

      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(mapRef.current);
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("driverRoutes", JSON.stringify(driverRoutes));
    console.log(driverRoutes);
  }, [driverRoutes]);

  useEffect(() => {
    localStorage.setItem("vehicleRoutes", JSON.stringify(vehicleRoutes));
    console.log(vehicleRoutes);
  }, [vehicleRoutes]);

  return (
    <>
      {addDriverRouteFormVisible && (
        <div className="modal-overlay">
          <AddDriverRouteForm
            onClose={() => {
              setAddDriverRouteFormVisible(false);
            }}
            onAddDriver={(driver: DriverRoute) => {
              const updatedDrivers = [...driverRoutes, driver];
              setDriverRoutes(updatedDrivers);
            }}
          />
        </div>
      )}
      {addVehicleRouteFormVisible && (
        <div className="modal-overlay">
          <AddVehicleRouteForm
            onClose={() => {
              setAddVehicleRouteFormVisible(false);
            }}
            onAddVehicle={(vehicle: VehicleRoute) => {
              const updatedVehicles = [...vehicleRoutes, vehicle];
              setVehicleRoutes(updatedVehicles);
            }}
          />
        </div>
      )}
      <div className="box">
        <h1 className="title">Mapa</h1>
        <div id="map" style={{ height: "50vh", width: "100%" }}></div>
        <div className="content">
          <div className="list left">
            <h2 className="label-font">Trasy kierowców</h2>
            {driverRoutes?.length ? (
              <ul>
                {driverRoutes.map((driver: DriverRoute) => (
                  <li key={`${driver.driverId} ${driver.startDate}`}>
                    <div>
                      <strong>Imię i nazwisko:</strong> {driver.fullName}
                      <br></br>
                      <strong>Data od:</strong> {driver.startDate}
                      <br></br>
                      <strong>Data do:</strong> {driver.endDate}
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => handleDriverRouteDelete(driver.driverId, driver.startDate)}
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
                setAddDriverRouteFormVisible(true);
              }}
            >
              Dodaj kierowcę
            </button>
          </div>

          <div className="list right">
            <h2 className="label-font">Trasy pojazdów</h2>
            {vehicleRoutes?.length ? (
              <ul>
                {vehicleRoutes.map((vehicle: VehicleRoute) => (
                  <li key={`${vehicle.registrationNumber} ${vehicle.startDate}`}>
                    <div>
                      <strong>Marka i model:</strong> {vehicle.fullName}
                      <br></br>
                      <strong>Data od:</strong> {vehicle.startDate}
                      <br></br>
                      <strong>Data do:</strong> {vehicle.endDate}
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => handleVehicleRouteDelete(vehicle.registrationNumber, vehicle.startDate)}
                    >
                      Usuń
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="label-font">Brak pojazdów.</p>
            )}
            <button
              className="add-button"
              onClick={() => {
                setAddVehicleRouteFormVisible(true);
              }}
            >
              Dodaj pojazd
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Map;
