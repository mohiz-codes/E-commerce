import Review from "./ReviewCard"
import arl from "../assets/arrowleft.png"
import arr from "../assets/arrowright.png"
import { useEffect, useRef, useState } from "react";
import { getReviews } from "../lib/api.js";


function ReviewSection() {
    const [reviews, setReviews] = useState([]);
    const [offset, setOffset] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [maxOffset, setMaxOffset] = useState(0);
    const viewportRef = useRef(null);
    const trackRef = useRef(null);

    function getMaxOffset() {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        return viewport && track ? Math.max(0, track.scrollWidth - viewport.clientWidth) : 0;
    }

    function getStep() {
        const track = trackRef.current;
        const firstReview = track?.firstElementChild;
        if (!track || !firstReview) return 0;
        return firstReview.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || "0");
    }

    function showPreviousReview() {
        setOffset((currentOffset) => Math.max(0, currentOffset - getStep()));
    }

    function showNextReview() {
        setOffset((currentOffset) => Math.min(getMaxOffset(), currentOffset + getStep()));
    }

    useEffect(() => {
        getReviews().then(setReviews).catch(() => setReviews([]));
    }, []);

    useEffect(() => {
        if (!viewportRef.current) return undefined;
        const observer = new ResizeObserver(([entry]) => setViewportWidth(entry.contentRect.width));
        observer.observe(viewportRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const nextMaxOffset = getMaxOffset();
            setMaxOffset(nextMaxOffset);
            setOffset((currentOffset) => Math.min(currentOffset, nextMaxOffset));
        });
        return () => cancelAnimationFrame(frame);
    }, [reviews.length, viewportWidth]);

    return(
        <>
        
        <div className="flex flex-col py-[80px] gap-[40px] ">
        <div className="flex justify-between items-center max-w-[1240px] w-full mx-auto ">
        <h1 className=" integral-font font-bold text-[48px] leading-[1] tracking-0" >OUR HAPPY COUSTOMERS</h1>
        <div className=" flex gap-[16px]">
            <button
              type="button"
              onClick={showPreviousReview}
              disabled={offset === 0}
              aria-label="Show previous review"
              className="disabled:cursor-not-allowed disabled:opacity-30"
            >
              <img className="w-[24px] h-[24px]" src={arl} alt="" />
            </button>
            <button
              type="button"
              onClick={showNextReview}
              disabled={offset >= maxOffset}
              aria-label="Show next review"
              className="disabled:cursor-not-allowed disabled:opacity-30"
            >
              <img className="w-[24px] h-[24px]" src={arr} alt="" />
            </button>
        </div>
         </div>

        <div className="relative max-w-[1240px] w-full mx-auto">

            <div className="w-32 h-full absolute top-0 right-0 backdrop-blur-[2px] z-10"></div>
             <div className="w-15 h-full absolute top-0 left-0 backdrop-blur-[2px] z-10"></div>
        <div ref={viewportRef} className="overflow-hidden">
        <div ref={trackRef} className=" flex gap-5 transition-transform duration-500 ease-in-out"
         style={{
      transform: `translateX(-${offset}px)`
    }}>
            
            {reviews.map((review, index) => (
            <Review key={review._id || `${review.name}-${index}`} review={review}/>

            ))}
          
        </div>
         </div>
        </div>
        </div>
       
       
      
        </>
    )
}
export default ReviewSection
