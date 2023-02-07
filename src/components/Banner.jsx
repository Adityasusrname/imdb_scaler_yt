import React from 'react'
import Image from '../banner.jpg'
import './Banner.css'

function Banner() {
  return (
    <>
       <img src={Image} className="w-full"/>
       <div className="parent
       banner-head ">
         
       <div className='
       bg-gray-900 
       text-white
       text-2xl
       text-center
       font-bold
       bg-opacity-40
       py-10'>M3GAN</div>

       </div>
      
    </>
  )
}

export default Banner