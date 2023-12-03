import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='Footer'>
     <div className="row g-0">
     <div className="col">
        <p className="foot_title">Quick Menu</p>
        <ul>
            <li><Link to="/Electronic">Electronics</Link></li>
            <li><Link to="/House">Home</Link></li>
            <li><Link to="/Appliance">Appliance</Link></li>
            <li><Link to="/Fashion">Fashion</Link></li>
            <li><Link to="/Beauty">Beauty</Link></li>
        </ul>
      </div>
      <div className="col">
        <p className="foot_title">Licence</p>
        <ul>
            <li>Private Policy</li>
            <li>Copyright</li>
            <li>Terms & Conditions</li>
        </ul>
      </div>
      <div className="col">
        <p className="foot_title">Problem?</p>
        <ul>
            <li>TroubleShoot</li>
            <li>Customer Care</li>
            <li>Payment Policy</li>
        </ul>
      </div>
     </div>
     <div className="socials">
     <a target='_blank' rel="noreferrer" href="https://github.com/Ayushh-patell"><ion-icon name="logo-github"></ion-icon></a>
     <a target='_blank' rel="noreferrer" href="ayush.patel.code@gmail.com"><ion-icon name="logo-google"></ion-icon></a>
     <a target='_blank' rel="noreferrer" href="https://instagram.com/__.ayush._.patel.__?igshid=OGU0MmVlOWVjOQ=="><ion-icon name="logo-instagram"></ion-icon></a>
     <a target='_blank' rel="noreferrer" href="www.linkedin.com/in/ayush-patel-99a44b283"><ion-icon name="logo-linkedin"></ion-icon></a>
     </div>
    </footer>
  )
}

export default Footer
