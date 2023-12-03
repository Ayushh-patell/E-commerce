import { useNavigate } from "react-router-dom";
import "./Cart.css";
import React, { useLayoutEffect, useState } from "react";

const Cart = () => {
  const [cart, setcart] = useState(null);
  const [cartData, setcartData] = useState(null);
  const navigate = useNavigate()

  const handleNavigate = (category, id, e)=> {
    e.preventDefault()
    navigate(`/${category}/Product/${id}`)
  }

  const handleQuanUp = (index) => {
    let newcartdata = [...cart];
    newcartdata[index].quantity += 1;
    setcart(newcartdata);
    let updatebtns = document.querySelectorAll(
      ".cart .details .buttons button.btn-primary"
    );
    updatebtns[index].style.opacity = "1";
    updatebtns[index].style.pointerEvents = "initial";
  };
  const handleQuandown = (index) => {
    let newcartdata = [...cart];
    if (newcartdata[index].quantity > 1) {
      newcartdata[index].quantity -= 1;
      setcart(newcartdata);
      let updatebtns = document.querySelectorAll(
        ".cart .details .buttons button.btn-primary"
      );
      updatebtns[index].style.opacity = "1";
      updatebtns[index].style.pointerEvents = "initial";
    } else {
      newcartdata[index].quantity = 1;
      setcart(newcartdata);
      let updatebtns = document.querySelectorAll(
        ".cart .details .buttons button.btn-primary"
      );
      updatebtns[index].style.opacity = "1";
      updatebtns[index].style.pointerEvents = "initial";
    }
  };

  const handleDelete = async(id)=> {
    document.querySelector(".spinner").style.display = "flex";
    await fetch("https://e-commerce-backend-qaox.onrender.com/user/auth/RemoveFromCart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("MyShopAuthToken"),
      },
      body: JSON.stringify({
        prodID: id
      }),
    });
    document.querySelector(".spinner").style.display = "none";
    getUserData()
  }

  const getUserData = async () => {
    let productID = [];
    document.querySelector(".spinner").style.display = "flex";
    const response = await fetch("https://e-commerce-backend-qaox.onrender.com/user/auth/userInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("MyShopAuthToken"),
      },
      
    });
    const data = await response.json();
    setcart(data.cart);
    data.cart.forEach((element) => {
      productID.push(element.id);
    });
    const responsecart = await fetch(
      "https://e-commerce-backend-qaox.onrender.com/user/auth/getProd",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: localStorage.getItem("MyShopAuthToken"),
        },
        body: JSON.stringify({ productID: productID }),
      }
    );
    const prodData = await responsecart.json();
    setcartData(prodData);
    document.querySelector(".spinner").style.display = "none";
  };

  const handleCart = async (e, id, quantity, index) => {
    e.preventDefault();
    let token = localStorage.getItem("MyShopAuthToken");
    if (!token) {
      alert("You need to login");
    } else {
      document.querySelector(".spinner").style.display = "flex";
      await fetch("https://e-commerce-backend-qaox.onrender.com/user/auth/addToCart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authtoken: token,
        },
        body: JSON.stringify({
          prodID: id,
          quantity: quantity,
        }),
      });
      let updatebtns = document.querySelectorAll(
        ".cart .details .buttons button.btn-primary"
      );
      updatebtns[index].style.opacity = "0";
      updatebtns[index].style.pointerEvents = "none";
      document.querySelector(".spinner").style.display = "none";
    }
  };

  useLayoutEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="cart-container">
    <h1 className="my-2">Cart</h1>
      {cartData &&
        cartData.map((data, index) => (
          <div key={data[0]._id} className="cart">
          <svg
                onClick={() => {
                  handleDelete(data[0]._id);
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            <div className="cart-img" onClick={(e)=> {handleNavigate(data[0].category, data[0]._id, e)}}>
              <img src={data[0].imgArr[0]} alt="" />
            </div>
            <div className="details">
              <p className="cartName" onClick={(e)=> {handleNavigate(data[0].category, data[0]._id, e)}}>{data[0].name}</p>
              <div className="buttons my-3">
                <div className="input-group">
                  <div
                    onClick={() => handleQuanUp(index)}
                    className="input-group-prepend"
                  >
                    <span className="input-group-text">+</span>
                  </div>
                  <input
                    readOnly
                    value={cart[index] && cart[index].quantity}
                    name="cartquantity"
                    className=""
                  />
                  <div
                    onClick={() => handleQuandown(index)}
                    className="input-group-append"
                  >
                    <span className="input-group-text">-</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    handleCart(e, data[0]._id, cart[index].quantity, index);
                  }}
                  className="btn btn-primary"
                >
                  Update
                </button>
                <button

                  className="btn btn-outline-warning"
                 onClick={(e)=> {handleNavigate(data[0].category, data[0]._id, e)}}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
        {cartData && cartData.length<1 && (
          <div className="emptycontainer">
          <h3>No Items here</h3> </div>
        )}
    </div>
  );
};

export default Cart;
