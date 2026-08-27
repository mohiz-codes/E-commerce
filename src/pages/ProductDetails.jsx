import Breadcrumb from "../components/BreadCrumb.jsx";
import Product from "../components/BuyProduct.jsx";
import ProductReviews from "../components/ProductReviews.jsx";
import ClothingSection from "../components/ClothingSection.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getRecommendations } from "../lib/api.js";


function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");
    const [recommendations, setRecommendations] = useState([]);

    useEffect(()=>{
        window.scrollTo({top:0, behavior:"smooth"})
        getProduct(id)
            .then((item) => {
                setProduct(item);
                return getRecommendations(id);
            })
            .then(setRecommendations)
            .catch(() => setError("Unable to load product"));
    },[id])

    if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
    if (!product) return <p className="text-center py-20">Loading product...</p>;

    return (
        <>

            <Breadcrumb items={["Home", "Shop", "Men", "T-Shirts"]}/>
            <Product product={product}/>
            <ProductReviews productId={product._id}/>
            <ClothingSection title="You Might Also Like" products={recommendations}/>

        </>
    );
}

export default ProductDetails;
