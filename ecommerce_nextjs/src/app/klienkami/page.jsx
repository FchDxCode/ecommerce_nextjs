import FloatingButton from "../../components/FloatingButton";
import Footer from "../../components/Footer";
import CtaBanner from "../../components/klienkami_components/CtaBanner";
import Klien from "../../components/landing_components/Klien";
import Testimonial from "../../components/landing_components/Testimonial";
import Navbar from "../../components/Navbar";
import FormContact from "../../components/klienkami_components/FormContact";

export default function KlienKami() {
    return (
        <div className="bg-gray-100">
            <FloatingButton />
            <Navbar />
            <CtaBanner />
            <FormContact />
            <Klien />
            <Testimonial />
            <Footer />
        </div>
    )
}