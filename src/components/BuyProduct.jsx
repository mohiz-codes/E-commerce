import s1 from "../assets/side1.png";
import s2 from "../assets/side2.png";
import s3 from "../assets/side3.png";
import mainp from "../assets/main.png";
import Rating from "../components/Rating.jsx";
import c1 from "../assets/col1.png";
import c2 from "../assets/col2.png";
import c3 from "../assets/col3.png";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";


function Product() {
  return (
    <div className="flex gap-10 mx-auto max-w-[1240px] w-full pb-[80px]">
      {/*product pictures*/}
      <div className="flex gap-2">
        {/*side pictures*/}
        <div className="flex flex-col gap-2">
          <img src={s1} alt="img" />
          <img src={s2} alt="img" />
          <img src={s3} alt="img" />
        </div>
        {/*main picture*/}
        <div>
          <img src={mainp} alt="img" />
        </div>
      </div>

      {/*this main right div will contain all product info size colour quantity, sizes  etc*/}
      <div className="max-w-[600px] w-full flex flex-col gap-[24px]">
        {/*this div is for the tittle price rating and description*/}

        <div className="flex flex-col gap-[14px]">
          <span className="integral-font text-[40px] font-bold leading-[1] tracking-0">
            One Life Graphic T-shirt
          </span>
          <div className="flex gap-[13px] items-center ">
            <Rating className="size-[25px]" rating={4} />
            <span className="text-[16px] font-[400] leading-[1]  tracking-0 text-[#101010] ">
              4/5
            </span>
          </div>

          <div className="flex gap-2.5 items-center">
            <ins className="font-bold leading-[1] tracking-0 text-[32px] no-underline">
              $300
            </ins>
            <del className="font-bold leading-[1] tracking-0 text-[32px]  text-[#999999]">
              $260
            </del>

            <span className="rounded-[62px] px-[14px] py-[6px] bg-[#ffebeb] text-[#FF3333] font-medium text-[16px] leading-[1] tracking-0 ">
              -30%
            </span>
          </div>
          <p className="text-[#00000099] text-[16px] leading-[27px] tracking-0 font-[400]">
            This graphic t-shirt which is perfect for any occasion. Crafted from
            a soft and breathable fabric, it offers superior comfort and style.
          </p>
          <hr className="max-w-[1240px] w-full border-t border-[#D9D9D9] " />

        </div>

          
      {/*this div is for the colour available */}
      <div className="flex flex-col gap-4">
        <span className="text-[#00000099]" >Select Colours</span>
        <div className="flex gap-4">
            <img className="cursor-pointer" src={c1} alt="img" />
            <img className="cursor-pointer" src={c2} alt="img" />
            <img className="cursor-pointer" src={c3} alt="img" />
        </div>
         <hr className="max-w-[1240px] w-full border-t border-[#D9D9D9]" />
      </div>
      {/*this div is for the sizes available */}
      <div className="flex flex-col gap-4">
        <span className="text-[#00000099]">Choose Size</span>
        <div className="flex gap-4">
            <button className="px-[24px] py-[12px] gap-[12px] bg-[#F0F0F0] rounded-[62px] hover:bg-black hover:text-white cursor-pointer">Small</button>
            <button className="px-[24px] py-[12px] gap-[12px] bg-[#F0F0F0] rounded-[62px] hover:bg-black hover:text-white cursor-pointer">Medium</button>
            <button className="px-[24px] py-[12px] gap-[12px] bg-[#F0F0F0] rounded-[62px] hover:bg-black hover:text-white cursor-pointer">Large</button>
            <button className="px-[24px] py-[12px] gap-[12px] bg-[#F0F0F0] rounded-[62px] hover:bg-black hover:text-white cursor-pointer">X-Large</button>
        </div>
         <hr className="max-w-[1240px] w-full border-t border-[#D9D9D9]" />
      </div>
      {/*this div is for the quantity and add to cart or soldout options */}
      <div className="max-w-[590px] w-full flex gap-4">
        <div className="flex items-center gap-[38px] bg-[#F0F0F0] px-[20px] py-[16px] rounded-[62px]">
            <FaMinus/>
            <span>1</span>
             <FaPlus/>
        </div>
        <button className="bg-black w-full  px-[54px] py-[16px] text-white  rounded-[62px] border-2 hover:border-black hover:bg-white hover:text-black cursor-pointer">Add to Cart</button>
      </div>
      </div>
     
    </div>
  );
}
export default Product;
