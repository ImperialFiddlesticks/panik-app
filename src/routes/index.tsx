import { createFileRoute } from "@tanstack/react-router";
import { HomeOptionButton } from "../components/HomeOptionButton";

export const Route = createFileRoute("/")({
  component: HomeScreen,
});

function HomeScreen() {
  return (
    <div className="home-container">
      <img
        src="/panikheadlineblue.png"
        alt="Less Panik, more parking!"
        className="home-headline"
      />
      <img
        src="/we_read_signs.png"
        alt="i.e, we read the signs so you don't have to!"
        className="home-subheading"
      />
      <div className="home-options">
        <HomeOptionButton
          icon={<img className="option-icon" alt="Map Icon" src="/map.png" />}
          title="Check on Map"
          description="Use your location or tap a spot"
          to="/map"
        />

        <HomeOptionButton
          icon={
            <img className="option-icon" alt="Camera Icon" src="/camera.png" />
          }
          title="Scan a parking sign"
          description="Upload a photo and we decode it"
          to="/photo"
        />

        <HomeOptionButton
          icon={
            <img className="option-icon" alt="House Icon" src="/house.png" />
          }
          title="Enter an address"
          description="Type an address and check the rules"
          to="/address"
        />
      </div>
    </div>
  );
}
