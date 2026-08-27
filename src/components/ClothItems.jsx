
import Rating from "./Rating"
import { useNavigate } from "react-router-dom"

function Clothitem({products}) {
    const navigate = useNavigate();
    return(
        <>
        
         {/* this div contains the articles*/}
        <div className="grid w-full max-w-[1240px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            

            {products.map((product) => (
                <div key={product._id} className="flex min-w-0 flex-col gap-[16px] cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
                
                <img
                  className="aspect-square w-full rounded-[20px] bg-[#F0F0F0] object-cover"
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.title}
                />
               
                <p className="font-bold text-[20px] leading-[1] tracking-0">{product.title}</p>
                {/*this is for the rating of article*/}
               <div className="flex gap-[13px] ">
                <Rating rating={product.rating}/>
                <span className="text-[14px] font-[400] leading-[1] tracking-0 text-[#101010] ">{product.rating}/5</span>
                </div>
                {/*this is for the price of articles*/}

                <div className="flex gap-2.5 items-center">
                <ins className="font-bold leading-[1] tracking-0 text-[24px] no-underline">${product.discountedPrice ?? product.originalPrice}</ins>
                {product.discountedPrice != null && <del className="font-bold leading-[1] tracking-0 text-[24px] text-[#999999]">${product.originalPrice}</del>}
                
                {product.discount != null && <span className="rounded-[62px] px-[14px] py-[6px] bg-[#ffebeb] text-[#FF3333] font-medium text-[12px] leading-[1] tracking-0">-{product.discount}%</span>}

                </div>
            </div>
            ))}
        
        </div>
       

      
        </>
    )
}
export default Clothitem
