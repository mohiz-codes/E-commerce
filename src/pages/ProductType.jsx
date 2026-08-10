import Breadcrumb from "../components/BreadCrumb"
import Filters from "../components/Filters"
import Footer from "../components/footer"
import Header from "../components/header"
import Navbar from "../components/navbar"


function ProductType() {
    const path = ["Home","Casual"]

    return(
        <>

        <Header/>
        <Breadcrumb items={path}/>
        
        <Filters/>
        </>
    )
}
export default ProductType