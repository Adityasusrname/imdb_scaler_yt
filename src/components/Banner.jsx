import React,{useEffect, useState} from 'react'
import Image from '../banner.jpg'
import axios from "axios"

function Banner() {

    let [bannerMovie,setBanner] = useState("");
   
  useEffect(function(){

    (function(){
        axios.
        get
        ("https://api.themoviedb.org/3/trending/all/week?api_key=09df8f20c2dbf1dce6dd61c0a06c350c&page=3")
        .then((res)=>{
          console.table(res.data.results);
          setBanner(res.data.results[0]);
        })
    })()

  },[])
  return (
    <>

    {
        bannerMovie == ""?<h1>Loading...</h1>: <div className={`bg-[url(https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path})] h-[40vh] md:h-[60vh] bg-center bg-cover flex items-end`}>

        <div className='text-xl md:text-3xl text-white bg-gray-900 p-4 bg-opacity-40 text-center w-full font-bold'>
            {bannerMovie.title}
        </div>

       </div>
    }
    
      
      
    </>
  )
}

export default Banner