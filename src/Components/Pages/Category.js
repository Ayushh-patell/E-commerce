import React, { useEffect } from "react";
import { useState} from "react";
import './category.css'
import { Link, useLocation } from "react-router-dom";



const Category = () => {
  const [cardFilter, setcardFilter] = useState("New")
  const [Products, setProducts] = useState(null)
  const location = useLocation()

  const getProducts = async()=> {
    document.querySelector(".spinner").style.display = "flex";
    let currentLocation = location.pathname.slice(1).toLowerCase()
    let bodydata = {
      category: currentLocation
    }
  const response = await fetch("https://e-commerce-backend-qaox.onrender.com/prod/CategoryProd", 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodydata)
  })
  const data = await response.json()
  setProducts(data.products)
  document.querySelector(".spinner").style.display = "none";
  }
useEffect(()=> {
  getProducts()
},[])



  return (
    
    <>

      <div className="offer_display">
        <img src="" alt="" />
      </div>
      <div className="products">
        <div className="card_Prod">
          <div className="Heading">
            <h3 className="prod_title">Discover Products</h3>
            <div className="card_filter">
              <p onClick={()=>(setcardFilter('New'))} className={`card_filter_text ${cardFilter==="New"? "Active": ""}`}>New Release</p>
              <p onClick={()=>(setcardFilter('Popular'))} className={`card_filter_text ${cardFilter==="Popular"? "Active": ""}`}>Popular</p>
              <p onClick={()=>(setcardFilter('Discount'))} className={`card_filter_text ${cardFilter==="Discount"? "Active": ""}`}>Discount</p>
            </div>
          </div>
          <div className="cards">
          {Products && Products.map((product)=> (
            <div key={product._id} className="card">
            <Link to={`Product/${product._id}`}> 
            <img src={product.imgArr[0]} alt="Category product" />
                <div className="Detail">
                    <p className="name">{product.name}</p>
                    <span className="price">₹{product.price}</span>
                </div>
            </Link>
            </div>
          ))}
            
          </div>
          <div className="cards">
          {Products && Products.map((product)=> (
            <div key={product._id} className="card">
            <Link to={`Product/${product._id}`}> 
            <img src={product.imgArr[0]} alt="category product" />
                <div className="Detail">
                    <p className="name">{product.name}</p>
                    <span className="price">₹{product.price}</span>
                </div>
            </Link>
            </div>
          ))}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
