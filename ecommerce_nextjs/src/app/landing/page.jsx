import Navbar from "../../components/Navbar";
import Sliders from "../../components/landing_components/Sliders";
import HeroSections from "../../components/landing_components/HeroSections";
import MengapaKami from "../../components/landing_components/MengapaKami";
import Klien from "../../components/landing_components/Klien";
import Testimonial from "../../components/landing_components/Testimonial";
import InstagramPost from "../../components/landing_components/InstagramPost";
// import CtaBanner from "@/components/klienkami_components/CtaBanner";
import Footer from "../../components/Footer";
import FloatingButton from "../../components/FloatingButton";
import ProductKategoriLanding from "../../components/landing_components/Product";

export default function LandingPage() {
    return (
        <div className="bg-slate-100">
            <FloatingButton />
            <Navbar />
            <Sliders />
            <HeroSections />
            <ProductKategoriLanding />
            <MengapaKami />
            <Klien />
            <Testimonial />
            <InstagramPost />
            {/* <CtaBanner /> */}
            <Footer />
        </div>

    )

}

