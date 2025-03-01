import FloatingButton from "../../components/FloatingButton";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductList from "../../components/product_components/ProductList";

export default function Product() {
    return (
        <div className="bg-white">
            <FloatingButton />
            <Navbar />
            <ProductList />
            <Footer />
        </div>
    )
}