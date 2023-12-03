import React, { useContext, useLayoutEffect, useState } from "react";
import './Dashboard.css'
import { useNavigate } from "react-router-dom";
import { AppContext } from "../ProductContext";

const DashBoard = () => {
  const [User, setUser] = useState(null);
  const [Fav, setFav] = useState(null);
  const navigate = useNavigate()  
  const { setloggedin } = useContext(AppContext);

  const handleNavigate = (category, id)=> {
    navigate(`/${category}/Product/${id}`)
  }

  const handleFavourite = async (e, id)=> {
    document.querySelector(".spinner").style.display = "flex";
    const response =  await fetch("https://e-commerce-backend-qaox.onrender.com/user/auth/addFavourite", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authtoken: localStorage.getItem("MyShopAuthToken"),
          },
          body: JSON.stringify({
            favouriteID: id
          }),
        });
        if(response.ok) {
          e.target.parentElement.style.display = "none"
        }
        document.querySelector(".spinner").style.display = "none";
  }

  const handleLogout = ()=> {
    localStorage.removeItem("MyShopAuthToken")
    setloggedin(null)
    navigate("/")
  }

  const getuserData = async () => {
    document.querySelector(".spinner").style.display = "flex";
    const response = await fetch("https://e-commerce-backend-qaox.onrender.com/user/auth/userInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("MyShopAuthToken"),
      },
    });
    const data = await response.json();
    setUser(data);
    let fav = {
      productID: data.favourite,
    };
    const responseFav = await fetch("https://e-commerce-backend-qaox.onrender.com/user/auth/getProd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("MyShopAuthToken"),
      },
      body: JSON.stringify(fav),
    });
    const prodData = await responseFav.json();
    setFav(prodData);
    document.querySelector(".spinner").style.display = "none";
  };

  useLayoutEffect(() => {
    getuserData();
  }, []);
  return (
    <div className="dashboard">
      <h1 className="mt-3">Dashboard</h1>
      {User && (
        <div className="userDetail">
          <div className="user py-2">
            <h2>{User.name}</h2>
            <p className="userEmail">{User.email}</p>
            <button onClick={handleLogout} className="btn btn-warning">Logout</button>
          </div>
          <div className="favourites">
          <h3 className="my-3">Favourites</h3>
          {Fav && Fav.map((fav,index)=> (

            <div key={index} className="favourite">
              <div className="favourite_img" onClick={()=> {handleNavigate(fav[0].category, fav[0]._id)}}>
                <img src={fav[0].imgArr[0]} alt="" />
              </div>
              <p className="favourite_name" onClick={()=> {handleNavigate(fav.category, fav._id)}}>{fav[0].name}</p>
              <p onClick={(e)=>{handleFavourite(e, fav[0]._id)}} className={`favHeart`}>&#9829;</p>
            </div>


          ))}
          {Fav && Fav.length<1 && (
          <div className="emptycontainer">
          <h3>No Items here</h3> </div>
        )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
