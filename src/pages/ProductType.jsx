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
        <Navbar/>
        <Breadcrumb items={path}/>
        <Filters/>
        <Footer/>
        </>
    )
}
export default ProductType