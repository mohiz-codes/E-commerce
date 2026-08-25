import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createOrder } from "../lib/api.js";
import { useCart } from "../context/useCart.js";
import { useAuth } from "../context/useAuth.js";
import Breadcrumb from "../components/BreadCrumb.jsx";
import { FiCheckCircle, FiArrowRight, FiShoppingBag, FiTruck, FiAlertCircle } from "react-icons/fi";

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderResult, setOrderResult] = useState(null);

  useEffect(() => {
    if (user) {
      setShipping((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || ""
      }));
    }
  }, [user]);

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.discountedPrice ?? item.originalPrice) * item.quantity,
    0
  );
  const delivery = cart.length ? 15 : 0;
  const total = subtotal + delivery;

  async function submitOrder(event) {
    event.preventDefault();
    if (!cart.length) return;

    setError("");
    setLoading(true);

    try {
      const created = await createOrder({
        shipping,
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color
        }))
      });

      clearCart();
      setOrderResult(created);
    } catch (err) {
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (orderResult) {
    const orderCode = orderResult._id ? orderResult._id.slice(-6).toUpperCase() : "";
    return (
      <div className="max-w-[700px] mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCheckCircle className="text-4xl text-white" />
        </div>
        <h1 className="integral-font text-3xl md:text-4xl font-bold tracking-tight text-black mb-3">
          Order Confirmed!
        </h1>
        <p className="text-sm text-[#00000099] mb-2">
          Thank you for your purchase, {shipping.name}.
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
        <p className="text-sm text-[#00000099] mt-1">
          Complete your delivery details to finalize your order
        </p>
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
          {/* Shipping Form */}
          <div className="lg:col-span-7 bg-white border border-[#0000001A] rounded-[24px] p-6 md:p-8">
            <div className="flex items-center gap-3 pb-6 border-b border-[#0000001A] mb-6">
              <FiTruck className="text-2xl text-black" />
              <h2 className="text-xl font-bold text-black">Shipping Details</h2>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3.5 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl">
                <FiAlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={submitOrder} className="flex flex-col gap-4">
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
                disabled={loading}
                className="w-full bg-black text-white font-medium text-sm rounded-full py-4 mt-6 hover:bg-neutral-800 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order &bull; ${total}</span>
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 bg-white border border-[#0000001A] rounded-[24px] p-6 md:p-8">
            <h2 className="text-xl font-bold text-black pb-4 border-b border-[#0000001A] mb-4">
              Order Summary ({cart.length} {cart.length === 1 ? "item" : "items"})
            </h2>

            <div className="divide-y divide-[#0000000D] max-h-[300px] overflow-y-auto mb-6 pr-1">
              {cart.map((item) => {
                const image = Array.isArray(item.image) ? item.image[0] : item.image;
                const price = item.discountedPrice ?? item.originalPrice;
                return (
                  <div key={item._id} className="flex items-center gap-3 py-3">
                    <img src={image} alt={item.title} className="w-14 h-14 rounded-xl object-cover bg-neutral-100 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs text-black truncate">{item.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {item.size && `Size: ${item.size} `}
                        {item.color && `Color: ${item.color} `}
                        <span>&bull; Qty: {item.quantity}</span>
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
