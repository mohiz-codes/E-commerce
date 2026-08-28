import { useEffect, useState } from "react";
import { createProduct, getAdminOrders, getSalesSummary, refundOrder, updateOrderStatus } from "../lib/api.js";

const emptyProduct = {
  title: "", image: "", originalPrice: "", discountedPrice: "", category: "", section: "",
  clothingType: "", dressStyle: "", description: "", availableSizes: "", availableColors: ""
};
const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

function values(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({ sales: 0, orders: 0, refundedOrders: 0 });
  const [product, setProduct] = useState(emptyProduct);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      const [orderData, summaryData] = await Promise.all([getAdminOrders(), getSalesSummary()]);
      setOrders(orderData);
      setSummary(summaryData);
    } catch (requestError) {
      setError(requestError.message || "Unable to load the admin dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(loadDashboard, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  async function changeStatus(id, status) {
    try {
      const updated = await updateOrderStatus(id, status);
      setOrders((items) => items.map((item) => item._id === id ? { ...item, ...updated } : item));
      setMessage("Order status updated.");
    } catch (requestError) {
      setError(requestError.message || "Unable to update order status");
    }
  }

  async function refund(id) {
    if (!window.confirm("Issue a Stripe refund for this order?")) return;
    try {
      const updated = await refundOrder(id, "requested_by_admin");
      setOrders((items) => items.map((item) => item._id === id ? { ...item, ...updated } : item));
      setSummary((current) => ({ ...current, sales: Math.max(0, current.sales - updated.total), orders: Math.max(0, current.orders - 1), refundedOrders: current.refundedOrders + 1 }));
      setMessage("Refund completed.");
    } catch (requestError) {
      setError(requestError.message || "Unable to refund order");
    }
  }

  async function submitProduct(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    try {
      await createProduct({
        ...product,
        image: values(product.image),
        originalPrice: Number(product.originalPrice),
        discountedPrice: product.discountedPrice ? Number(product.discountedPrice) : null,
        availableSizes: values(product.availableSizes),
        availableColors: values(product.availableColors)
      });
      setProduct(emptyProduct);
      setMessage("Product published successfully.");
    } catch (requestError) {
      setError(requestError.message || "Unable to publish product");
    }
  }

  return (
    <>
    <main className="max-w-[1240px] mx-auto w-full px-4 md:px-0 py-10 pb-24">
      
      <h1 className="integral-font text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
      <p className="text-sm text-gray-500 mt-2">Manage sales, fulfilment, refunds, and your catalogue.</p>
      {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {message && <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">{message}</p>}

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {[["Sales", `$${summary.sales.toFixed(2)}`], ["Paid orders", summary.orders], ["Refunded orders", summary.refundedOrders]].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-[#0000001A] p-6 bg-white"><p className="text-sm text-gray-500">{label}</p><p className="text-3xl font-bold mt-2">{value}</p></div>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-[#0000001A] p-5 md:p-7 bg-white overflow-x-auto">
        <h2 className="text-2xl font-bold mb-5">Orders</h2>
        {loading ? <p>Loading orders…</p> : orders.length === 0 ? <p className="text-gray-500">No orders yet.</p> : (
          <table className="w-full min-w-[760px] text-sm text-left">
            <thead className="border-b"><tr><th className="pb-3">Order</th><th className="pb-3">Customer</th><th className="pb-3">Total</th><th className="pb-3">Status</th><th className="pb-3">Refund</th></tr></thead>
            <tbody>{orders.map((order) => <tr key={order._id} className="border-b last:border-0">
              <td className="py-4 font-mono">#{order._id.slice(-6).toUpperCase()}</td>
              <td className="py-4">{order.user?.name || order.shipping?.name}<br /><span className="text-gray-500">{order.user?.email || order.shipping?.email}</span></td>
              <td className="py-4 font-semibold">${order.total.toFixed(2)}</td>
              <td className="py-4"><select value={order.status} disabled={order.status === "refunded"} onChange={(event) => changeStatus(order._id, event.target.value)} className="rounded-lg border p-2 disabled:bg-gray-100">{order.status === "refunded" && <option value="refunded">refunded</option>}{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td>
              <td className="py-4"><button type="button" onClick={() => refund(order._id)} disabled={order.paymentStatus === "refunded" || !order.paymentIntentId} className="rounded-full border border-red-200 px-4 py-2 text-red-600 disabled:cursor-not-allowed disabled:opacity-40">{order.paymentStatus === "refunded" ? "Refunded" : "Refund"}</button></td>
            </tr>)}</tbody>
          </table>
        )}
      </section>

      <section className="mt-10 rounded-3xl border border-[#0000001A] p-5 md:p-7 bg-white">
        <h2 className="text-2xl font-bold mb-2">Add product</h2><p className="text-sm text-gray-500 mb-6">Category and section control where the product appears in the catalogue.</p>
        <form onSubmit={submitProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[["title", "Product title", true], ["image", "Image URL(s), comma-separated", true], ["originalPrice", "Regular price", true], ["discountedPrice", "Sale price (optional)"], ["category", "Category (e.g. Men)"], ["section", "Section (e.g. new-arrivals)"], ["clothingType", "Clothing type"], ["dressStyle", "Dress style"], ["availableSizes", "Sizes, comma-separated"], ["availableColors", "Colors, comma-separated"]].map(([field, label, required]) => <input key={field} required={required} value={product[field]} onChange={(event) => setProduct({ ...product, [field]: event.target.value })} placeholder={label} type={field.includes("Price") ? "number" : "text"} min={field.includes("Price") ? "0" : undefined} step={field.includes("Price") ? "0.01" : undefined} className="rounded-xl border border-[#0000001A] px-4 py-3" />)}
          <textarea value={product.description} onChange={(event) => setProduct({ ...product, description: event.target.value })} placeholder="Product description" className="md:col-span-2 min-h-28 rounded-xl border border-[#0000001A] px-4 py-3" />
          <button type="submit" className="md:col-span-2 rounded-full bg-black px-6 py-4 font-medium text-white">Publish Product</button>
        </form>
      </section>
    </main>
    </>
  );
}
