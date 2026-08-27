import { useEffect, useState } from "react";
import Header from "../components/header.jsx";
import Hero from "../components/hero.jsx";
import ClothingSection from "../components/ClothingSection.jsx";
import BrowseByaStyle from "../components/BrowseByStyle.jsx";
import ReviewSection from "../components/ReviewsSection.jsx";
import { getProducts } from "../lib/api.js";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data.products))
            .catch(() => setError("Unable to load products"))
            .finally(() => setLoading(false));
    }, []);

    const newArrivals = products.filter((product) =>
        ["new-arrival", "new-arrivals"].includes(
            product.section?.toLowerCase().replaceAll(" ", "-")
        )
    );
    const topSelling = products.filter((product) =>
        product.section?.toLowerCase().replaceAll(" ", "-") === "top-selling"
    );

    return (
        <>
            <Header />
            <Hero />
            {loading && <p className="text-center py-10">Loading products...</p>}
            {error && <p className="text-center py-10 text-red-500">{error}</p>}
            {!loading && !error && (
                <>
                    <ClothingSection title="New Arrival" products={newArrivals.slice(0, 4)} viewAllTo="/productType?section=new-arrivals" />
                    <ClothingSection title="TOP SELLING" products={topSelling.slice(0, 4)} viewAllTo="/productType?section=top-selling" />
                </>
            )}
            <BrowseByaStyle />
            <ReviewSection />
        </>
    );
}

export default Home
