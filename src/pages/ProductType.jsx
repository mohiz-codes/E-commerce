import Breadcrumb from "../components/BreadCrumb";
import Filters from "../components/FiltersPageContent";
import Header from "../components/header";
import { useSearchParams } from "react-router-dom";

function ProductType() {
    const [params] = useSearchParams();
    const initialFilters = Object.fromEntries(
        ["section", "sale", "dressStyle", "clothingType", "category", "search", "color", "size"].flatMap((key) => {
            const value = params.get(key);
            return value ? [[key, value]] : [];
        })
    );
    const label = params.get("dressStyle") || (params.get("section") === "new-arrivals" ? "New Arrivals" : params.get("section") === "top-selling" ? "Top Selling" : params.get("sale") === "true" ? "On Sale" : params.get("search") ? `Search: ${params.get("search")}` : "Shop");

    return(
        <>

        <Header/>
        <Breadcrumb items={["Home", label]}/>
        
        <Filters key={params.toString()} initialFilters={initialFilters} title={label}/>
        </>
    );
}
export default ProductType;
