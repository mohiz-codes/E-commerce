import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import { login, signup } from "../lib/api.js";
import { useAuth } from "../context/useAuth.js";

function AuthPage({ mode = "login" }) {
  const isSignup = mode === "signup";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { saveAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract next redirect parameter or default to home
  const searchParams = new URLSearchParams(location.search);
  const next = searchParams.get("next") || "/";

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      navigate(next, { replace: true });
    }
  }, [isAuthenticated, navigate, next]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  }

  function handleTabSwitch(signupMode) {
    setError("");
    navigate(signupMode ? `/signup${location.search}` : `/login${location.search}`, { replace: true });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (isSignup && !form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!form.password) {
      setError("Please enter your password.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      let data;
      if (isSignup) {
        data = await signup({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password
        });
      } else {
        data = await login({
          email: form.email.trim(),
          password: form.password
        });
      }

      saveAuth(data);
      navigate(next, { replace: true });
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col justify-center items-center px-4 py-12 bg-[#FAFAFA]">
      <div className="w-full max-w-[460px] bg-white border border-[#0000001A] rounded-[28px] p-8 md:p-10 shadow-sm">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block integral-font text-[28px] md:text-[32px] font-bold tracking-tight text-black hover:opacity-80 transition-opacity">
            SHOP.CO
          </Link>
          <p className="text-sm text-[#00000099] mt-2">
            {isSignup
              ? "Create your account to track orders & save preferences"
              : "Welcome back! Enter your details to sign in"}
          </p>
        </div>

        {/* Minimalist Segmented Tabs */}
        <div className="flex bg-[#F0F0F0] p-1 rounded-full mb-8">
          <button
            type="button"
            onClick={() => handleTabSwitch(false)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
              !isSignup
                ? "bg-black text-white shadow-sm"
                : "text-[#00000099] hover:text-black"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch(true)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
              isSignup
                ? "bg-black text-white shadow-sm"
                : "text-[#00000099] hover:text-black"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-start gap-2.5 p-3.5 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl">
            <FiAlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <div className="relative">
              <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
              <input
                type="text"
                required
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full bg-[#F0F0F0] hover:bg-[#EAEAEA] focus:bg-white text-black text-sm rounded-full pl-12 pr-5 py-3.5 border border-transparent focus:border-black outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          )}

          <div className="relative">
            <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-[#F0F0F0] hover:bg-[#EAEAEA] focus:bg-white text-black text-sm rounded-full pl-12 pr-5 py-3.5 border border-transparent focus:border-black outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              placeholder="Password (min. 6 characters)"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full bg-[#F0F0F0] hover:bg-[#EAEAEA] focus:bg-white text-black text-sm rounded-full pl-12 pr-12 py-3.5 border border-transparent focus:border-black outline-none transition-all placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer text-lg transition-colors p-1"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group flex items-center justify-center gap-2 w-full bg-black text-white text-sm font-medium rounded-full py-4 mt-2 hover:bg-neutral-800 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{isSignup ? "Creating Account..." : "Signing In..."}</span>
              </div>
            ) : (
              <>
                <span>{isSignup ? "Create Account" : "Sign In"}</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer switch */}
        <div className="text-center mt-8 pt-6 border-t border-[#0000001A]">
          <p className="text-sm text-[#00000099]">
            {isSignup ? "Already have an account?" : "Don't have an account yet?"}{" "}
            <button
              type="button"
              onClick={() => handleTabSwitch(!isSignup)}
              className="font-medium text-black underline underline-offset-4 hover:opacity-75 cursor-pointer ml-1"
            >
              {isSignup ? "Sign In" : "Create Account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
