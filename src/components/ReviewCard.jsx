import Rating from "./Rating";
import tick from "../assets/tick.png"



function Review({review, variant='compact'}) {
    return(
    <>
    <div className={`flex shrink-0 flex-col gap-3 px-[32px] py-[28px] border-1 border-[#0000001A] rounded-[20px] ${variant === 'compact' ? 'w-[400px] max-w-[calc(100vw-2rem)]' : 'w-[600px] max-w-full'}`}>
     <Rating  rating={review.rating}/>

    <div className="flex gap-1">
    <span className="pt-[3px] font-bold text-[20px] leading-[22px] tracking-0 ">{review.user?.name || review.name}</span>
   
    <img src={tick} alt="img" />

    </div>
   
    <p className="font-[400] text-[15px] leading-[22px] tracking-0 text-[#00000099]">{review.feedback}</p>
        {variant === 'expanded' && review.postedOn && (
            <p className="text-sm text-gray-500">
                Posted on {new Date(review.postedOn).toLocaleDateString()}
            </p>
        )}
    </div>
    </>
    )
}

 export default Review