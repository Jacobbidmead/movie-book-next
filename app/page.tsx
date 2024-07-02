import Media from "./pages/media";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen bg-night">
        <Media />
      </div>
      <Footer />
    </>
  );
}
