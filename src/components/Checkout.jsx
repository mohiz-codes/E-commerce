import Breadcrumb from "./BreadCrumb";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import checkout1 from "../assets/ck1.png";
import checkout2 from "../assets/ck2.png";
import checkout3 from "../assets/ck3.png";

function YourCart() {
  const checkout_items = [
    {
      name: "Gradient Graphic T-shirt",
      image: checkout1,
      size: "Large",
      Colour: "White",
      price: "$145",
    },

    {
      name: "CHECKERED SHIRT",
      image: checkout2,
      size: "Medium",
      Colour: "Red",
      price: "$180",
    },

    {
      name: "SKINNY FIT JEANS",
      image: checkout3,
      size: "Large",
      Colour: "Blue",
      price: "$240",
    },
  ];

  return (
    <section className="flex flex-col mx-auto max-w-[1240px] gap-[24px] pb-[80px]">
      <span className="integral-font font-bold text-[40px] leading-[1] tracking-0">
        Your Cart
      </span>
      {/*This is the main div*/}
      <div className="flex items-start gap-[24px]">
        {/*This is the left div*/}
        <div  className="w-full rounded-[20px] border-1 border-[#0000001A]">
          {/*This is product in cart div*/}

          <div className="flex flex-col px-[24px] py-[20px] ">
            {checkout_items.map((item, index) => (
              <div key={index} className="flex w-full gap-5 py-6 ">
                <img key={index} src={item.image} alt="img" />
                {/*This is details of product in cart div*/}
                <div key={index} className="flex justify-between max-w-[527px] w-full">
                  <div className="flex flex-col justify-between">
                    <span>{item.name}</span>
                    <span>
                      Size: <span>{item.size}</span>
                    </span>
                    <span>
                      Colour: <span>{item.Colour}</span>
                    </span>
                    <span className="text-[24px] font-bold leading-[1] ">
                      {item.price}
                    </span>
                  </div>
                  {/*This is the delete and quantity of product in cart div*/}
                  <div className="flex flex-col justify-between items-end">
                    <RiDeleteBinFill className="text-red-600 size-6" />

                    <div className="flex items-center gap-[20px] bg-[#F0F0F0] px-[20px] py-[12px] rounded-[62px]">
                      <FaMinus />
                      <span>1</span>
                      <FaPlus />
                    </div>
            
                  </div>
                  
                </div>
                
                
              </div>

              
            ))}
               </div>
              
          </div>
          {/*This is the right div*/}
          <div className=" max-w-[505px] w-full flex flex-col px-6 py-5 gap-6 border-1 border-[#0000001A] rounded-[20px]">
            <span className="text-[24px] font-bold leading-[1] tracking-0">Order Summary</span>
            <div className= " flex flex-col gap-5" >
                <div className="flex justify-between">
                    <span className="text-[20px] font-[400px] leading-[1] tracking-0 text-[#00000099]">Subtotal</span>
                    <span className="text-[24px] font-bold leading-[1] tracking-0">$565</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-[20px] font-[400px] leading-[1] tracking-0 text-[#00000099]">Discount(-20%)</span>
                    <span className="text-[24px] font-bold leading-[1] tracking-0 text-red-600">-$113</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-[20px] font-[400px] leading-[1] tracking-0 text-[#00000099]">Diliver Fee</span>
                    <span className="text-[24px] font-bold leading-[1] tracking-0">$15</span>
                </div>
                 <hr className="max-w-[1240px] mx-auto w-full border-t border-[#D9D9D9]/60" />
                
                <div className="flex justify-between">
                    <span className="text-[20px] leading-[1] font-[400px] ">Total</span>
                    <span className="text-[24px] font-bold leading-[1] tracking-0">$467</span>
                </div>
               
            </div>
             <div className="flex gap-3">
                    <input className="rounded-[62px] bg-[#F0F0F0] placeholder:text-[#00000066] w-full px-4 py-3" type="text" placeholder="Add promo code" />
                    <button className="bg-black text-white rounded-[62px] max-w-[119px] w-full px-[16px] py-[12px] ">Apply</button>
                </div>
            <button className="w-full bg-black text-white rounded-[62px] px-[54px] py-[16px] ">Go to Checkout </button>
          </div>
       
      </div>
    </section>
  );
}
export default YourCart;
