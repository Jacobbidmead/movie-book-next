import LandingPage from "./pages/landingPage";
import Media from "./pages/media";

export default function Home() {
  return (
    <>
      <div className="flex flex-col bg-dark">
        <LandingPage />
        <Media />
      </div>
    </>
  );
}
