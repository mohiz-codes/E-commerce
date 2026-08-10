
import Rating from "./Rating"
import { Link, useNavigate } from "react-router-dom"

function Clothitem({products}) {
    const navigate = useNavigate();
    return(
        <>
        
         {/* this div contains the articles*/}
        <div className="flex flex-wrap gap-[20px]">
            

            {products.map((product, index) => (
                <div key={index} className=" flex flex-col gap-[16px] cursor-pointer" onClick={()=> navigate('/product')}>
                
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
       

      
        </>
    )
}
export default Clothitem