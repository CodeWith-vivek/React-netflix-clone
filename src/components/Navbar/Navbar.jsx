import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import menu_icon from "../../assets/menu.png"; 
import { logout } from "../../config/firebase";

const Navbar = () => {
  const navRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="navbar" ref={navRef}>
      <div className="navbar-left">
        <img
          src={menu_icon}
          alt="menu"
          className="menu-icon"
          onClick={() => setShowMenu(!showMenu)}
        />
        <img src={logo} alt="logo" className="logo" />
        <ul className={showMenu ? "nav-links show" : "nav-links"}>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="search" className="icons" />
        <p className="children-text">Children</p>
        <img src={bell_icon} alt="bell" className="icons" />
        <div
          className="navbar-profile"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={profile_img} alt="profile" className="profile" />
          <img src={caret_icon} alt="caret" />
          {showDropdown && (
            <div className="dropdown">
              <p onClick={logout}>Sign Out of Netflix</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

