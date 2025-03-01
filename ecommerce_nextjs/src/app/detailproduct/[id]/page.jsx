"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProductDetail } from "../../../api/ApiProduct";
import DeskripsiDetail from "../../../components/detailproduct_components/DeskripsiDetail";
import CardDetail from "../../../components/detailproduct_components/CardDetail";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

export default function DetailProductPage() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                console.log("Fetching product with ID:", params.id);
                const productData = await fetchProductDetail(params.id);
                console.log("Received product data:", productData);
                if (productData) {
                    setProduct(productData);
                }
            } catch (error) {
                console.error("Error fetching product detail:", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            getProductDetail();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl text-gray-600">Produk tidak ditemukan</h1>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <Navbar />
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CardDetail product={product} />
                <DeskripsiDetail product={product} />
            </div>
            <Footer />
        </div>
    );
} 