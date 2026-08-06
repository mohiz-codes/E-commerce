import Review from "./ReviewCard"
import { reviews } from "../lib/Data"
import arl from "../assets/arrowleft.png"
import arr from "../assets/arrowright.png"


function ReviewSection() {
    return(
        <>
        
        <div className="flex flex-col py-[80px] gap-[40px] ">
        <div className="flex justify-between items-center max-w-[1240px] w-full mx-auto ">
        <h1 className=" integral-font font-bold text-[48px] leading-[1] tracking-0" >OUR HAPPY COUSTOMERS</h1>
        <div className=" flex gap-[16px]">
            <img className="w-[24px] h-[24px]" src={arl} alt="img" />
            <img className="w-[24px] h-[24px]" src={arr} alt="img" />
        </div>
         </div>

         <div className="relative">

            <div className="w-32 h-full absolute top-0 right-0 backdrop-blur-[2px] z-10"></div>
             <div className="w-15 h-full absolute top-0 left-0 backdrop-blur-[2px] z-10"></div>
        <div className="overflow-hidden">
        <div className=" flex gap-5 transition-transform duration-500 "
         style={{
      transform: "translateX(-340px)"
    }}>
            
            {reviews.map((review, index) => (
            <Review key={index}  review={review}/>

            ))}            
          
        </div>
         </div>
        </div>
        </div>
       
       
      
        </>
    )
}
export default ReviewSection