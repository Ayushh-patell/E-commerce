import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./ProductContext";

const Navbar = () => {
  const {loggedin} = useContext(AppContext)
  const navigate = useNavigate()
  const showNav = () => {
    let nav = document.getElementsByClassName("navbar")[0];
    nav.classList.toggle("navExpand");
  };

  useEffect(() => {
    let nav = document.getElementsByClassName("navbar")[0];

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.classList.add("nav-scroll");
        document.querySelector(".nav_btn").style.top = "14px";
      } else {
        nav.classList.remove("nav-scroll");
        document.querySelector(".nav_btn").style.top = "9px";
      }
    });
  }, []);

  return (
    <div className="navbar">
      <div className="brand">
        <Link className="text-success" to={"/"}>
          <img src="/img/logo-text.png" alt="" />
        </Link>
      </div>
      <button
        className="btn btn-outline-dark d-sm-none d-flex nav_btn"
        onClick={showNav}
      >
        <ion-icon name="grid-outline"></ion-icon>
      </button>
      <div className="right_icon">
        <div className="search_input">
          <input type="text" placeholder="Search" />
          <ion-icon name="search"></ion-icon>
        </div>
        {loggedin===null && 
          <div className="other_icon">
          <ion-icon name="person-outline" data-bs-toggle="modal" data-bs-target="#LoginModal"></ion-icon>
        </div>}
        {loggedin!== null && 
          <div className="other_icon">
          <ion-icon onClick={()=>{navigate("/dashboard")}} name="person-outline"></ion-icon>
          <ion-icon onClick={()=>{navigate("/cart")}} name="cart-outline"></ion-icon>
          </div>}
      </div>
    </div>
  );
};

export default Navbar;
