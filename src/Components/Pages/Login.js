import React, { useContext, useRef } from "react";
import "./login.css";
import { AppContext } from "../ProductContext";

let login = true;
const Login = () => {
  const closebtn = useRef();

  const { setloggedin } = useContext(AppContext);

  const handleChange = () => {
    document.querySelector(".login .modal-body").style.height = login
      ? "285px"
      : "215px";
    document.querySelectorAll(".login .modal-body form").forEach((elm) => {
      login ? (elm.style.translate = "-105%") : (elm.style.translate = "0%");
    });
    document.querySelector(".login .modal-footer p").innerText = login
      ? "Already have an account?"
      : "Don't have an account?";
    login = !login;
  };

  const handleUserAuth = async (e) => {
    e.preventDefault();
    try {
      document.querySelector(".spinner").style.display = "flex";
      if (e.target.id === "loginForm") {
        let emailvalue = document.querySelector("#email").value;
        let passwordvalue = document.querySelector("#inputPassword5").value;

        const response = await fetch("https://e-commerce-backend-qaox.onrender.com/user/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailvalue, password: passwordvalue }),
        });
        if (!response.ok) {
          let msg = await response.json();
          alert(msg.msg);
        } else {
          const data = await response.json();
          if (data.authtoken) {
            localStorage.setItem("MyShopAuthToken", data.authtoken);
            setloggedin(data.authtoken);
            closebtn.current.click();
          }
        }
      } else {
        let uservalue = document.querySelector("#user").value;
        let emailvalue = document.querySelector("#email_sign").value;
        let passwordvalue = document.querySelector("#pass").value;

        const response = await fetch("https://e-commerce-backend-qaox.onrender.com/user/auth/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: uservalue,
            email: emailvalue,
            password: passwordvalue,
          }),
        });
        if (!response.ok) {
          let msg = await response.json();
          alert(msg.msg);
        } else {
          const data = await response.json();
          if (data.authtoken) {
            localStorage.setItem("MyShopAuthToken", data.authtoken);
            setloggedin(data.authtoken);
            closebtn.current.click();
          }
        }
      }
      document.querySelector(".spinner").style.display = "none";
    } catch (error) {
      console.log(error);
      document.querySelector(".spinner").style.display = "none";
    }
  };
  return (
    <div
      className={`login modal fade`}
      id="LoginModal"
      tabIndex="-1"
      aria-labelledby="login_signUp Modal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title" id="login_signUp Modal">
              <img style={{ height: "40px" }} src="./img/logo.png" alt="" />
            </div>
            <button
              ref={closebtn}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="loginForm" onSubmit={handleUserAuth}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter E-Mail here"
                  required
                />
                <label htmlFor="inputPassword5" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="inputPassword5"
                  className="form-control"
                  placeholder="Enter Password here"
                  required
                />
              </div>
              <button id="login-btn" type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
            <form id="signupForm" onSubmit={handleUserAuth}>
              <div className="mb-3">
                <label htmlFor="user" className="form-label">
                  UserName
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="user"
                  placeholder="Enter Username here"
                  required
                />
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email_sign"
                  placeholder="Enter E-Mail here"
                  required
                />
                <label htmlFor="pass" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="pass"
                  className="form-control"
                  placeholder="Enter password here"
                  required
                />
              </div>
              <button id="signup-btn" type="submit" className="btn btn-primary">
                Sign-Up
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <p onClick={handleChange}>Don't have an account?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
