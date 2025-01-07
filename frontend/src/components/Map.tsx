import { useEffect, useRef, useState } from "react";
import leaflet, { map } from "leaflet";
import "../css/map.css";
import { DriverResponse, LocationResponse } from "../dto/dto";
import AddDriverRouteForm from "./AddDriverRouteForm";
import AddVehicleRouteForm from "./AddVehicleRouteForm";
import { getDriverLocations, getVehicleLocations } from "../actions/locations";

type Point = {
  latitude: number;
  longitude: number;
};

type DriverRoute = {
  driverId: number;
  fullName: string;
  startDate: string;
  endDate: string;
  points?: Point[];
  color?: string;
};

type VehicleRoute = {
  registrationNumber: string;
  fullName: string;
  startDate: string;
  endDate: string;
  points?: Point[];
  color?: string;
};

function Map() {
  const mapRef = useRef<leaflet.Map | null>(null);
  const polylineLayerGroup = useRef<leaflet.LayerGroup>(leaflet.layerGroup());
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "gray",
    "black",
    "white",
    "cyan",
    "magenta",
    "lime",
    "indigo",
    "violet",
    "teal",
    "maroon",
    "navy",
    "olive",
  ];
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

  const handleDriverRouteDelete = async (
    id: number | null,
    startDate: string
  ) => {
    try {
      const updatedDrivers = driverRoutes.filter(
        (driver) => !(driver.driverId === id && driver.startDate === startDate)
      );
      setDriverRoutes(updatedDrivers);
    } catch (err) {
      console.error("Błąd podczas usuwania trasy kierowcy:", err);
    }
  };

  const handleVehicleRouteDelete = async (
    id: string | null,
    startDate: string
  ) => {
    try {
      const updatedVehicles = vehicleRoutes.filter(
        (vehicle) =>
          !(
            vehicle.registrationNumber === id && vehicle.startDate === startDate
          )
      );
      setVehicleRoutes(updatedVehicles);
    } catch (err) {
      console.error("Błąd podczas usuwania trasy pojazdu:", err);
    }
  };

  useEffect(() => {
    if (!mapRef.current && document.getElementById("map")) {
      mapRef.current = leaflet.map("map").setView([50.299, 18.787], 13);

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

  useEffect(() => {
    polylineLayerGroup.current.clearLayers();

    driverRoutes.forEach((route) => {
      if (route.points && route.points.length > 0) {
        const latLngs: [number, number][] = route.points.map((point) => [
          point.latitude,
          point.longitude,
        ]);
        leaflet
          .polyline(latLngs, { color: route.color || "blue", weight: 6 })
          .addTo(polylineLayerGroup.current);
      }
    });

    vehicleRoutes.forEach((route) => {
      if (route.points && route.points.length > 0) {
        const latLngs: [number, number][] = route.points.map((point) => [
          point.latitude,
          point.longitude,
        ]);
        leaflet
          .polyline(latLngs, { color: route.color || "green", weight: 6 })
          .addTo(polylineLayerGroup.current);
        console.log("Draw: ", latLngs);
      }
    });

    polylineLayerGroup.current.addTo(mapRef.current!);
  }, [driverRoutes, vehicleRoutes]);

  return (
    <>
      {addDriverRouteFormVisible && (
        <div className="modal-overlay">
          <AddDriverRouteForm
            onClose={() => {
              setAddDriverRouteFormVisible(false);
            }}
            onAddDriver={async (driver: DriverRoute) => {
              const data: LocationResponse[] | null = await getDriverLocations(
                driver.driverId,
                driver.startDate,
                driver.endDate
              );
              const points: Point[] = (data || [])
                .filter(
                  (point) => point.latitude !== null && point.longitude !== null
                )
                .map((point) => ({
                  latitude: point.latitude as number,
                  longitude: point.longitude as number,
                }));
              driver.points = points;
              const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
              driver.color = randomColor;
              console.log("Points driver: ", driver);
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
            onAddVehicle={async (vehicle: VehicleRoute) => {
              const data: LocationResponse[] | null = await getVehicleLocations(
                vehicle.registrationNumber,
                vehicle.startDate,
                vehicle.endDate
              );
              const points: Point[] = (data || [])
                .filter(
                  (point) => point.latitude !== null && point.longitude !== null
                )
                .map((point) => ({
                  latitude: point.latitude as number,
                  longitude: point.longitude as number,
                }));
              vehicle.points = points;
              const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
              vehicle.color = randomColor;
              console.log("Points vehicle: ", vehicle);
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
                      <br></br>
                      <strong>Kolor trasy: </strong>
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "20px",
                          backgroundColor: driver.color || "blue",
                        }}
                      ></span>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDriverRouteDelete(
                          driver.driverId,
                          driver.startDate
                        )
                      }
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
                  <li
                    key={`${vehicle.registrationNumber} ${vehicle.startDate}`}
                  >
                    <div>
                      <strong>Marka i model:</strong> {vehicle.fullName}
                      <br></br>
                      <strong>Data od:</strong> {vehicle.startDate}
                      <br></br>
                      <strong>Data do:</strong> {vehicle.endDate}
                      <br></br>
                      <strong>Kolor trasy: </strong>
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "20px",
                          backgroundColor: vehicle.color || "green",
                        }}
                      ></span>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() =>
                        handleVehicleRouteDelete(
                          vehicle.registrationNumber,
                          vehicle.startDate
                        )
                      }
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
