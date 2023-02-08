import React from 'react'
import axios from "axios"

function Movies() {
  
  return (
    <div className='mt-8'>

        <div className='mb-8
        font-bold
        text-2xl
        text-center'>Trending Movies</div>

        <div className='flex
        flex-wrap
        justify-center'>

          <div className="w-[150px] h-[30vh] md:h-[40vh] md:w-[180px] m-4 rounded-xl hover:scale-110 duration-300 border-4 
          bg-[url(https://www.themoviedb.org/t/p/w533_and_h300_bestv2/dlrWhn0G3AtxYUx2D9P2bmzcsvF.jpg)]
           bg-center bg-cover flex items-end">

            <div className='font-bold text-white bg-gray-900 p-4 bg-opacity-40 text-center w-full font-bold rounded-b-xl'>M3GAN</div>

          </div>  
            </div>
    </div>
  )
}

export default Movies