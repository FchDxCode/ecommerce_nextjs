// import CeoCefounder from "../../components/about_components/CeoCefounder";
import Header from "../../components/about_components/Header";
import StoryPt from "../../components/about_components/StoryPt";
import Struktur from "../../components/about_components/Struktur";
import VisiMisi from "../../components/about_components/VisiMisi";
import FloatingButton from "../../components/FloatingButton";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function About() {
  return (
    <div>
      <FloatingButton />
      <Navbar />
      <Header />
      <Struktur />
      <VisiMisi />
      <StoryPt />
      {/* <CeoCefounder /> */}
      <Footer />
    </div>

  );
}
