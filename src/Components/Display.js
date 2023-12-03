import React, { useLayoutEffect, useRef } from 'react'
import './Display.css'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Display = () => {
    const app = useRef()

    useLayoutEffect(()=>{
        const right_img_box = document.querySelector(".text_right_image .details")
        const right_img = document.querySelector(".text_right_image .img")
        const left_img_box = document.querySelector(".text_left_image .details")
        const left_img = document.querySelector(".text_left_image .img")
        const ctx = gsap.context(()=> {
            const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: right_img_box,
                  start: "top 90%",
                  end: "bottom",
                  toggleActions: "play none none reset"
                }
              });
              tl.from(right_img, {
                y: 100,
                duration: 0.3,
              });
              tl.from(right_img_box, {
                x: -100,
                duration: 0.5,
                opacity: 0,
              });
              tl.from(left_img, {
                y: 100,
                duration: 0.3,
              });
              tl.from(left_img_box, {
                x: 100,
                duration: 0.5,
                opacity: 0,
              });

        }, app)
        return ()=> { ctx.revert()}
    },[])
  return (
    <div ref={app} className='row display_box g-0'>
        <div className="text_right_image">
            <div className="details col-6 ">
                <h5 className="title">Explore Exclusive brand deals</h5>
                <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quae id officiis, deserunt hic ea, quo, quaerat sequi saepe quam beatae dolor? Nostrum at doloremque voluptatibus architecto dolorem nemo!</p>
            </div>
            <div className="img col-6">
                <img src="./img/sale.jpg" alt="by Tamanna Rumee on Unsplash" />
            </div>
        </div>
        <div className="text_left_image">
            <div className="img col-6">
                <img src="./img/Us.jpg" alt="by Luis Villasmil on Unsplash" />
            </div>
            <div className="details col-6">
                <h5 className="title">Know more about Us!</h5>
                <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. In illo nesciunt est magnam obcaecati placeat numquam veniam aperiam iure distinctio ipsum quaerat possimus fugit, dicta, quasi quibusdam. Aperiam, commodi rerum iste sunt in tempora placeat eos quo id maiores quam nam. Officia sint doloremque autem.</p>
            </div>
        </div>
    </div>
  )
}

export default Display
