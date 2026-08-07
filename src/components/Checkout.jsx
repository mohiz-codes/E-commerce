import Breadcrumb from "./BreadCrumb";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function YourCart() {
  return (
    <section className="flex flex-col mx-auto max-w-[1240px] gap-[24px]"> 
      <span className="integral-font font-bold text-[40px] leading-[1] tracking-0">
        Your Cart
      </span>
      {/*This is the main div*/}
      <div className="flex flex-col gap-[24px]">
        {/*This is the right div*/}
        <div>
            {/*This is product in cart div*/}
            <div className="flex ">
             
              
                <img src="" alt="img" />
                 {/*This is details of product in cart div*/} 
                 <div className="flex">
                   
                <div className="flex flex-col gap-5" >
                <span>Gradient Graphic T-shirt</span>
                <span>Size: <span>Large</span></span>
                <span>Colour: <span>White</span></span>
                <span>$145</span>
                </div>
             {/*This is the delete and quantity of product in cart div*/}  
                <div>
                     {/*<div className="flex items-center gap-[20px] bg-[#F0F0F0] px-[20px] py-[12px] rounded-[62px]">
                                <FaMinus/>
                                <span>1</span>
                                 <FaPlus/>
                     </div>
                     */}
                </div>
                 </div> 
            </div>
        </div>
        {/*This is the left div*/}
        <div></div>
      </div>
    </section>
  );
}
export default YourCart;
