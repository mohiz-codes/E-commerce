import Rating from "./Rating";
import tick from "../assets/tick.png"



function Review({review}) {
    return(
    <>
    <div className="max-w-[400px] flex shrink-0 flex-col gap-3 px-[32px] py-[28px] border-1 border-[#0000001A] rounded-[20px]">
     <Rating  rating={review.rating}/>

    <div className="flex gap-1">
    <span className="pt-[3px] font-bold text-[20px] leading-[22px] tracking-0 ">{review.name}</span>
   
    <img src={tick} alt="img" />

    </div>
   
    <p className="font-[400] text-[15px] leading-[22px] tracking-0 text-[#00000099]">{review.feedback}</p>
    </div>
    </>
    )
}

 export default Review