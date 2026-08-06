import l1 from "../assets/1.png"
import l2 from "../assets/2.png"
import l3 from "../assets/3.png"
import l4 from "../assets/4.png"
import p1 from "../assets/b1.png"
import p2 from "../assets/b2.png"
import p3 from "../assets/b3.png"
import p4 from "../assets/b4.png"
import p5 from "../assets/b5.png"
import { TfiEmail } from "react-icons/tfi";




function Footer() {
    return(
        <section className="relative pt-[90px]">
        {/*this is the footer in black*/}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 flex justify-between max-w-[1240px] w-full rounded-[20px] bg-black px-[64px] py-[36px] " >
                <h1 className="max-w-[551px] integral-font text-white font-bold text-[40px] leading-[45px] tracking-0">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
                <div className="relative flex flex-col max-w-[350px] w-full gap-[14px]">
                    <TfiEmail className="absolute size-6 left-1/20 top-1/10 text-[#00000066]" />
                    <input className="bg-white  rounded-[62px] px-4 py-3 pl-[52px]" type="email " placeholder="Enter your email address" />
                    <button className="text-black bg-white rounded-[62px] px-4 py-3 hover:bg-black hover:text-white cursor-pointer border-2 hover:border-white ">Enter your email address</button>
                </div>
            </div>

        {/*this is the footer in light grey*/}
            <div className="flex flex-col  items-center bg-[#F0F0F0] pt-[180px]">
                {/*inner div inside which i have all contnent*/}
                <div className="flex justify-between items-center max-w-[1240px] w-full  ">
                    <div className="flex flex-col max-w-[248px] gap-[35px]">
                        <h1 className="integral-font font-bold text-[33.45px] leading-[0] tracking-0 " >SHOP.CO</h1>
                        <p className=" font-[400] text-[14px] leading-[22px] tracking-0 text-[#969696] ">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                        <div className="flex gap-[12px]">
                            <img src={l1} alt="img" />
                            <img src={l2} alt="img" />
                            <img src={l3} alt="img" />
                            <img src={l4} alt="img" />
                        </div>
                    </div>
                    <div className="max-w-[104px] w-full flex flex-col gap-[26px] ">
                        <h2 className="font-[500] text-[16px] leading-[18px] tracking-[3px] ">COMPANY</h2>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">About</h3>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Features</h3>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Work</h3>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Career</h3>
                    </div>
                    <div className="max-w-[139px] w-full flex flex-col gap-[26px] ">
                        <h2 className="font-[500] text-[16px] leading-[18px] tracking-[3px] ">Help</h2>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Customer Support</h3>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Delivery Details</h3>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Terms & Conditions</h3>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Privacy Policy</h3>
                    </div>
                    <div className="max-w-[149px] w-full flex flex-col gap-[26px] ">
                        <h2 className="font-[500] text-[16px] leading-[18px] tracking-[3px] ">FAQ</h2>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Account</h3>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Manage Deliveries</h3>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Orders</h3>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Payments</h3>
                    </div>
                    <div className="max-w-[152px] w-full flex flex-col gap-[26px] ">
                        <h2 className="font-[500] text-[16px] leading-[18px] tracking-[3px] ">Resources</h2>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Free eBooks</h3>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Development Tutorial</h3>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">How to - Blog</h3>
                        <h3 className="font-[400] text-[16px] leading-[19px] tracking-[0] text-[#969696]">Youtube Playlist</h3>
                    </div>
                   
                   
                </div>
               <hr className="max-w-[1240px] w-full border-t border-[#D9D9D9] mb-[20px] mt-[50px] " />

                {/* all rightsreserved*/}
                <div className=" pb-[80px] flex max-w-[1240px] w-full justify-between">
                        <h4 className="text-[#969696]">Shop.co © 2000-2023, All Rights Reserved</h4>
                        <div className="flex">
                            <img src={p1} alt="img" />
                            <img src={p2} alt="img" />
                            <img src={p3} alt="img" />
                            <img src={p4} alt="img" />
                            <img src={p5} alt="img" />
                        </div>
                </div>

            </div>

        </section>
    )
}
export default Footer