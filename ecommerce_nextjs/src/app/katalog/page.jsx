import FloatingButton from "../../components/FloatingButton";
import Footer from "../../components/Footer";
import KatalogList from "../../components/katalog_components/KatalogList";
import Navbar from "../../components/Navbar";

export default function Katalog() {
    return (
        <div className="bg-gray-100">
            <FloatingButton />
            <Navbar />
            <KatalogList />
            <Footer />
        </div>
    )
}