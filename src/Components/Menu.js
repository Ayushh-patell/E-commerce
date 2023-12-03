import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  
  return (
    <div className='container-fluid'>
      <div className="menu">
      <Link to='/Electronic' className="category"><p>Electronics</p></Link>
      <Link to='/House' className="category"><p>House</p></Link>
      <Link to='/Appliance' className="category"><p>Appliances</p></Link>
      <Link to='/Fashion' className="category"><p>Fashion</p></Link>
      <Link to='/Beauty' className="category"><p>Beauty</p></Link>
      </div>
    </div>
  )
}

export default Menu
