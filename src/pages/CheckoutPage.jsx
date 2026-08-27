import { useState } from "react";
import { Link } from "react-router-dom";
import { createOrder, createPaymentIntent } from "../lib/api.js";
import { useCart } from "../context/useCart.js";
import { useAuth } from "../context/useAuth.js";
import Breadcrumb from "../components/BreadCrumb.jsx";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {
  FiCheckCircle,
  FiArrowRight,
  FiShoppingBag,
  FiTruck,
  FiCreditCard,
  FiAlertCircle,
  FiLock
} from "react-icons/fi";

// Load Stripe outside render to avoid re-creating on every render
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY 
);

// --- Inner payment form that uses Stripe hooks ---
function PaymentForm({ shipping, cart, total, onSuccess, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");

  async function handlePay(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setPayError("");
    setPaying(true);

    try {
      // 1. Ask backend to create a PaymentIntent
      const { clientSecret } = await createPaymentIntent(cart);

      // 2. Confirm the card payment via Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: shipping.name,
            email: shipping.email
          }
        }
      });

      if (error) {
        setPayError(error.message || "Payment failed. Please try again.");
        setPaying(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // 3. Save the order to the database
        const created = await createOrder({
          shipping,
          paymentIntentId: paymentIntent.id,
          items: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            size: item.size,
            color: item.color
          }))
        });
        onSuccess(created);
      }
    } catch (err) {
      setPayError(err.message || "Something went wrong. Please try again.");
    } finally {
      setPaying(false);
    }
  }

  return (
    <form onSubmit={handlePay} className="flex flex-col gap-5">
      {/* Stripe Card Element */}
      <div>
        <label className="block text-xs font-medium text-black mb-2 ml-1">
          Card Details
        </label>
        <div className="w-full bg-[#F0F0F0] rounded-2xl px-5 py-4 border border-transparent focus-within:border-black focus-within:bg-white transition-all">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "15px",
                  fontFamily: "inherit",
                  color: "#000",
                  "::placeholder": { color: "#999" }
                },
                invalid: { color: "#e53e3e" }
              },
              hidePostalCode: true
            }}
          />
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5 ml-1 flex items-center gap-1">
          <FiLock className="w-3 h-3" />
          Payments are secure and encrypted by Stripe
        </p>
      </div>

      {/* Test card hint */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-xs text-amber-800">
        <strong>Test Mode:</strong> Use card <span className="font-mono font-bold">4242 4242 4242 4242</span>, any future date, any CVC.
      </div>

      {payError && (
        <div className="flex items-start gap-2.5 p-3.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl">
          <FiAlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{payError}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-[#0000001A] text-black font-medium text-sm rounded-full py-3.5 hover:bg-neutral-100 transition-all cursor-pointer"
        >
          ← Back to Shipping
        </button>
        <button
          type="submit"
          disabled={!stripe || paying}
          className="flex-1 bg-black text-white font-medium text-sm rounded-full py-3.5 hover:bg-neutral-800 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {paying ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <FiLock className="w-4 h-4" />
              <span>Pay Now · ${total}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// --- Main checkout page ---
function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  // step 1 = shipping form, step 2 = payment
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: ""
  });
  const [orderResult, setOrderResult] = useState(null);
  const [shippingError, setShippingError] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.discountedPrice ?? item.originalPrice) * item.quantity,
    0
  );
  const delivery = cart.length ? 15 : 0;
  const total = subtotal + delivery;

  function handleShippingSubmit(e) {
    e.preventDefault();
    const { name, email, address, city, postalCode } = shipping;
    if (!name || !email || !address || !city || !postalCode) {
      setShippingError("Please fill in all shipping fields.");
      return;
    }
    setShippingError("");
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePaymentSuccess(created) {
    clearCart();
    setOrderResult(created);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- Order confirmed screen ---
  if (orderResult) {
    const orderCode = orderResult._id ? orderResult._id.slice(-6).toUpperCase() : "";
    return (
      <div className="max-w-[700px] mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCheckCircle className="text-4xl text-white" />
        </div>
        <h1 className="integral-font text-3xl md:text-4xl font-bold tracking-tight text-black mb-3">
          Payment Successful!
        </h1>
        <p className="text-sm text-[#00000099] mb-2">
          Thank you for your purchase, {shipping.name}. A confirmation has been sent to {shipping.email}.
        </p>
        {orderCode && (
          <p className="text-sm font-mono font-medium text-black bg-[#F0F0F0] inline-block px-4 py-1.5 rounded-full mb-8">
            Order Reference: #{orderCode}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/profile"
            className="bg-black text-white font-medium text-sm rounded-full px-8 py-3.5 hover:bg-neutral-800 transition-colors"
          >
            View Order in Profile
          </Link>
          <Link
            to="/productType"
            className="bg-[#F0F0F0] text-black font-medium text-sm rounded-full px-8 py-3.5 hover:bg-neutral-200 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 md:px-6 py-6 pb-24">
      <Breadcrumb items={["Home", "Cart", "Checkout"]} />

      <div className="mt-6 mb-8">
        <h1 className="integral-font text-3xl md:text-[36px] font-bold tracking-tight text-black">
          Checkout
        </h1>
        {/* Step indicator */}
        <div className="flex items-center gap-3 mt-3">
          <div className={`flex items-center gap-1.5 text-xs font-medium ${step === 1 ? "text-black" : "text-gray-400"}`}>
            <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${step === 1 ? "bg-black text-white" : "bg-green-500 text-white"}`}>
              {step > 1 ? "✓" : "1"}
            </span>
            Shipping
          </div>
          <div className="w-8 h-px bg-gray-300" />
          <div className={`flex items-center gap-1.5 text-xs font-medium ${step === 2 ? "text-black" : "text-gray-400"}`}>
            <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${step === 2 ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}>
              2
            </span>
            Payment
          </div>
        </div>
      </div>

      {!cart.length ? (
        <div className="text-center py-16 bg-white border border-[#0000001A] rounded-[24px] p-8 max-w-[600px] mx-auto">
          <FiShoppingBag className="text-5xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-black mb-2">Your Cart is Empty</h2>
          <p className="text-sm text-gray-500 mb-6">Add some products to your cart before proceeding to checkout.</p>
          <Link
            to="/productType"
            className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium rounded-full px-6 py-3.5 hover:bg-neutral-800"
          >
            <span>Start Shopping</span>
            <FiArrowRight />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel — Shipping (step 1) or Payment (step 2) */}
          <div className="lg:col-span-7 bg-white border border-[#0000001A] rounded-[24px] p-6 md:p-8">

            {/* ---- STEP 1: Shipping ---- */}
            {step === 1 && (
              <>
                <div className="flex items-center gap-3 pb-6 border-b border-[#0000001A] mb-6">
                  <FiTruck className="text-2xl text-black" />
                  <h2 className="text-xl font-bold text-black">Shipping Details</h2>
                </div>
                {shippingError && (
                  <div className="flex items-start gap-2.5 p-3.5 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl">
                    <FiAlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{shippingError}</span>
                  </div>
                )}
                <form onSubmit={handleShippingSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-medium text-black mb-1.5 ml-1">Full Name</label>
                    <input
                      required
                      placeholder="e.g. Alex Morgan"
                      value={shipping.name}
                      onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                      className="w-full bg-[#F0F0F0] text-black text-sm rounded-full px-5 py-3.5 outline-none border border-transparent focus:border-black focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-black mb-1.5 ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. alex@example.com"
                      value={shipping.email}
                      onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                      className="w-full bg-[#F0F0F0] text-black text-sm rounded-full px-5 py-3.5 outline-none border border-transparent focus:border-black focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-black mb-1.5 ml-1">Street Address</label>
                    <input
                      required
                      placeholder="e.g. 123 Fashion Blvd, Apt 4B"
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                      className="w-full bg-[#F0F0F0] text-black text-sm rounded-full px-5 py-3.5 outline-none border border-transparent focus:border-black focus:bg-white transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-black mb-1.5 ml-1">City</label>
                      <input
                        required
                        placeholder="e.g. New York"
                        value={shipping.city}
                        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                        className="w-full bg-[#F0F0F0] text-black text-sm rounded-full px-5 py-3.5 outline-none border border-transparent focus:border-black focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-black mb-1.5 ml-1">Postal Code</label>
                      <input
                        required
                        placeholder="e.g. 10001"
                        value={shipping.postalCode}
                        onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                        className="w-full bg-[#F0F0F0] text-black text-sm rounded-full px-5 py-3.5 outline-none border border-transparent focus:border-black focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white font-medium text-sm rounded-full py-4 mt-4 hover:bg-neutral-800 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <FiArrowRight />
                  </button>
                </form>
              </>
            )}

            {/* ---- STEP 2: Payment ---- */}
            {step === 2 && (
              <>
                <div className="flex items-center gap-3 pb-6 border-b border-[#0000001A] mb-6">
                  <FiCreditCard className="text-2xl text-black" />
                  <h2 className="text-xl font-bold text-black">Payment</h2>
                </div>
                {/* Shipping summary strip */}
                <div className="bg-[#F0F0F0] rounded-2xl px-4 py-3 mb-5 text-xs text-black">
                  <p className="font-semibold mb-0.5">Shipping to:</p>
                  <p className="text-gray-600">{shipping.name} · {shipping.address}, {shipping.city} {shipping.postalCode}</p>
                </div>
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    shipping={shipping}
                    cart={cart}
                    total={total}
                    onSuccess={handlePaymentSuccess}
                    onBack={() => setStep(1)}
                  />
                </Elements>
              </>
            )}
          </div>

          {/* Right panel — Order Summary (always visible) */}
          <div className="lg:col-span-5 bg-white border border-[#0000001A] rounded-[24px] p-6 md:p-8">
            <h2 className="text-xl font-bold text-black pb-4 border-b border-[#0000001A] mb-4">
              Order Summary ({cart.length} {cart.length === 1 ? "item" : "items"})
            </h2>
            <div className="divide-y divide-[#0000000D] max-h-[300px] overflow-y-auto mb-6 pr-1">
              {cart.map((item) => {
                const image = Array.isArray(item.image) ? item.image[0] : item.image;
                const price = item.discountedPrice ?? item.originalPrice;
                return (
                  <div key={`${item._id}-${item.size}-${item.color}`} className="flex items-center gap-3 py-3">
                    <img src={image} alt={item.title} className="w-14 h-14 rounded-xl object-cover bg-neutral-100 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs text-black truncate">{item.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {item.size && `Size: ${item.size} `}
                        {item.color && `Color: ${item.color} `}
                        <span>· Qty: {item.quantity}</span>
                      </p>
                    </div>
                    <span className="font-bold text-sm text-black shrink-0">${price * item.quantity}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3 text-sm pt-4 border-t border-[#0000001A]">
              <div className="flex justify-between text-[#00000099]">
                <span>Subtotal</span>
                <span className="font-medium text-black">${subtotal}</span>
              </div>
              <div className="flex justify-between text-[#00000099]">
                <span>Delivery Fee</span>
                <span className="font-medium text-black">${delivery}</span>
              </div>
              <hr className="border-[#0000001A]" />
              <div className="flex justify-between text-base font-bold text-black">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;



