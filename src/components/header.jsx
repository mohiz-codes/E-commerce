import cross from "../assets/frame1.png"

function Header() {
  return (
    <>
      <div className="relative flex justify-center bg-black py-3">
        <div className="max-w-[351px]">
          <p className="font-[400] text-[14px] font-satoshi leading-[1] tracking-0 text-white">
            Sign up and get 20% off to your first order.
            <span className="font-[500] underline  underline-offset-3" >Sign Up Now</span>
          </p>
        </div>
        <img className="absolute top-[9px] right-[100px]" src={cross} alt="img" />
      </div>
    </>
  );
}
export default Header;
