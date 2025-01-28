import { useEffect, useRef, useState } from "react";
import leaflet from "leaflet";
import "../css/map.css";
import {
  DriverResponse,
  LocationRequest,
  LocationResponse,
  PeriodType,
  TrackerResponse,
  VehicleResponse,
} from "../dto/dto";
import { getTrackers } from "../actions/trackers";
import { getVehicles } from "../actions/vehicles";
import { getDrivers } from "../actions/drivers";
import { getLocations } from "../actions/locations";

type Point = {
  latitude: number;
  longitude: number;
};   

type FormValues = {
  routeType: string;
  periodType: PeriodType;
  trackerId?: string;
  vehicleId?: string;
  driverId?: number;
  startDate?: string;
  endDate?: string;
};

const periodTypeOptions = [
  { value: "TODAY", label: "Dzisiaj" },
  { value: "YESTERDAY", label: "Wczoraj" },
  { value: "LAST_WEEK", label: "Ostatni tydzień" },
  { value: "LAST_MONTH", label: "Ostatni miesiąc" },
  { value: "LAST_YEAR", label: "Ostatni rok" },
  { value: "CUSTOM", label: "Niestandardowy" },
];

function Map() {
  const mapRef = useRef<leaflet.Map | null>(null);
  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const [trackers, setTrackers] = useState<TrackerResponse[]>([]);
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [drivers, setDrivers] = useState<DriverResponse[]>([]);
  const loadTrackerData = async () => {
    const data = await getTrackers();
    setTrackers(data ?? []);
  };
  const loadVehicleData = async () => {
    const data = await getVehicles();
    setVehicles(data ?? []);
  };
  const loadDriverData = async () => {
    const data = await getDrivers();
    setDrivers(data ?? []);
  };

  const [formValues, setFormValues] = useState<FormValues>({
    routeType: "Lokalizator",
    periodType: "TODAY" as PeriodType,
  });

  const fetchLocations = async () => {
    setLocations(await getLocations(formValues as LocationRequest) ?? []);
  }

  useEffect(() => {
    console.log('Form values changed', formValues);
    fetchLocations();
  }, [formValues])

  useEffect(() => {
    console.log('Zmineiły się?', locations);
    if (!mapRef.current) return;
  
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof leaflet.Polyline) {
        mapRef.current?.removeLayer(layer);
      }
    });
  
    const latLngs: [number, number][] = locations
      .filter(loc => loc.latitude !== null && loc.longitude !== null)
      .map(loc => [loc.latitude as number, loc.longitude as number]);
  
    if (latLngs.length > 1) {
      leaflet.polyline(latLngs, { color: "blue", weight: 4 }).addTo(mapRef.current!);
    }
  }, [locations]);

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
    loadTrackerData();
    loadVehicleData();
    loadDriverData();

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const handleInputChange = (field: keyof FormValues, value: string) => {
    console.log(formValues);
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="box">
        <h1 className="title">Mapa</h1>

        <div className="dropdown-container">
          <label className="dropdown-label" htmlFor="routeTypeDropdown">
            Typ trasy:
          </label>
          <select
            id="routeTypeDropdown"
            className="dropdown"
            value={formValues.routeType}
            onChange={(e) => handleInputChange("routeType", e.target.value)}
          >
            <option value="Lokalizator">Lokalizator</option>
            <option value="Pojazd">Pojazd</option>
            <option value="Kierowca">Kierowca</option>
          </select>
          {formValues.routeType == "Lokalizator" && (
            <>
              <label className="dropdown-label" htmlFor="trackerDropdown">
                Lokalizator:
              </label>
              <select
                id="trackerDropdown"
                className="dropdown"
                value={formValues.trackerId || ""}
                onChange={(e) => handleInputChange("trackerId", e.target.value)}
                disabled={trackers.length === 0}
              >
                {trackers.length === 0 ? (
                  <option value="">Brak dostępnych lokalizatorów</option>
                ) : (
                  trackers.map((tracker) => (
                    <option
                      key={tracker.serialNumber}
                      value={tracker.serialNumber}
                    >
                      {tracker.name} - {tracker.serialNumber}
                    </option>
                  ))
                )}
              </select>
            </>
          )}

          {formValues.routeType == "Pojazd" && (
            <>
              <label className="dropdown-label" htmlFor="vehicleDropdown">
                Pojazd:
              </label>
              <select
                id="vehicleDropdown"
                className="dropdown"
                value={formValues.vehicleId || ""}
                onChange={(e) => handleInputChange("vehicleId", e.target.value)}
                disabled={vehicles.length === 0}
              >
                {vehicles.length === 0 ? (
                  <option value="">Brak dostępnych pojazdów</option>
                ) : (
                  vehicles.map((vehicle) => (
                    <option
                      key={vehicle.registrationNumber}
                      value={vehicle.registrationNumber}
                    >
                      {vehicle.brand} {vehicle.model} -{" "}
                      {vehicle.registrationNumber}
                    </option>
                  ))
                )}
              </select>
            </>
          )}

          {formValues.routeType == "Kierowca" && (
            <>
              <label className="dropdown-label" htmlFor="driverDropdown">
                Kierowca:
              </label>
              <select
                id="driverDropdown"
                className="dropdown"
                value={formValues.driverId || ""}
                onChange={(e) => handleInputChange("driverId", e.target.value)}
                disabled={drivers.length === 0}
              >
                {drivers.length === 0 ? (
                  <option value="">Brak dostępnych kierowców</option>
                ) : (
                  drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} {driver.surname}
                    </option>
                  ))
                )}
              </select>
            </>
          )}
        </div>

        <div className="dropdown-container">
          <label className="dropdown-label" htmlFor="periodTypeDropdown">
            Okres:
          </label>
          <select
            id="periodTypeDropdown"
            className="dropdown"
            value={formValues.periodType}
            onChange={(e) => handleInputChange("periodType", e.target.value)}
          >
            {periodTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formValues.periodType == 'CUSTOM' && (
            <>
              <label className="dropdown-label" htmlFor="startDate">
                Data od:
              </label>
              <input
                type="date"
                id="startDate"
                className="date-input"
                value={formValues.startDate || ""}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </>
          )}

          {formValues.periodType == 'CUSTOM' && (
            <>
              <label className="dropdown-label" htmlFor="endDate">
                Data do:
              </label>
              <input
                type="date"
                id="endDate"
                className="date-input"
                value={formValues.endDate || ""}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
              />
            </>
          )}
        </div>

        <div id="map" style={{ height: "50vh", width: "100%" }}></div>
      </div>
    </>
  );
}

export default Map;
