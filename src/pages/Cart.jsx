import Breadcrumb from "../components/BreadCrumb";
import YourCart from "../components/Checkout";
import Header from "../components/header";
import Navbar from "../components/navbar";

export default function Cart() {
     const cart = ["Home","Cart"]
    return(
        <>
        <Header/>
        <Navbar/>
        <div className="mx-auto max-w-[1240px]">
             <hr className="max-w-[1240px] w-full border-t border-[#D9D9D9]" />
        </div>
        <Breadcrumb items={cart}/>
        <YourCart/>

        </>

    )
}
