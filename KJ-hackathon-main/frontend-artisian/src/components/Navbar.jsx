import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/homepage.css";
import logo from "../../public/artisan_logo.png"
import { Button } from "./ui/button";
import { Heart, User, Phone } from "lucide-react";
import axios from "axios";
import SearchBar from "./SearchBar";
import SearchInput from "./SearchInput";
import LanguageSwitch from "./LanguageSwitch";

const Navbar = () => {
  return (
    <nav className="bg-[#fff] h-[10vh] shadow-lg border-b">
      <div className="container flex items-center justify-between h-full">
        {/* Logo */}
        <img alt="Logo" className="h-8 w-[120px] mr-7 ml-5 mt-0.5" src={logo} />

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="hidden lg:flex w-full justify-between  items-center"
          id="navbarSupportedContent"
        >
          <ul className="flex space-x-4 text-black">
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/products">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/wishlist">
                Wishlist
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/cart">
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/profile">
                Profile
              </NavLink>
            </li>
          </ul>

          <div className="right_side flex">
            <LanguageSwitch />

            <SearchBar />
          </div>

          {/* Search Form */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
