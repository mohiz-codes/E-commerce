import { Filter } from "../assets/SVGs";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Review from "./ReviewCard";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { createReview, getProductReviews } from "../lib/api.js";
import { useAuth } from "../context/useAuth.js";

function ProductReviews({ productId }) {
  const [isHovering, setIsHovering] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const [form, setForm] = useState({
    name: user?.name || "",
    rating: 5,
    feedback: ""
  });

  useEffect(() => {
    getProductReviews(productId)
      .then(setReviews)
      .catch(() => setError("Unable to load reviews"));
  }, [productId]);

  async function submitReview(event) {
    event.preventDefault();
    if (!isAuthenticated) {
      setError("Please sign in to submit a review");
      return;
    }

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const review = await createReview({
        product: productId,
        name: form.name || user?.name || "Verified Buyer",
        rating: Number(form.rating),
        feedback: form.feedback
      });

      setReviews((items) => [review, ...items]);
      setForm({ name: user?.name || "", rating: 5, feedback: "" });
      setSuccess("Your review has been submitted successfully!");
      setTimeout(() => {
        setShowForm(false);
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError(err.message || "Unable to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-12">
      {/* Header */}
      <div className="max-w-[1240px] w-full mx-auto flex justify-around">
        <span className="text-[18px] md:text-[20px] font-medium leading-[22px] text-[#00000099]">
          Product Details
        </span>
        <span className="text-[18px] md:text-[20px] font-medium leading-[22px] text-black border-b-2 border-black pb-2">
          Rating & Reviews
        </span>
        <span className="text-[18px] md:text-[20px] font-medium leading-[22px] text-[#00000099]">
          FAQs
        </span>
      </div>
      <hr className="max-w-[1240px] mx-auto w-full border-t border-[#D9D9D9] mb-[40px] mt-[16px]" />

      {/* Review Options */}
      <div className="max-w-[1240px] mx-auto flex flex-wrap justify-between items-center gap-4 pb-[24px]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[20px] md:text-[24px] leading-[1] text-black">
            All Reviews
          </span>
          <span className="text-[#00000099] text-sm md:text-base">({reviews.length})</span>
        </div>

        <div className="flex items-center gap-[10px]">
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="rounded-full p-3.5 bg-[#F0F0F0] hover:bg-black cursor-pointer transition-colors"
          >
            <Filter color={isHovering ? "white" : "black"} />
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-[20px] py-[14px] bg-black text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer text-sm font-medium"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>
      </div>

      {/* Write a Review Box */}
      {showForm && (
        <div className="max-w-[1240px] mx-auto w-full bg-white border border-[#0000001A] rounded-[24px] p-6 md:p-8 mb-8 shadow-sm">
          {!isAuthenticated ? (
            <div className="text-center py-6">
              <h3 className="font-bold text-lg text-black mb-2">Sign in to leave a review</h3>
              <p className="text-sm text-gray-500 mb-6">You need an active account to review products you've purchased.</p>
              <Link
                to={`/login?next=${encodeURIComponent(location.pathname)}`}
                className="inline-block bg-black text-white text-sm font-medium rounded-full px-8 py-3 hover:bg-neutral-800 transition-colors"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={submitReview} className="flex flex-col gap-4">
              <h3 className="font-bold text-xl text-black">Share your feedback</h3>

              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
                  <FiAlertCircle className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 p-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <FiCheckCircle className="shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-black mb-1.5 ml-1">Your Name</label>
                  <input
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#F0F0F0] text-black text-sm rounded-full px-5 py-3 outline-none border border-transparent focus:border-black focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black mb-1.5 ml-1">Rating</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full bg-[#F0F0F0] text-black text-sm rounded-full px-5 py-3 outline-none border border-transparent focus:border-black focus:bg-white transition-all cursor-pointer"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 / 5 - Excellent)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 / 5 - Very Good)</option>
                    <option value={3}>⭐⭐⭐ (3 / 5 - Average)</option>
                    <option value={2}>⭐⭐ (2 / 5 - Poor)</option>
                    <option value={1}>⭐ (1 / 5 - Terrible)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-black mb-1.5 ml-1">Review</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What did you like or dislike about this product?"
                  value={form.feedback}
                  onChange={(e) => setForm({ ...form, feedback: e.target.value })}
                  className="w-full bg-[#F0F0F0] text-black text-sm rounded-2xl p-4 outline-none border border-transparent focus:border-black focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-black text-white font-medium text-sm rounded-full py-3.5 px-8 self-end hover:bg-neutral-800 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-[#F0F0F0]/50 rounded-[20px] max-w-[1240px] mx-auto mb-10">
          <p className="text-gray-500 text-sm">No reviews yet for this product. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="max-w-[1240px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 pb-[36.5px]">
          {reviews.map((review) => (
            <Review key={review._id} review={review} variant="expanded" />
          ))}
        </div>
      )}
    </section>
  );
}
export default ProductReviews;
