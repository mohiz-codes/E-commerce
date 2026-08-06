import filter from "../assets/filter.png";
import down from "../assets/arrowdown.png"
import { Filter } from "../assets/SVGs";
import { useState } from "react";
import Review from "./ReviewCard";
import { reviews } from "../lib/Data";

function ProductReviews() {

    const [isHovering, setIsHovering]=useState(false)
  return (
    <section className=" ">
      {/* Header */}
      <div className="max-w-[1240px] w-full mx-auto flex gap justify-around">
        <span className="text-[20px] font-[500] leading-[22px] tracking-0  text-[#00000099]">
          Product Details
        </span>
        <span className="text-[20px] font-[500] leading-[22px] tracking-0  text-black">
          Rating & Reviews
        </span>
        <span className="text-[20px] font-[500] leading-[22px] tracking-0  text-[#00000099]">
          FAQs
        </span>
      </div>
      <hr className="max-w-[1240px] mx-auto w-full border-t border-[#D9D9D9] mb-[56px] mt-[24px]" />
      {/* Review Options */}
      <div className="max-w-[1240px] mx-auto flex justify-between items-center pb-[24px]">
        <div className="flex w-full gap-1">
        <span className=" font-bold text-[24px] leading-[1] tracking-0 text-black">
          All Reviews 
        </span>
        <span className="text-[#00000099]">(466)</span>
        </div>

        <div className="w-full justify-end flex items-center gap-[10px] pb-6 ">
            <div onMouseEnter={()=> {setIsHovering(true)} } onMouseOut={() => {setIsHovering(false)}} className="rounded-[50%] px-[20px] py-4  bg-[#F0F0F0] hover:bg-black  cursor-pointer">
          <Filter className="" color={isHovering? 'white' : 'black'}  />
            </div>

          <div className="relative max-w-[120px] w-full select">
          <select
            className="appearance-none w-full px-[20px] py-[16px] bg-[#F0F0F0] text-black rounded-[62px] hover:bg-black hover:text-white cursor-pointer"
            name=""
            id=""
          >
            <option value="latest" selected>
              Latest
            </option>

        <option value="old">Old</option>
          </select>
            <img className="flex my-auto pointer-events-none inset-y-0 absolute right-[16px] " src={down} alt="img" />
          </div>
          <button className=" shrink-0 px-[20px] py-[16px] bg-[#F0F0F0] text-black rounded-[62px] hover:bg-black hover:text-white cursor-pointer">
            Write a Review
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
        <div className="max-w-[1240px] w-full mx-auto grid grid-cols-2 gap-x-4 gap-y-4  pb-[36.5px]">
           { reviews.map((review) => 
            <Review review ={review} variant="expanded"/>
           )
           }
        </div>
      {/* Load More */}
      <div className="flex justify-center">
      <button className="px-[54px] py-[16px] border-1 border-[#0000001A] rounded-[62px] text-black hover:text-white hover:bg-black">Load More Reviews</button>
      </div>
    </section>
  );
}
export default ProductReviews;
