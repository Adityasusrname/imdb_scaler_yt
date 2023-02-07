import React from 'react'
import Image from '../banner.jpg'

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
            <img src={Image} className="w-[150px] h-[30vh] m-4 rounded-xl hover:scale-110 duration-300"/>
        </div>
    </div>
  )
}

export default Movies