import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import cross from "../assets/frame1.png";

function Header() {
  const [closed, setClosed] = useState(false);
  const { isAuthenticated } = useAuth();

  if (closed || isAuthenticated) return null;

  return (
    <div className="relative flex justify-center items-center bg-black py-2.5 px-4">
      <div className="text-center">
        <p className="font-[400] text-[12px] md:text-[14px] font-satoshi leading-[1.2] tracking-0 text-white">
          Sign up and get 20% off your first order.{" "}
          <Link to="/signup" className="font-[600] underline underline-offset-4 hover:opacity-80 transition-opacity ml-1 cursor-pointer">
            Sign Up Now
          </Link>
        </p>
      </div>
      <button
        onClick={() => setClosed(true)}
        aria-label="Dismiss banner"
        className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 cursor-pointer p-1 hover:opacity-75"
      >
        <img className="w-3.5 h-3.5" src={cross} alt="Close banner" />
      </button>
    </div>
  );
}

export default Header;
