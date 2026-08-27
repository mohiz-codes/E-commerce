import { Filter } from "../assets/SVGs";
import { useEffect, useState } from "react";
import Review from "./ReviewCard";
import { getProductReviews } from "../lib/api.js";

function ProductReviews({ productId }) {
  const [isHovering, setIsHovering] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getProductReviews(productId).then(setReviews).catch(() => setError("Unable to load reviews"));
  }, [productId]);

  return (
    <section className="mt-12">
      <div className="max-w-[1240px] w-full mx-auto flex justify-around">
        <span className="text-[18px] md:text-[20px] font-medium leading-[22px] text-[#00000099]">Product Details</span>
        <span className="text-[18px] md:text-[20px] font-medium leading-[22px] text-black border-b-2 border-black pb-2">Rating & Reviews</span>
        <span className="text-[18px] md:text-[20px] font-medium leading-[22px] text-[#00000099]">FAQs</span>
      </div>
      <hr className="max-w-[1240px] mx-auto w-full border-t border-[#D9D9D9] mb-[40px] mt-[16px]" />
      <div className="max-w-[1240px] mx-auto flex flex-wrap justify-between items-center gap-4 pb-[24px]">
        <div className="flex items-center gap-2"><span className="font-bold text-[20px] md:text-[24px] leading-[1] text-black">All Reviews</span><span className="text-[#00000099] text-sm md:text-base">({reviews.length})</span></div>
        <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="rounded-full p-3.5 bg-[#F0F0F0] hover:bg-black transition-colors"><Filter color={isHovering ? "white" : "black"} /></div>
      </div>
      {error ? <p className="text-center pb-10 text-red-500">{error}</p> : reviews.length === 0 ? (
        <div className="text-center py-12 bg-[#F0F0F0]/50 rounded-[20px] max-w-[1240px] mx-auto mb-10"><p className="text-gray-500 text-sm">No reviews yet.</p></div>
      ) : (
        <div className="max-w-[1240px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 pb-[36.5px]">{reviews.map((review) => <Review key={review._id} review={review} variant="expanded" />)}</div>
      )}
    </section>
  );
}

export default ProductReviews;
