import mainp from "../assets/main.png";
import Rating from "../components/Rating.jsx";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useState } from "react";
import { useCart } from "../context/useCart.js";


function Product({ product }) {
  const images = Array.isArray(product?.image) ? product.image : [product?.image];
  const gallery = Array.from({ length: 4 }, (_, index) => images[index] || images[0] || mainp);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [message, setMessage] = useState("");
  const { addToCart } = useCart();

  function handleAddToCart() {
    if (product.availableSizes?.length && !selectedSize) {
      return setMessage("Please select a size");
    }
    if (product.availableColors?.length && !selectedColor) {
      return setMessage("Please select a color");
    }
    setMessage("");
    addToCart(product, quantity, selectedSize, selectedColor);
  }
  return (
    <div className="flex gap-10 mx-auto max-w-[1240px] w-full pb-[80px]">
      {/*product pictures*/}
      <div className="flex gap-2">
        {/*side pictures*/}
        <div className="flex flex-col gap-2">
          {gallery.slice(0, 3).map((item, index) => (
            <button
              key={`${item}-${index}`}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`w-[160px] h-[160px] overflow-hidden border-2 ${selectedImage === index ? "border-black" : "border-transparent"}`}
            >
              <img className="w-full h-full object-cover" src={item} alt={`${product.title} view ${index + 1}`} />
            </button>
          ))}
        </div>
        {/*main picture*/}
        <div>
          <img className="w-[400px] h-[500px] object-cover" src={gallery[selectedImage]} alt={product?.title || "Product"} />
        </div>
      </div>

      {/*this main right div will contain all product info size colour quantity, sizes  etc*/}
      <div className="max-w-[600px] w-full flex flex-col gap-[24px]">
        {/*this div is for the tittle price rating and description*/}

        <div className="flex flex-col gap-[14px]">
          <span className="integral-font text-[40px] font-bold leading-[1] tracking-0">
            {product?.title || "Product"}
          </span>
          <div className="flex gap-[13px] items-center ">
            <Rating className="size-[25px]" rating={product.rating} />
            <span className="text-[16px] font-[400] leading-[1]  tracking-0 text-[#101010] ">
              {product.rating}/5
            </span>
          </div>

          <div className="flex gap-2.5 items-center">
            <ins className="font-bold leading-[1] tracking-0 text-[32px] no-underline">
              ${product.discountedPrice ?? product.originalPrice}
            </ins>
            {product.discountedPrice != null && <del className="font-bold leading-[1] tracking-0 text-[32px] text-[#999999]">${product.originalPrice}</del>}

            {product.discount != null && <span className="rounded-[62px] px-[14px] py-[6px] bg-[#ffebeb] text-[#FF3333] font-medium text-[16px] leading-[1] tracking-0">-{product.discount}%</span>}
          </div>
          <p className="text-[#00000099] text-[16px] leading-[27px] tracking-0 font-[400]">
            {product.description}
          </p>
          <hr className="max-w-[1240px] w-full border-t border-[#D9D9D9] " />

        </div>

          
      {/*this div is for the colour available */}
      <div className="flex flex-col gap-4">
        <span className="text-[#00000099]" >Select Colours</span>
        <div className="flex gap-4">
            {(product.availableColors || []).map((color) => (
              <button key={color} type="button" title={color} onClick={() => setSelectedColor(color)} style={{ backgroundColor: color }} className={`w-9 h-9 rounded-full border cursor-pointer ${selectedColor === color ? "ring-2 ring-black" : ""}`} />
            ))}
        </div>
         <hr className="max-w-[1240px] w-full border-t border-[#D9D9D9]" />
      </div>
      {/*this div is for the sizes available */}
      <div className="flex flex-col gap-4">
        <span className="text-[#00000099]">Choose Size</span>
        <div className="flex gap-4">
            {(product.availableSizes || []).map((size) => (
              <button key={size} type="button" onClick={() => setSelectedSize(size)} className={`px-[24px] py-[12px] gap-[12px] rounded-[62px] cursor-pointer ${selectedSize === size ? "bg-black text-white" : "bg-[#F0F0F0] hover:bg-black hover:text-white"}`}>{size}</button>
            ))}
        </div>
         <hr className="max-w-[1240px] w-full border-t border-[#D9D9D9]" />
      </div>
      {/*this div is for the quantity and add to cart or soldout options */}
      <div className="max-w-[590px] w-full flex gap-4">
        <div className="flex items-center gap-[38px] bg-[#F0F0F0] px-[20px] py-[16px] rounded-[62px]">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FaMinus/></button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}><FaPlus/></button>
        </div>
        <button onClick={handleAddToCart} className="bg-black w-full px-[54px] py-[16px] text-white rounded-[62px] border-2 hover:border-black hover:bg-white hover:text-black cursor-pointer">Add to Cart</button>
      </div>
      {message && <p className="text-red-500">{message}</p>}
      </div>
     
    </div>
  );
}
export default Product;
