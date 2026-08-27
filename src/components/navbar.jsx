import dropdown from "../assets/frame2.png";
import { CiSearch } from "react-icons/ci";
import cartIcon from "../assets/frame3.png";
import account from "../assets/frame4.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getProducts } from "../lib/api.js";
import { useCart } from "../context/useCart.js";
import { useAuth } from "../context/useAuth.js";
import { FiUser, FiPackage, FiLogOut, FiLogIn, FiUserPlus } from "react-icons/fi";

function Navbar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  
  const searchRef = useRef(null);
  const accountRef = useRef(null);

  const navigate = useNavigate();
  const { cart: cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      return;
    }

    const timer = setTimeout(() => {
      getProducts(`?search=${encodeURIComponent(search)}&limit=5`)
        .then((data) => setSuggestions(data.products))
        .catch(() => setSuggestions([]));
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  function handleLogout() {
    setShowAccountMenu(false);
    logout();
    navigate("/");
  }

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "";

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-[#0000000D]">
      <div className="flex max-w-[1240px] mx-auto w-full justify-between items-center gap-6 md:gap-10 py-5 px-4 md:px-0 text-[#000000]">
        <Link to="/" className="integral-font pb-1 text-[28px] md:text-[32px] font-bold leading-[1] tracking-tight shrink-0">
          SHOP.CO
        </Link>

        <div className="hidden lg:flex gap-[24px] items-center text-sm font-medium">
          <div className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
            <Link to="/productType">Shop</Link>
            <img className="w-3.5 h-3.5" src={dropdown} alt="dropdown" />
          </div>  
          <Link to="/productType?sale=true" className="hover:opacity-70 transition-opacity shrink-0">
            On Sale
          </Link>
          <Link to="/productType?section=new-arrivals" className="hover:opacity-70 transition-opacity shrink-0">
            New Arrivals
          </Link>
          <Link to="/productType" className="hover:opacity-70 transition-opacity shrink-0">
            Brands
          </Link>
        </div>

        {/* Search Bar */}
        <form
          ref={searchRef}
          onSubmit={(event) => {
            event.preventDefault();
            if (search.trim()) {
              setShowSuggestions(false);
              navigate(`/productType?search=${encodeURIComponent(search.trim())}`);
            }
          }}
          className="max-w-[577px] w-full relative hidden sm:block"
        >
          <input
            className="w-full rounded-[64px] pl-12 pr-4 py-3.5 bg-[#F0F0F0] text-sm outline-none border border-transparent focus:border-black focus:bg-white transition-all placeholder:text-gray-400"
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              if (!event.target.value.trim()) setSuggestions([]);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          <CiSearch className="absolute size-5 left-[16px] top-1/2 -translate-y-1/2 text-gray-500" />
          {showSuggestions && search.trim() && (
            <div className="absolute z-50 top-[56px] left-0 w-full rounded-2xl bg-white border border-[#0000001A] shadow-xl overflow-hidden animate-fade-in">
              {suggestions.length ? (
                suggestions.map((product) => {
                  const image = Array.isArray(product.image) ? product.image[0] : product.image;
                  return (
                    <button
                      key={product._id}
                      type="button"
                      onClick={() => {
                        setShowSuggestions(false);
                        setSearch("");
                        navigate(`/product/${product._id}`);
                      }}
                      className="flex items-center gap-3 w-full p-3 text-left hover:bg-[#F0F0F0] transition-colors cursor-pointer"
                    >
                      <img
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                        src={image}
                        alt={product.title}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm text-black block truncate">{product.title}</span>
                        <span className="text-xs text-gray-500 font-semibold">${product.discountedPrice ?? product.originalPrice}</span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <p className="p-4 text-sm text-gray-500 text-center">No products found</p>
              )}
            </div>
          )}
        </form>

        {/* Right Icons (Cart + Account) */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 hover:opacity-75 transition-opacity" aria-label="View Shopping Cart">
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute 0 right-0 min-w-4.5 h-4.5 px-1 flex items-center justify-center rounded-full bg-black text-white text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Interactive Account Button & Dropdown */}
          <div ref={accountRef} className="relative">
            <button
              type="button"
              onClick={() => setShowAccountMenu((prev) => !prev)}
              aria-label="User Account Menu"
              aria-expanded={showAccountMenu}
              className="relative flex items-center justify-center p-2 rounded-full hover:bg-[#F0F0F0] transition-colors cursor-pointer"
            >
              {isAuthenticated && userInitial ? (
                <div className="w-6.5 h-6.5 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center font-mono">
                  {userInitial}
                </div>
              ) : (
                <img src={account} alt="Account" className="w-6 h-6" />
              )}
              {isAuthenticated && (
                <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              )}
            </button>

            {/* Dropdown Menu */}
            {showAccountMenu && (
              <div className="absolute right-0 top-12 z-50 w-64 bg-white border border-[#0000001A] rounded-[20px] shadow-2xl py-3 px-2 overflow-hidden animate-fade-in">
                {isAuthenticated ? (
                  <>
                    {/* User Info Header */}
                    <div className="px-3 py-2.5 mb-1 bg-[#F0F0F0]/60 rounded-xl">
                      <p className="text-xs text-[#00000099]">Signed in as</p>
                      <p className="text-sm font-bold text-black truncate">{user?.name || "Customer"}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>

                    <div className="flex flex-col gap-0.5 mt-1">
                      {user?.role === "admin" && (
                        <Link to="/admin" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-black hover:bg-[#F0F0F0] rounded-xl transition-colors font-medium">
                          <FiPackage className="text-base text-gray-500" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        onClick={() => setShowAccountMenu(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-black hover:bg-[#F0F0F0] rounded-xl transition-colors font-medium"
                      >
                        <FiUser className="text-base text-gray-500" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setShowAccountMenu(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-black hover:bg-[#F0F0F0] rounded-xl transition-colors font-medium"
                      >
                        <FiPackage className="text-base text-gray-500" />
                        <span>My Orders</span>
                      </Link>

                      <hr className="my-1.5 border-[#0000001A]" />

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium cursor-pointer"
                      >
                        <FiLogOut className="text-base text-red-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-2 mb-2">
                      <p className="text-sm font-bold text-black">Welcome to SHOP.CO</p>
                      <p className="text-xs text-[#00000099] mt-0.5">Sign in to manage orders & wishlist</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Link
                        to="/login"
                        onClick={() => setShowAccountMenu(false)}
                        className="flex items-center justify-center gap-2 w-full bg-black text-white text-sm font-medium py-2.5 rounded-full hover:bg-neutral-800 transition-colors"
                      >
                        <FiLogIn />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setShowAccountMenu(false)}
                        className="flex items-center justify-center gap-2 w-full bg-[#F0F0F0] text-black text-sm font-medium py-2.5 rounded-full hover:bg-neutral-200 transition-colors mt-1"
                      >
                        <FiUserPlus />
                        <span>Create Account</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
