import {
  Outlet,
  createRootRoute,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { parkingFacts } from "../lib/parkingFacts";
import { useMemo } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();
  const { location } = useRouterState();
  const isHome = location.pathname === "/";

  const randomFact = useMemo(() => {
    return parkingFacts[Math.floor(Math.random() * parkingFacts.length)];
  }, [location.pathname]);

  return (
    <div className="main-container">
      <header>
        {!isHome ? (
          <button onClick={() => router.history.back()} aria-label="Go back">
            <img className="settings-icon" alt="Go Back Icon" src="/back.png" />
          </button>
        ) : (
          <div style={{ width: 40, margin: 10 }} />
        )}
        <img className="header-logo" alt="Panik Logo" src="/paniklogo.png" />
        <button>
          <img className="settings-icon" alt="Settings Icon" src="/gear.png" />
        </button>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>{randomFact}</p>
      </footer>
    </div>
  );
}
