import React,{useEffect,useState} from 'react'
import axios from "axios"
import {Oval} from "react-loader-spinner"

function Movies() {

  let [movies,setMovies] = useState([]);
     
  useEffect(function(){

    (function(){
        axios.
        get
        ("https://api.themoviedb.org/3/trending/all/week?api_key=09df8f20c2dbf1dce6dd61c0a06c350c&page=1")
        .then((res)=>{
          console.table(res.data.results);
          setMovies(res.data.results);
        })
    })()

  },[])
  
  return (
    <div className='mt-8'>

        <div className='mb-8
        font-bold
        text-2xl
        text-center'>Trending Movies</div>

        <div className='flex
        flex-wrap
        justify-center'>

          {
            movies.length==0?  <Oval
            height="80"
            width="80"
            radius="9"
            color="gray"
            secondaryColor='gray'
            ariaLabel="loading"
           
          />:
            movies.map((movie)=>{
              return(
                <div key={movie.id} className="w-[150px] h-[30vh] md:h-[40vh] md:w-[180px] m-4 rounded-xl hover:scale-110 duration-300 border-4 
           bg-center bg-cover flex items-end"
           style={{
            backgroundImage:`url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`
           }}
           >

            <div className='font-bold text-white bg-gray-900 p-4 bg-opacity-40 text-center w-full font-bold rounded-b-xl'>{movie.title||movie.name}</div>

          </div> 
              )
            })
          }

           
            </div>
    </div>
  )
}

export default Movies