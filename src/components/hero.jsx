import heroImage from "../assets/herobg.png";
import starBig from "../assets/Vector.png"
import starSmall from "../assets/vector2.png"
import versace from "../assets/Group.png"
import zara from "../assets/zara.png"
import gucci from "../assets/gucci.png"
import parada from "../assets/prada.png"
import calvin from "../assets/calvin.png"


function Hero() {
  return (
    <section className="  bg-[#F2F0F1]">
        

      <div className="relative flex max-w-[1240px] w-full items-center mx-auto gap-[54px]">

        <img className="absolute top-[86px] right-[0px]" src={starBig} alt="img" />
        <img className="absolute top-[297px] right-[520px]" src={starSmall} alt="img" />

        <div className="flex flex-col gap-[33px] max-w-[596px] w-full ">
          <h1 className="integral-font text-[64px] font-bold leading-[64px] tracking-0 ">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="max-w-[555px] w-full font-[400px] text-[16px] leading-[27px] text-[#00000099] tracking-0 ">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="max-w-[210px] py-[16px] px-[54px] bg-black text-white rounded-[62px] leading-[1]">
            Shop Now
          </button>

          <div className="max-w-[596px] w-full flex justify-between">
            <div className="flex flex-col max-w-[171px] w-full ">
              <p className="font-[700] text-[40px] leading-[1] tracking-0 ">
                200+
              </p>
              <p className="font-[400] text-[16px] leading-[22px] tracking-0 ">
                International Brands
              </p>
            </div>
            <div className="flex flex-col max-w-[171px] w-full">
              <p className="font-[700] text-[40px] leading-[1] tracking-0  ">
                2,000+
              </p>
              <p className="font-[400] text-[16px] leading-[22px] tracking-0 ">
                High-Quality Products
              </p>
            </div>
            <div className="flex flex-col max-w-[171px] w-full">
              <p className="font-[700] text-[40px] leading-[1] tracking-0  ">
                30,000+
              </p>
              <p className="font-[400] text-[16px] leading-[22px] tracking-0 ">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[600px] w-full h-[630px]  overflow-hidden ">
        <img src={heroImage} alt="img"  />
        </div>
      </div>

      <div className="max-w-screen w-full flex justify-center bg-black  absolute bottom-[280px]">
      <div className=" max-w-[1234px] w-full flex  justify-between gap-2 py-10.5 bg-black z-10 ">
        <img className="w-[166px] h-[33px]" src= {versace} alt="img" />
        <img className="w-[91px] h-[38px]" src= {zara} alt="img" />
        <img className="w-[156px] h-[36px]" src= {gucci} alt="img" />
        <img className="w-[194px] h-[32px]" src= {parada} alt="img" />
        <img className="w-[206px] h-[33px]" src= {calvin} alt="img" />

      </div>
</div>

    </section>
  );
}
export default Hero;
