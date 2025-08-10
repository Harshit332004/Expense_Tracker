import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
// import { useAuth } from "../../context/auth.js";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
// import useCategory from "../../hooks/useCategory.js";
import "../styles/header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
//   const [auth, setAuth] = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
//   const categories = useCategory();
  const [searchbar, setsearchbar] = useState(false);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsRegistered(true);
      return JSON.parse(storedUser);
    } else {
      setIsRegistered(false);
      return null;
    }
  });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const logoClick = () => {
    navigate("/");
  };

  const searchClick = () => {
    setsearchbar(!searchbar);
  };

  const toProfile = async () => {
    navigate(`/profile`);
  };

  const toDashboard = async () => {
    navigate(`/dashboard/profile`);
  };

  const toWishlist = async () => {
    if (user && isRegistered) {
      navigate(`/wishlist`);
    } else {
      // Handle the case where user is not logged in or registered
      // You can redirect to login or display a message
      toast.error("User is not logged in or registered!");
      // Example: Redirect to login
      navigate(`/login-user`);
    }
  };

  const toCart = async (pid) => {
    if (user && isRegistered) {
      navigate(`/cart`);
    } else {
      // Handle the case where user is not logged in or registered
      // You can redirect to login or display a message
      toast.error("User is not logged in or registered!");
      // Example: Redirect to login
      navigate(`/login-user`);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    navigate("/");
  };

  const handle_screen_resize = () => {
    if (window.innerWidth >= 600) {
      if (searchbar) {
        setsearchbar(false);
      }
    }
  };

  window.onresize = handle_screen_resize;

  const showmobilesearch = {
    top: "14vh",
  };
  const hidemobilesearch = {
    top: "4vh",
  };

  return (
    <>
      <div id="marquee1" className="marquee">
        <p className="sliding-text">
          This is sliding text created with CSS animations for better
          accessibility.
        </p>
      </div>
      <div
        className="mobile_search_navbar1"
        style={searchbar ? showmobilesearch : hidemobilesearch}
      >
        <div className="mobile_search_container">
          <div className="search_input_container">
            <input
              type="text"
              className="search_mobile_inp"
              placeholder="Search by Product name or color"
            />
          </div>
          <button className="search_mobile_btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div id="navbar1" className="navbar1">
        <div className="logo" onClick={logoClick}>
          <h1>DesignT</h1>
        </div>
        <div>
            <form className="d-flex" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    
                />
                <button className="btn btn-outline-success" type="submit">
                    Search
                </button>
            </form>
        </div>
        <div className="right_nav">
          <div className="li_container_mobile" id="#show_search">
            <li onClick={searchClick}>
              <FontAwesomeIcon className="search_mobile" icon={faSearch} />
            </li>
          </div>
          {isRegistered ? (
            <>
              <div
                className="profile_icon_container"
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                <div className="user_icon_container">
                  <li>
                    <FontAwesomeIcon
                      className="user_icon"
                      onClick={toDashboard}
                      icon={faUser}
                    />
                  </li>
                </div>
                {/* <div className="line"></div> */}
                <div
                  className={`profile_dropdown ${
                    isDropdownVisible ? "show" : ""
                  }`}
                >
                  <div className="user_details" onClick={toDashboard}>
                    <div className="name" >
                      <h4>Hello ayush</h4>
                    </div>
                    <div className="phone">
                      <h4>9326242640</h4>
                    </div>
                  </div>
                  <div className="dropdown_content">
                    <div className="dropdown_button">
                      <Link className="dropdown_text" to="/dashboard/profile">
                        Profile
                      </Link>
                    </div>
                    <div className="dropdown_button">
                      <Link className="dropdown_text" to="/dashboard/orders">
                        Orders
                      </Link>
                    </div>
                    <div className="dropdown_button">
                      <Link className="dropdown_text" to="/wishlist">
                        Wishlist
                      </Link>
                    </div>
                    <div className="dropdown_button">
                      <Link className="dropdown_text" to="/cart">
                        Cart
                      </Link>
                    </div>
                  </div>
                  <div className="edit_logout">
                    <div className="dropdown_button">
                      <Link className="dropdown_text" to="/dashboard/edit_profile">
                        Edit Profile
                      </Link>
                    </div>
                    <div className="dropdown_button">
                      <Link
                        className="dropdown_text"
                        onClick={handleLogout}
                        to="/login-user"
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="li_container">
                <li>
                  <Link className="login_link" to="/login-user">
                    Login
                  </Link>
                </li>
              </div>
            </>
          )}
          <div className="li_container" onClick={toWishlist}>
            <li>
              <FontAwesomeIcon className="wishlist_icon" icon={faHeart} />
            </li>
          </div>
          <div className="li_container">
            <li>
              <FontAwesomeIcon
                className="cart_icon"
                onClick={toCart}
                icon={faCartShopping}
              />
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
