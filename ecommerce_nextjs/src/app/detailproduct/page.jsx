import DeskripsiDetail from "../../components/detailproduct_components/DeskripsiDetail";
import CardDetail from "../../components/detailproduct_components/CardDetail";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function DetailProductPage() {
    return (
        <div className="bg-white">
            <Navbar />
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CardDetail />
                <DeskripsiDetail />
            </div>
            <Footer />
        </div>
    )
}