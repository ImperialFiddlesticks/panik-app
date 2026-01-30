import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";

export const Route = createFileRoute("/address/")({
  component: AddressScreen,
});

type AddressResult = {
  label: string;
  lat: number;
  lng: number;
};

function AddressScreen() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AddressResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const suggestions: AddressResult[] = useMemo(() => {
    const all: AddressResult[] = [
      { label: "Stureplan, Stockholm", lat: 59.3349, lng: 18.0733 },
      { label: "Odenplan, Stockholm", lat: 59.3429, lng: 18.0496 },
      { label: "Sergels Torg, Stockholm", lat: 59.3326, lng: 18.0649 },
      { label: "Gamla Stan, Stockholm", lat: 59.325, lng: 18.0707 },
    ];

    const q = query.trim().toLowerCase();
    if (!q) return [];
    return all.filter((x) => x.label.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  const handleSubmit = async () => {
    if (!selected) return;

    setIsLoading(true);

    navigate({
      to: "/result",
      search: {
        method: "address",
        lat: selected.lat,
        lng: selected.lng,
        label: selected.label,
      },
    });
  };

  return (
    <div className="address-screen-container">
      <div className="address-area">
        <h2 className="address-title">Enter an address</h2>
        <p className="address-subtitle">
          We’ll check parking rules at that spot.
        </p>

        <input
          className="address-input"
          value={query}
          placeholder="e.g. Stureplan 2, Stockholm"
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
          }}
        />

        {/* Suggestion list */}
        {suggestions.length > 0 && (
          <div className="address-suggestions">
            {suggestions.map((s) => (
              <button
                key={s.label}
                className={`address-suggestion ${
                  selected?.label === s.label ? "is-selected" : ""
                }`}
                onClick={() => setSelected(s)}
                type="button"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Selected preview */}
        {selected && (
          <div className="address-selected">
            <strong>Selected:</strong> {selected.label}
          </div>
        )}
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
