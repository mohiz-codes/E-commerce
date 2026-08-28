import Rating from "./Rating";
import { useNavigate } from "react-router-dom";

function ClothItems({ products = [] }) {
  const navigate = useNavigate();

  return (
    <div className="grid w-full max-w-[1240px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <article key={product._id} className="group min-w-0">
          <button type="button" onClick={() => navigate(`/product/${product._id}`)} className="w-full rounded-[20px] text-left focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4">
            <div className="relative overflow-hidden rounded-[20px] bg-[#F0F0F0]">
              <img className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105" src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.title} />
              {product.discountedPrice != null && <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-red-600 shadow-sm">{product.discount ? `-${product.discount}%` : "Sale"}</span>}
            </div>
            <h2 className="mt-4 truncate text-lg font-bold sm:text-xl">{product.title}</h2>
            <div className="mt-2 flex items-center gap-2"><Rating rating={product.rating || 0} /><span className="text-sm text-[#101010]">{product.rating || 0}/5</span></div>
            <div className="mt-2 flex flex-wrap items-center gap-2"><span className="text-xl font-bold">${product.discountedPrice ?? product.originalPrice}</span>{product.discountedPrice != null && <del className="text-base font-medium text-[#999999]">${product.originalPrice}</del>}</div>
          </button>
        </article>
      ))}
    </div>
  );
}

export default ClothItems;
