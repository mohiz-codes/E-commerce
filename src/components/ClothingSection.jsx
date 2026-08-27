import Clothitem from "./ClothItems"
import { Link } from "react-router-dom";



function ClothingSection({ title, products = [], viewAllTo = "/productType" }) {
    return(
       
    <section className="flex flex-col justify-center items-center gap-[55px] pt-[72px] pb-20 w-full">
        <h1 className="integral-font font-bold text-[48px] leading-[1] tracking-0 text-black">
            {title}
        </h1>
        <div className="flex w-full max-w-[1240px] flex-col items-center gap-9 px-4 md:px-0">
            
        <Clothitem products={products}/>
        
         <Link to={viewAllTo} className="rounded-[62px] py-[16px] px-[54px] border-1 border-[#0000001A] font-[500px] text-[16px] leading-[1] tracking-0 hover:bg-black hover:text-white">View All</Link>
        </div>
    </section>
    )
}
export default ClothingSection
