import { useEffect, useRef, useState } from "react";
import leaflet from "leaflet";
import "../css/map.css";
import { PeriodType } from "../dto/dto";

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

  const [formValues, setFormValues] = useState<FormValues>({
    routeType: "Lokalizator",
    periodType: "TODAY" as PeriodType,
  });

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

  const handleInputChange = (field: keyof FormValues, value: string) => {
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
        </div>

        <div id="map" style={{ height: "50vh", width: "100%" }}></div>
      </div>
    </>
  );
}

export default Map;
