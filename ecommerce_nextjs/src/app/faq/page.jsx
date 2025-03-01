import FaqList from "../../components/faq_components/FaqList";
import FloatingButton from "../../components/FloatingButton";
import Footer from "../../components/Footer";
// import HeaderKatalog from "../../components/katalog_components/HeaderKatalog";
import Navbar from "../../components/Navbar";

export default function FAQ() {
    return (
        <div className="bg-gray-100">
            <FloatingButton />
            <Navbar />
            <FaqList />
            <Footer />
        </div>
    )
}