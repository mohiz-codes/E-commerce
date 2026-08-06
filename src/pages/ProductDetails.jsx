import Navbar from "../components/navbar.jsx"
import Footer from "../components/footer.jsx";
import Breadcrumb from "../components/BreadCrumb.jsx";
import { breadcrumbs } from "../lib/Data.js";
import Product from "../components/BuyProduct.jsx";
import ProductReviews from "../components/ProductReviews.jsx";
import ClothingSection from "../components/ClothingSection.jsx";
import { Recommendation } from "../lib/Data.js";


function ProductDetails() {
    return (
        <>
            <Navbar />

            <Breadcrumb items = {breadcrumbs}/>
            <Product/>
            <ProductReviews/>
            <ClothingSection  title={'You Might Also Like'} products={Recommendation}/>

            <Footer />
        </>
    );
}

export default ProductDetails;