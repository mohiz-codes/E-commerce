import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import { getOrders } from "../lib/api.js";
import Breadcrumb from "../components/BreadCrumb.jsx";
import ReviewDialog from "../components/ReviewDialog.jsx";
import { FiPackage, FiUser, FiMail, FiCalendar, FiLogOut, FiShoppingBag, FiArrowRight } from "react-icons/fi";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const [reviewingProduct, setReviewingProduct] = useState(null);

  const breadcrumbs = ["Home", "My Account"];

  useEffect(() => {
    let isMounted = true;
    getOrders()
      .then((data) => {
        if (isMounted) {
          setOrders(Array.isArray(data) ? data : []);
          setLoadingOrders(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setOrdersError(err.message || "Failed to load order history");
          setLoadingOrders(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function handleLogout() {
    logout();
    navigate("/");
  }

  function markProductReviewed(productId) {
    setOrders((currentOrders) => currentOrders.map((order) => ({
      ...order,
      items: order.items.map((item) => item.product === productId ? { ...item, canReview: false } : item)
    })));
  }

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="max-w-[1240px] mx-auto px-4 md:px-6 py-6 pb-24">
      <Breadcrumb items={breadcrumbs} />

      <div className="mt-6 mb-10">
        <h1 className="integral-font text-3xl md:text-[36px] font-bold tracking-tight text-black">
          My Account
        </h1>
        <p className="text-sm text-[#00000099] mt-1">
          Manage your account information and track previous orders
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* User Info Card */}
        <div className="lg:col-span-4 bg-white border border-[#0000001A] rounded-[24px] p-6 md:p-8">
          <div className="flex items-center gap-4 pb-6 border-b border-[#0000001A]">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold font-mono shadow-sm">
              {initial}
            </div>
            <div className="overflow-hidden">
              <h2 className="font-bold text-xl text-black truncate">{user?.name || "Customer"}</h2>
              <p className="text-sm text-[#00000099] truncate">{user?.email || "No email"}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 py-6 border-b border-[#0000001A]">
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <FiUser className="text-neutral-400 text-base" />
              <span>Verified Account</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <FiMail className="text-neutral-400 text-base" />
              <span className="truncate">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <FiShoppingBag className="text-neutral-400 text-base" />
              <span>{orders.length} {orders.length === 1 ? "Order" : "Orders"} placed</span>
            </div>
          </div>

          <div className="pt-6 flex flex-col gap-3">
            <Link
              to="/productType"
              className="flex items-center justify-center gap-2 w-full bg-[#F0F0F0] hover:bg-black hover:text-white text-black font-medium text-sm rounded-full py-3.5 transition-all"
            >
              <span>Explore Collection</span>
              <FiArrowRight />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full border border-red-200 text-red-600 hover:bg-red-50 font-medium text-sm rounded-full py-3.5 transition-all cursor-pointer"
            >
              <FiLogOut />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-8 bg-white border border-[#0000001A] rounded-[24px] p-6 md:p-8">
          <div className="flex items-center justify-between pb-6 border-b border-[#0000001A] mb-6">
            <div className="flex items-center gap-2.5">
              <FiPackage className="text-xl text-black" />
              <h2 className="font-bold text-xl md:text-2xl text-black">Order History</h2>
            </div>
            <span className="text-xs md:text-sm font-medium bg-[#F0F0F0] px-3.5 py-1 rounded-full text-black">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
          </div>

          {loadingOrders ? (
            <div className="flex flex-col gap-4 py-8 items-center justify-center">
              <span className="w-8 h-8 border-3 border-black/20 border-t-black rounded-full animate-spin" />
              <p className="text-sm text-gray-500">Loading your orders...</p>
            </div>
          ) : ordersError ? (
            <div className="text-center py-10">
              <p className="text-sm text-red-600 mb-4">{ordersError}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-xs bg-black text-white rounded-full px-5 py-2 hover:bg-neutral-800"
              >
                Retry
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 bg-[#F0F0F0] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl">
                <FiShoppingBag />
              </div>
              <h3 className="font-bold text-lg text-black mb-1">No orders found</h3>
              <p className="text-sm text-[#00000099] max-w-sm mx-auto mb-6">
                You haven't placed any orders yet. Discover our trending collections and shop your style today.
              </p>
              <Link
                to="/productType"
                className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium rounded-full px-6 py-3.5 hover:bg-neutral-800 transition-all"
              >
                <span>Shop Now</span>
                <FiArrowRight />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {orders.map((order) => {
                const dateStr = order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })
                  : "Recent";

                const orderCode = order._id ? order._id.slice(-6).toUpperCase() : "ORDER";

                return (
                  <div
                    key={order._id}
                    className="border border-[#0000001A] rounded-[20px] p-5 md:p-6 transition-all hover:border-black/30"
                  >
                    {/* Order summary header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#0000001A]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-black">#{orderCode}</span>
                          <span className="text-xs bg-black/5 text-black px-2.5 py-0.5 rounded-full font-medium capitalize">
                            {order.status || "Pending"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                          <FiCalendar className="text-xs" />
                          <span>Placed on {dateStr}</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-gray-400 block">Total Amount</span>
                        <span className="font-bold text-lg text-black">${order.total}</span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="divide-y divide-[#0000000F] py-2">
                      {order.items?.map((item, index) => {
                        const image = Array.isArray(item.image) ? item.image[0] : item.image;
                        return (
                          <div key={item._id || index} className="flex items-center gap-4 py-3">
                            {image ? (
                              <img
                                src={image}
                                alt={item.title}
                                className="w-14 h-14 rounded-xl object-cover bg-neutral-100 shrink-0"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-xl bg-neutral-100 flex items-center justify-center text-xs text-gray-400 shrink-0">
                                Item
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-black truncate">{item.title}</h4>
                              <div className="flex items-center gap-3 text-xs text-[#00000099] mt-0.5">
                                {item.size && <span>Size: {item.size}</span>}
                                {item.color && <span>Color: {item.color}</span>}
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>

                            <div className="flex shrink-0 flex-col items-end gap-2">
                              <span className="font-bold text-sm text-black">${item.price}</span>
                              {order.status === "delivered" && item.canReview && (
                                <button type="button" onClick={() => setReviewingProduct(item)} className="rounded-full bg-black px-3 py-2 text-xs font-medium text-white hover:bg-neutral-800">Leave a Review</button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Shipping Address */}
                    {order.shipping && (
                      <div className="bg-[#F0F0F0]/60 rounded-xl p-3.5 mt-3 text-xs text-[#00000099] flex flex-wrap justify-between items-center gap-2">
                        <div>
                          <span className="font-medium text-black">Ship to: </span>
                          <span>{order.shipping.name} &bull; {order.shipping.address}, {order.shipping.city}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {reviewingProduct && <ReviewDialog product={reviewingProduct} onClose={() => setReviewingProduct(null)} onSubmitted={markProductReviewed} />}
    </div>
  );
}

export default Profile;
