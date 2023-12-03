import React, { useEffect, useLayoutEffect } from "react";
import "./product.css";
import { useParams } from "react-router-dom";
import { useState } from "react";

let totalSum = 0;
let totalCount = 0;
let fav = "";

let star5;
let star4;
let star3;
let star2;
let star1;

const Product = () => {
  const [prodnav, setprodnav] = useState("detail");
  const [product, setproduct] = useState(null);
  const [username, setusername] = useState(null);
  const [refID, setrefID] = useState(null);
  const [refText, setrefText] = useState(null);
  const [cartQuantity, setcartQuantity] = useState(1);
  const { id } = useParams();

  const handleCart = async (e) => {
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
          quantity: cartQuantity,
        }),
      });
      document.querySelector(".spinner").style.display = "none";
    }
  };

  const handleFavourite = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("MyShopAuthToken");
    if (!token) {
      alert("You need to login");
    } else {
      if (document.querySelector(".favHeart").style.color === "gray") {
        document.querySelector(".favHeart").style.color = "hotpink";
        document.querySelector(".spinner").style.display = "flex";
        await fetch("https://e-commerce-backend-qaox.onrender.com/user/auth/addFavourite", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authtoken: token,
          },
          body: JSON.stringify({
            favouriteID: id,
          }),
        });
        document.querySelector(".spinner").style.display = "none";
      } else {
        document.querySelector(".favHeart").style.color = "gray";
        document.querySelector(".spinner").style.display = "flex";
        await fetch("https://e-commerce-backend-qaox.onrender.com/user/auth/addFavourite", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authtoken: token,
          },
          body: JSON.stringify({
            favouriteID: id,
          }),
        });
        document.querySelector(".spinner").style.display = "none";
      }
    }
  };

  const handleQuestion = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("MyShopAuthToken");
    if (!token) {
      alert("You need to login");
    } else {
      document.querySelector(".spinner").style.display = "flex";
      const response = await fetch("https://e-commerce-backend-qaox.onrender.com/prod/Addquestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: token,
        },
        body: JSON.stringify({
          prodID: id,
          question: document.querySelector("#questionInput").value,
        }),
      });
      if (response.ok) {
        document.querySelector("#questionInput").value = "";
        getProdDetail();
      }
      document.querySelector(".spinner").style.display = "none";
    }
  };

  const handleAnswer = async (e, questionid) => {
    e.preventDefault();
    let token = localStorage.getItem("MyShopAuthToken");
    if (document.querySelector("#answerInput").value === "") {
      alert("Answer Can't be blank");
    } else if (!token) {
      alert("You need to login");
    } else {
      document.querySelector(".spinner").style.display = "flex";
      const response = await fetch("https://e-commerce-backend-qaox.onrender.com/prod/Addanswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: token,
        },
        body: JSON.stringify({
          prodID: id,
          answer: e.target.previousElementSibling.value,
          questionID: questionid,
        }),
      });
      if (response.ok) {
        e.target.previousElementSibling.value = "";
        getProdDetail();
      }
      document.querySelector(".spinner").style.display = "none";
      getProdDetail();
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("MyShopAuthToken");
    if (!token) {
      alert("You need to login");
    } else {
      document.querySelector(".spinner").style.display = "flex";
      const response = await fetch("https://e-commerce-backend-qaox.onrender.com/prod/Addreview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: token,
        },
        body: JSON.stringify({
          prodID: id,
          review: document.querySelector("#reviewInput").value,
        }),
      });
      if (response.ok) {
        document.querySelector("#reviewInput").value = "";
        getProdDetail();
      }
      document.querySelector(".spinner").style.display = "none";
    }
  };

  const handleDeleteClick = async (e, Id, text) => {
    e.preventDefault();
    document.querySelector(".spinner").style.display = "flex";
    let deletebody;
    if (text === "review") {
      deletebody = {
        prodID: id,
        reviewID: Id,
      };
    } else if (text === "question") {
      deletebody = {
        prodID: id,
        questionID: Id,
      };
    } else {
      deletebody = {
        prodID: id,
        questionID: Id,
      };
    }
    await fetch(`https://e-commerce-backend-qaox.onrender.com/prod/Delete${text}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("MyShopAuthToken"),
      },
      body: JSON.stringify(deletebody),
    });
    document.querySelector(".spinner").style.display = "none";
    getProdDetail();
  };
  const handleUpdateClick = (e, id, text) => {
    e.preventDefault();
    document.querySelector(".updateBox").classList.toggle("showUpdateBox");
    setrefID(id);
    setrefText(text);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    document.querySelector(".spinner").style.display = "flex";
    let token = localStorage.getItem("MyShopAuthToken");
    let updatebody;
    if (refText === "review") {
      updatebody = {
        prodID: id,
        reviewID: refID,
        review: document.querySelector("#updateInput").value,
      };
    } else if (refText === "question") {
      updatebody = {
        prodID: id,
        questionID: refID,
        question: document.querySelector("#updateInput").value,
      };
    } else {
      updatebody = {
        prodID: id,
        questionID: refID,
        answer: document.querySelector("#updateInput").value,
      };
    }

    await fetch(`https://e-commerce-backend-qaox.onrender.com/prod/Update${refText}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: token,
      },
      body: JSON.stringify(updatebody),
    });
    document.querySelector(".spinner").style.display = "none";
    getProdDetail();
    document.querySelector(".updateBox").classList.toggle("showUpdateBox");
    setrefID("");
    setrefText("");
  };

  const getProdDetail = async () => {
    document.querySelector(".spinner").style.display = "flex";
    const response = await fetch("https://e-commerce-backend-qaox.onrender.com/prod/ProdDetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ID: id }),
    });
    const data = await response.json();
    setproduct(data.product);
    document.querySelector(".spinner").style.display = "none";
  };

  useLayoutEffect(() => {
    getProdDetail();
  }, [id]);

  useEffect(() => {
    if (product) {
      totalSum = 0;
      totalCount = 0;
      for (const [star, count] of Object.entries(product.rating)) {
        totalSum += parseInt(star) * count;
        totalCount += count;
      }
      star5 = Math.round((product.rating[5] / totalCount) * 100);
      star4 = Math.round((product.rating[4] / totalCount) * 100);
      star3 = Math.round((product.rating[3] / totalCount) * 100);
      star2 = Math.round((product.rating[2] / totalCount) * 100);
      star1 = Math.round((product.rating[1] / totalCount) * 100);
    }
  }, [product]);

  const getuserdata = async () => {
    let token = localStorage.getItem("MyShopAuthToken");
    if (token) {
      document.querySelector(".spinner").style.display = "flex";
      const response = await fetch("https://e-commerce-backend-qaox.onrender.com/user/auth/userInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: localStorage.getItem("MyShopAuthToken"),
        },
      });
      const data = await response.json();
      setusername(data.name);
      data.cart.forEach((element) => {
        if (element.id === id) {
          setcartQuantity(element.quantity);
        }
      });
      data.favourite.forEach((element) => {
        if (element === id) {
          let el = document.querySelector(".favHeart");
          if (el) {
            el.style.color = "hotpink";
          }
        }
      });
      document.querySelector(".spinner").style.display = "none";
    }
  };
  useEffect(() => {
    getuserdata();
  }, [product]);

  return (
    <div className="product_box">
      {product && (
        <>
          <div id="carouselExampleIndicators" className="carousel slide my-3">
            <div className="carousel-indicators">
              {product.imgArr.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  className={`${index < 1 ? "active" : ""}`}
                  aria-current="true"
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {product.imgArr.map((img, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img src={img} className="d-block w-100" alt="product" />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="container my-3">
            <div className="prod-details row">
              <h4 className="title">{product.name}</h4>
              <p className="prodDesc">{product.description}</p>
              <p className="prodPrice">
                ₹{product.price} <span>₹{product.price + 100}</span>
              </p>
              <p
                onClick={handleFavourite}
                style={{ color: "gray" }}
                className={`favHeart ${fav}`}
              >
                &#9829;
              </p>
              <div className="offers">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus adipisci libero.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus adipisci libero.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus adipisci libero.
                </p>
              </div>
              <div className="buttons my-3">
                <div className="input-group mb-3">
                  <div
                    onClick={() => {
                      setcartQuantity(cartQuantity + 1);
                    }}
                    className="input-group-prepend"
                  >
                    <span className="input-group-text">+</span>
                  </div>
                  <button onClick={handleCart} className="btn btn-success">
                    Add to cart({cartQuantity})
                  </button>
                  <div
                    onClick={() => {
                      setcartQuantity(cartQuantity > 1 ? cartQuantity - 1 : 1);
                    }}
                    className="input-group-append"
                  >
                    <span className="input-group-text">-</span>
                  </div>
                </div>
                <button className="btn btn-outline-warning">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="container my-3">
            <div className="heading_nav">
              <p
                onClick={() => setprodnav("detail")}
                className={` ${prodnav === "detail" ? "active" : ""}`}
              >
                Details
              </p>
              <p
                onClick={() => setprodnav("review")}
                className={` ${prodnav === "review" ? "active" : ""}`}
              >
                Reviews
              </p>
              <p
                onClick={() => setprodnav("question")}
                className={` ${prodnav === "question" ? "active" : ""}`}
              >
                Questions
              </p>
            </div>
            <div className="prod_additional">
              <div
                className={`additional_content Detail ${
                  prodnav === "detail" ? "show" : ""
                }`}
              >
                <div className="specification">
                  {product.specification.map((specs, index) => (
                    <div key={index} className="spec">
                      <p className="spec-name">{specs.specName}</p>
                      <p className="spec-value">{specs.specValue}</p>
                    </div>
                  ))}
                </div>
                <div className="more-details">
                  {product.detaildescription.map((detailDesc, index) => (
                    <div key={index} className="detailDescription">
                      <h5 className="title">{detailDesc.descname}</h5>
                      <p className="title-desc">{detailDesc.descvalue}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`additional_content reviews ${
                  prodnav === "review" ? "show" : ""
                }`}
              >
                <div className="total-rating">
                  <div className="main-rating">
                    <p className="rating-value">
                      {(totalSum / totalCount).toFixed(1)}
                    </p>
                    <p className="total-number-rating">Total:{totalCount}</p>
                  </div>
                  <div className="all-rating">
                    <div className="bar-rating star-5">
                      <div className="bar-box">
                        <div
                          className="bar"
                          style={{
                            width: star5 + "%",
                            backgroundColor: "#00b525",
                          }}
                        ></div>
                      </div>
                      <div className="percent_rating">{star5}%</div>
                    </div>
                    <div className="bar-rating star-4">
                      <div className="bar-box">
                        <div
                          className="bar"
                          style={{
                            width: star4 + "%",
                            backgroundColor: "#00b525",
                          }}
                        ></div>
                      </div>
                      <div className="percent_rating">{star4}%</div>
                    </div>
                    <div className="bar-rating star-3">
                      <div className="bar-box">
                        <div
                          className="bar"
                          style={{
                            width: star3 + "%",
                            backgroundColor: "#f1e315",
                          }}
                        ></div>
                      </div>
                      <div className="percent_rating">{star3}%</div>
                    </div>
                    <div className="bar-rating star-2">
                      <div className="bar-box">
                        <div
                          className="bar"
                          style={{
                            width: star2 + "%",
                            backgroundColor: "#d70000",
                          }}
                        ></div>
                      </div>
                      <div className="percent_rating">{star2}%</div>
                    </div>
                    <div className="bar-rating star-1">
                      <div className="bar-box">
                        <div
                          className="bar"
                          style={{
                            width: star1 + "%",
                            backgroundColor: "#d70000",
                          }}
                        ></div>
                      </div>
                      <div className="percent_rating">{star1}%</div>
                    </div>
                  </div>
                </div>
                <div className="review">
                  <h3 className="review-title">Reviews</h3>
                  <form onSubmit={handleReview} className="review_form">
                    <input
                      required
                      type="text"
                      name="review"
                      id="reviewInput"
                      placeholder="Write a review"
                    />
                    <button type="submit">Submit</button>
                  </form>
                  <div className="user_reviews">
                    {product.review.map((review, index) => (
                      <div key={index} className="user-review">
                        <p className="username">{review.username}</p>
                        <p className="review-text">{review.userreview}</p>
                        {username === review.username ? (
                          <div className="buttons">
                            <button
                              onClick={(e) => {
                                handleUpdateClick(e, review._id, "review");
                              }}
                              style={{ backgroundColor: "green" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="#fff"
                                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                                />
                              </svg>
                            </button>
                            <button 
                            onClick={(e) => {
                                handleDeleteClick(e, review._id, "review");
                              }}
                               style={{ backgroundColor: "red" }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="#fff"
                                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                                />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={`additional_content questionanswer ${
                  prodnav === "question" ? "show" : ""
                }`}
              >
                <form onSubmit={handleQuestion} className="question_form">
                  <input
                    required
                    type="text"
                    name="question"
                    id="questionInput"
                    placeholder="Ask a quesiton"
                  />
                  <button type="submit">Submit</button>
                </form>
                {product.QandA.map((QA, index) => (
                  <div key={index} className="question-box">
                    <span className="user-question">
                      <p className="question">{QA.question}</p>
                      <p className="user">{QA.questionuser}</p>
                      {username === QA.questionuser ? (
                        <div className="buttons">
                          <button
                            onClick={(e) => {
                              handleUpdateClick(e, QA._id, "question");
                            }}
                            style={{ backgroundColor: "green" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="#fff"
                                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                              />
                            </svg>
                          </button>
                          <button
                          onClick={(e) => {
                                handleDeleteClick(e, QA._id, "question");
                              }}
                           style={{ backgroundColor: "red" }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 448 512"
                            >
                              <path
                                fill="#fff"
                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </span>
                    <div className="user-answer">
                      <p className="answer">{QA.answer}</p>
                      <p className="user">{QA.answeruser}</p>
                      {username === QA.answeruser ? (
                        <div className="buttons">
                          <button
                            onClick={(e) => {
                              handleUpdateClick(e, QA._id, "answer");
                            }}
                            style={{ backgroundColor: "green" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="#fff"
                                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                              />
                            </svg>
                          </button>
                          <button
                          onClick={(e) => {
                                handleDeleteClick(e, QA._id, "answer");
                              }}
                           style={{ backgroundColor: "red" }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 448 512"
                            >
                              <path
                                fill="#fff"
                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {QA.answer === "" ? (
                      <div className="answerbox">
                        <input
                          type="text"
                          placeholder="Enter answer"
                          id="answerInput"
                          name="answer"
                        />
                        <button
                          onClick={(e) => {
                            handleAnswer(e, QA._id);
                          }}
                          className=" py-1 my-2 btn btn-info"
                        >
                          Answer
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="updateBox">
            <form onSubmit={handleUpdate}>
              <svg
                onClick={(e) => {
                  handleUpdateClick(e, "", "");
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
              <input
                id="updateInput"
                type="text"
                required
                placeholder="write text here"
              />
              <button type="submit">Update</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
