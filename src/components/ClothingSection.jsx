import Clothitem from "./ClothItems"



function ClothingSection({ title, products = [] }) {
    return(
       
    <section className="flex flex-col justify-center items-center gap-[55px] pt-[72px] pb-20 w-full">
        <h1 className="integral-font font-bold text-[48px] leading-[1] tracking-0 text-black">
            {title}
        </h1>
        <div className="flex flex-col gap-9 items-center">
            
        <Clothitem products={products}/>
        
         <button className="rounded-[62px] py-[16px] px-[54px] border-1 border-[#0000001A] font-[500px] text-[16px] leading-[1] tracking-0 hover:bg-black hover:text-white">View All</button>
        </div>
    </section>
    )
}
export default ClothingSection