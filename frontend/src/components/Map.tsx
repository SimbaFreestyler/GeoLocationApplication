import { useEffect, useRef } from "react";
import leaflet, { map } from "leaflet";

function Map() {
  const mapRef = useRef<leaflet.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current && document.getElementById("map")) {

      mapRef.current = leaflet.map("map").setView([51.505, -0.09], 13);

    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapRef.current);
  }

  return () => {
    mapRef.current?.remove();
    mapRef.current = null;
  }
  }, []);

    
  return (
    <>
      <div>
        <h1 className="title">Map</h1>
      </div>
      <div id="map" style={{ height: "600px", width: "100%" }}></div>
    </>
  );
}

export default Map;
