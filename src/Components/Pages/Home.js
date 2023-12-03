import React from 'react'
import Landing_image from '../Landing_image'
import Recomended_box from '../Recomended_box'
import Display from '../Display'

const Home = () => {
  return (
    <>
        <h4 className='landing_title'>Discover, Shop, and Save: Your Ultimate Online Shopping Destination awaits</h4>
      <Landing_image/>
      <Recomended_box  title={"Recomended for you"} />
      <Display/>
          </>
  )
}

export default Home
