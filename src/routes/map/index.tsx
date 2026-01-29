import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { SubmitButton } from '../../components/SubmitButton/SubmitButton';

export const Route = createFileRoute('/map/')({
  component: MapScreen,
})

function MapScreen() {
const navigate = useNavigate();
const [selected, setSelected] = useState<{lat: number; lng: number} | null>(null);
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  if (!selected) return;

  setIsLoading(true);

  navigate({
    to:"/result",
    search: {method: "map", lat: selected.lat, lng: selected.lng},
  });
};

  return <div className="map-screen-container">
    <div className="map">
      place map here
    </div>
    <div className="screen-submit">
      <SubmitButton label="Can I park here?!" loadingLabel="Checking..." isLoading={isLoading} disabled={!selected} onClick={handleSubmit}/>
    </div>
  </div>
}
