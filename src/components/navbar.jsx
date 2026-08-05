import dropdown from "../assets/frame2.png";
import { CiSearch } from "react-icons/ci";
import cart from "../assets/frame3.png"
import account from "../assets/frame4.png"

function Navbar() {
  return ( 
      <nav className="flex max-w-[1240px] mx-auto w-full justify-center items-center gap-10 bg-neutral-800 py-5 text-[#000000] bg-white">
        <p  className="integral-font pb-2.5 text-[32px] font-bold leading-[1] tracking">SHOP.CO</p>


    <div className="flex gap-[24px] max-w-[326px] w-full">
        <div className="flex gap-0.5">
          <a href="#home" className="text-">
            Shop
          </a>
          <img className="w-4 h-4 mt-[5px]" src={dropdown} alt="" />
        </div>
      
        <a href="#about" className="text-">
          On Sale
        </a>
        <a href="#services" className="text-">
          New Arrivals
        </a>
        <a href="#contact" className="text-">
          Brands
        </a>

    </div>

    <div className="max-w-[577px] w-full relative">
        <input
          className=" w-full rounded-[64px] pl-13 pr-3 py-4 bg-[#F0F0F0]"
          type="text"
          placeholder="Search for products..."
        />
        <CiSearch className="absolute size-6 left-[18px] top-[14px] " />
    </div>

    <div className="flex gap-[14px]">
        <img src={cart} alt="img" />
        <img src={account} alt="img" />
    </div>
      </nav>

  );
}

export default Navbar;
