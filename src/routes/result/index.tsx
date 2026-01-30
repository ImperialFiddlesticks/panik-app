import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

type Method = "map" | "address" | "photo";

type ParkingApiResponse = {
  allowed?: boolean;
  reason?: string;
  error?: string;
  // add other fields your backend returns
};

type ResultState =
  | { status: "idle" | "loading"; data?: null; error?: null }
  | { status: "success"; data: ParkingApiResponse; error?: null }
  | { status: "error"; data?: null; error: string };

export const Route = createFileRoute("/result/")({
  validateSearch: (search: Record<string, unknown>) => {
    const method = (search.method as Method) ?? "map";

    return {
      method,
      lat: search.lat !== undefined ? Number(search.lat) : undefined,
      lng: search.lng !== undefined ? Number(search.lng) : undefined,
      label: (search.label as string | undefined) ?? undefined,
      signType: (search.signType as string | undefined) ?? undefined,
    };
  },
  component: ResultScreen,
});

function ResultScreen() {
  const { method, lat, lng, label, signType } = useSearch({ from: "/result/" });

  const [state, setState] = useState<ResultState>({ status: "idle" });

  const photoMock: ParkingApiResponse | null = useMemo(() => {
    if (method !== "photo") return null;

    switch (signType) {
      case "free":
        return { allowed: true, reason: "Free parking (example sign)" };
      case "paid":
        return { allowed: true, reason: "Paid parking (example sign)" };
      case "timelimit":
        return { allowed: true, reason: "Time-limited parking (example sign)" };
      case "noparking":
        return { allowed: false, reason: "No parking (example sign)" };
      default:
        return { allowed: undefined, reason: "Could not recognize the sign." };
    }
  }, [method, signType]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (method === "photo") {
        setState({
          status: "success",
          data: photoMock ?? { error: "No mock data" },
        });
        return;
      }

      if (
        typeof lat !== "number" ||
        typeof lng !== "number" ||
        Number.isNaN(lat) ||
        Number.isNaN(lng)
      ) {
        setState({
          status: "error",
          error: "Missing or invalid location coordinates.",
        });
        return;
      }

      setState({ status: "loading" });

      try {
        const params = new URLSearchParams({
          lat: String(lat),
          lng: String(lng),
        });

        const res = await fetch(
          `https://localhost:7113/parking?${params.toString()}`,
          {
            headers: { Accept: "application/json" },
          },
        );

        const text = await res.text();
        const data: ParkingApiResponse = text ? JSON.parse(text) : {};

        if (!res.ok) {
          const msg = data?.error ?? `Request failed (${res.status})`;
          if (!cancelled) setState({ status: "error", error: msg });
          return;
        }

        if (!cancelled) setState({ status: "success", data });
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Network error";
        if (!cancelled) setState({ status: "error", error: msg });
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [method, lat, lng, photoMock]);

  const title =
    method === "map"
      ? "Map result"
      : method === "address"
        ? "Address result"
        : "Photo result";

  if (state.status === "loading" || state.status === "idle") {
    return (
      <div className="result-container">
        <h2>{title}</h2>
        <p>Checking parking rules…</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="result-container">
        <h2>{title}</h2>
        <div className="result-card result-card--error">
          <h3>Couldn’t check parking</h3>
          <p>{state.error}</p>
          <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
            If you’re running locally, this may be a CORS or HTTPS issue.
          </p>
        </div>
      </div>
    );
  }

  const allowed = state.data?.allowed;
  const reason =
    state.data?.reason ?? state.data?.error ?? "No reason provided.";

  return (
    <div className="result-container">
      <h2>{title}</h2>

      {method === "address" && label && (
        <p style={{ marginTop: 0, opacity: 0.8 }}>{label}</p>
      )}

      <div
        className={`result-card ${allowed === false ? "result-card--no" : "result-card--yes"}`}
      >
        <div className="result-big">
          {allowed === true ? (
            <img className="result-img" alt="Yes" src="/yes.png" />
          ) : allowed === false ? (
            <img className="result-img" alt="No" src="/no.png" />
          ) : (
            "🤔 Unclear"
          )}
        </div>
        <p className="result-reason">{reason}</p>

        {typeof lat === "number" && typeof lng === "number" && (
          <p className="result-coords">
            {lat.toFixed(5)}, {lng.toFixed(5)}
          </p>
        )}
      </div>
    </div>
  );
}
