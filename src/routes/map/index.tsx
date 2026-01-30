import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

export const Route = createFileRoute("/map/")({
  component: MapScreen,
});

type LatLng = { lat: number; lng: number };

function ClickToSelect({ onSelect }: { onSelect: (pos: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function MapScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<LatLng | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [center, setCenter] = useState<LatLng>({ lat: 59.3293, lng: 18.0686 });

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {},
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }, []);

  const handleSubmit = async () => {
    if (!selected) return;

    setIsLoading(true);

    navigate({
      to: "/result",
      search: { method: "map", lat: selected.lat, lng: selected.lng },
    });
  };

  return (
    <div className="map-screen-container">
      <div className="map">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={16}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickToSelect onSelect={setSelected} />
          {selected && <Marker position={[selected.lat, selected.lng]} />}
        </MapContainer>
      </div>
      <div className="screen-submit">
        <SubmitButton
          label="Can I park here?!"
          loadingLabel="Checking..."
          isLoading={isLoading}
          disabled={!selected}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
