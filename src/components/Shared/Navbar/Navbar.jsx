// src/components/Header.jsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../../public/logo-main.webp";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500  ${
        isScrolled ? "bg-black/50 backdrop-blur-md" : "bg-black/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">L</span>
            </div>
            <h1 className="text-3xl font-bold text-white">LocalChef</h1>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between w-full ml-10">
          <div className="flex items-center text-xl md:gap-10 ml-75">
            <Link to="/" className="text-white hover:text-red-400 transition">
              Home
            </Link>
            <Link
              to="/meals"
              className="text-white hover:text-red-400 transition flex items-center"
            >
              Meals
            </Link>

            {user && (
              <Link
                to="/dashboard"
                className="text-white hover:text-red-400 transition flex items-center"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <div
                  onClick={logOut}
                  className="px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-800 transition font-semibold shadow-lg cursor-pointer"
                >
                  Logout
                </div>
                <div>
                  <img
                    className="rounded-full"
                    referrerPolicy="no-referrer"
                    src={user && user.photoURL ? user.photoURL : logo}
                    alt="profile"
                    height="30"
                    width="30"
                  />
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:block px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-800 transition font-semibold shadow-lg cursor-pointer"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <div className="px-6 py-8 space-y-6 text-center">
            <Link to="/" className="block text-white text-xl">
              Home
            </Link>
            <Link to="/meals" className="block text-white text-xl">
              Meals
            </Link>
            <Link to="/dashboard" className="block text-white text-xl">
              Dashboard
            </Link>

            <Link to="/meals">
              <button className="w-full py-3 border border-white text-white rounded-full">
                Book a Meal
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
