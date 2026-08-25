import Breadcrumb from "../components/BreadCrumb"
import Filters from "../components/FiltersPageContent"
import Header from "../components/header"
import { useSearchParams } from "react-router-dom";


function ProductType() {
    const [params] = useSearchParams();
    const path = ["Home", params.get("section") === "new-arrivals" ? "New Arrivals" : params.get("sale") === "true" ? "On Sale" : "Shop"]

    return(
        <>

        <Header/>
        <Breadcrumb items={path}/>
        
        <Filters key={params.toString()} initialFilters={{
            section: params.get("section") || "",
            sale: params.get("sale") || ""
        }}/>
        </>
    )
}
export default ProductType