import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import './Recomend.css'
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Recomended_box = (props) => {
  const app = useRef();
  useLayoutEffect(() => {
    const imageBoxes = document.querySelectorAll(".items");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          duration: 0.1,
          opacity: 0,
          y: 0,
        },
      });

      imageBoxes.forEach((imageBox) => {
        tl.fromTo(
          imageBox,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
          }
        );
      });
      ScrollTrigger.create({
        trigger: ".items",
        start: "top 90%",
        end: "+=100",
        toggleActions: "play none none reset",
        animation: tl,
      });
    }, app);

    return () => ctx.revert();
  }, []);
  return (
    <div ref={app}>
      <h4
        style={{
          margin:"1rem 0",
          fontSize: "2.2rem",
          textAlign: "left",
          borderBottom: "2px solid #0000002e",
          paddingBottom: "0.3rem",
        }}
        className="scroll-title mb-3"
      >
        {props.title}
      </h4>
      <div className="content-scroll-box row gx-0 gy-2">
        <div className={`col-md-4 col-sm-6 col-12 items`}>
          <div className="img-box recom_1">
            <Link to="/Appliance">
            <img src="./img/appliances.jpg" alt=" by Amy Shamblen on Unsplash" />
            <p className="recomend-text">Appliances</p>
            </Link>
          </div>
        </div>
        <div className={`col-md-4 col-sm-6 col-12 items`}>
          <div className="img-box recom_2">
            <Link to="/Electronic">
            <img src="./img/electronic.jpg" alt="by Domenico Loia on Unsplash" />
            <p className="recomend-text">Electronics</p>
            </Link>
          </div>
        </div>
        <div className={`col-md-4 col-sm-6 col-12 items`}>
          <div className="img-box recom_1">
            <Link to="/Fashion">
            <img src="./img/fashion.jpg" alt="by Masaaki Komori on Unsplash" />
            <p className="recomend-text">Branded cloths</p>
            </Link>
          </div>
        </div>
        <div className={`col-md-4 col-sm-6 col-12 items`}>
          <div className="img-box recom_2">
            <Link to="/House">
            <img src="./img/bedroom.jpg" alt=" by Spacejoy on Unsplash" />
            <p className="recomend-text">Bed Room</p>
            </Link>
          </div>
        </div>
        <div className={`col-md-4 col-sm-6 col-12 items`}>
          <div className="img-box recom_1">
            <Link to="/Beauty">
            <img src="./img/beauty.jpg" alt=" by Naomi Hébert on Unsplash" />
            <p className="recomend-text">Beauty Product</p>
            </Link>
          </div>
        </div>
        <div className={`col-md-4 col-sm-6 col-12 items`}>
          <div className="img-box recom_2">
            <img src="./img/more.jpg" alt=" by Vadim Sherbakov on Unsplash./img/" />
            <p className="recomend-text">Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recomended_box
