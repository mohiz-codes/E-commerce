import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { createReview } from "../lib/api.js";

export default function ReviewDialog({ product, onClose, onSubmitted }) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submitReview(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await createReview({ product: product.product, rating, feedback });
      onSubmitted(product.product);
      onClose();
    } catch (requestError) {
      setError(requestError.message || "Unable to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="review-title">
      <form onSubmit={submitReview} className="w-full max-w-[560px] rounded-[24px] bg-white p-6 shadow-2xl md:p-8">
        <div className="flex items-start justify-between gap-4"><div><p className="text-sm text-gray-500">Reviewing</p><h2 id="review-title" className="text-xl font-bold">{product.title}</h2></div><button type="button" onClick={onClose} aria-label="Close review dialog" className="rounded-full p-2 hover:bg-[#F0F0F0]"><FiX /></button></div>
        {error && <div className="mt-5 flex gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700"><FiAlertCircle className="shrink-0" />{error}</div>}
        <fieldset className="mt-6"><legend className="text-xs font-medium text-black mb-2">Your Rating</legend><div className="flex w-fit items-center gap-1.5 rounded-full bg-[#F0F0F0] px-4 py-3">{[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" onClick={() => setRating(value)} aria-label={`${value} stars`} aria-pressed={rating === value} className="rounded p-0.5 transition-transform hover:scale-110 focus:outline-none"><FaStar className={`text-xl ${value <= rating ? "text-yellow-400" : "text-gray-300"}`} /></button>)}<span className="ml-2 border-l border-black/10 pl-3 text-xs font-medium text-[#00000099]">{rating}/5</span></div></fieldset>
        <label className="mt-5 block text-xs font-medium text-black">Review<textarea required rows={5} value={feedback} onChange={(event) => setFeedback(event.target.value)} placeholder="What did you like or dislike about this product?" className="mt-2 w-full resize-none rounded-2xl border border-transparent bg-[#F0F0F0] p-4 text-sm outline-none focus:border-black focus:bg-white" /></label>
        <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-full px-5 py-3 text-sm font-medium hover:bg-[#F0F0F0]">Cancel</button><button disabled={submitting} className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white disabled:opacity-60">{submitting ? "Submitting…" : "Submit Review"}</button></div>
      </form>
    </div>
  );
}
