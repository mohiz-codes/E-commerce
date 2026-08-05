
import Rating from "./Rating"



function ClothingSection({title, products}) {
    return(
       
    <section className="flex flex-col justify-center items-center gap-[55px] pt-[72px] pb-20">
        <h1 className="integral-font font-bold text-[48px] leading-[1] tracking-0 text-black">
            {title}
        </h1>
        {/* this div is to make gap bw articles and view all button as it differs */}
        <div className="flex flex-col gap-9 items-center">
         {/* this div contains the articles*/}
        <div className="flex gap-[20px]">

            {products.map((product, index) => (
                <div key={index} className=" flex flex-col gap-[16px]">
                <img src={product.image} alt="img" />
                <p className="font-bold text-[20px] leading-[1] tracking-0">{product.title}</p>
                {/*this is for the rating of article*/}
               <div className="flex gap-[13px] ">
                <Rating rating={product.rating}/>
                <span className="text-[14px] font-[400] leading-[1] tracking-0 text-[#101010] ">{product.rating}/5</span>
                </div>
                {/*this is for the price of articles*/}

                <div className="flex gap-2.5 items-center">
                <ins className="font-bold leading-[1] tracking-0 text-[24px] no-underline">${product.originalPrice}</ins>
                {product.discountedPrice &&<del className="font-bold leading-[1] tracking-0 text-[24px]  text-[#999999]">${product.discountedPrice}</del> }
                
                {product.discount && <span className= "rounded-[62px] px-[14px] py-[6px] bg-[#ffebeb] text-[#FF3333] font-medium text-[12px] leading-[1] tracking-0 " >{product.discount}</span>}

                </div>
            </div>
            ))}

        </div>
        <button className="rounded-[62px] py-[16px] px-[54px] border-1 border-[#0000001A] font-[500px] text-[16px] leading-[1] tracking-0">View All</button>

        </div>
    </section>
    )
}
export default ClothingSection