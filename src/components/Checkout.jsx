import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { useCart } from "../context/useCart.js";
import { useNavigate } from "react-router-dom";

function YourCart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const subtotal = cart.reduce(
    (total, item) => total + (item.discountedPrice ?? item.originalPrice) * item.quantity,
    0
  );
  const delivery = cart.length ? 15 : 0;

  return (
    <section className="flex flex-col mx-auto max-w-[1240px] gap-6 pb-20">
      <h1 className="integral-font font-bold text-[40px]">Your Cart</h1>
      {!cart.length ? <p>Your cart is empty.</p> : (
        <div className="flex items-start gap-6">
          <div className="w-full rounded-[20px] border border-[#0000001A] px-6">
            {cart.map((item) => {
              const image = Array.isArray(item.image) ? item.image[0] : item.image;
              const price = item.discountedPrice ?? item.originalPrice;
              return (
                <div key={item._id} className="flex w-full gap-5 py-6 border-b border-[#0000001A]">
                  <img className="w-32 h-32 object-cover" src={image} alt={item.title} />
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col justify-between">
                      <span className="font-medium">{item.title}</span>
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                      <span className="text-2xl font-bold">${price}</span>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <button onClick={() => removeFromCart(item._id)} aria-label="Remove item">
                        <RiDeleteBinFill className="text-red-600 size-6" />
                      </button>
                      <div className="flex items-center gap-5 bg-[#F0F0F0] px-5 py-3 rounded-full">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}><FaMinus /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}><FaPlus /></button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="max-w-[505px] w-full border border-[#0000001A] rounded-[20px] px-6 py-5">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <div className="flex flex-col gap-5 mt-6">
              <div className="flex justify-between"><span>Subtotal</span><strong>${subtotal}</strong></div>
              <div className="flex justify-between"><span>Delivery Fee</span><strong>${delivery}</strong></div>
              <hr />
              <div className="flex justify-between text-xl"><span>Total</span><strong>${subtotal + delivery}</strong></div>
            </div>
            <button onClick={() => navigate("/checkout")} className="w-full bg-black text-white rounded-full px-6 py-4 mt-6">Go to Checkout</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default YourCart;
