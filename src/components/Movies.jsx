import React,{useEffect,useState} from 'react'
import axios from "axios"
import {Oval} from "react-loader-spinner"
import Pagination from './Pagination';

function Movies() {

  let [movies,setMovies] = useState([]);

  let [pageNum,setPage]=useState(1);

  let [hovered,setHovered]=useState("");

  let [favourites,setFavourites]=useState([]);

  const onPrev=()=>{
        if(pageNum>1){
          setPage(pageNum-1);
        }
  }
  const onNext=()=>{
    
      setPage(pageNum+1);
   
}

const showEmoji = (id)=>{
    setHovered(id)
}

const hideEmoji = (id)=>{
  setHovered("")
}

const addToFav = (movie)=>{
    const newFav = [...favourites,movie];
    setFavourites(newFav);
    localStorage.setItem("imdb",JSON.stringify(newFav))
}

const removeFromFav = (movie)=>{

      const filteredFav = favourites.filter((element)=>{
        return element.id != movie.id
      })
      
      setFavourites(filteredFav)
      localStorage.setItem("imdb",JSON.stringify(filteredFav))
}

     
  useEffect(function(){

    (function(){
        axios.
        get
        ("https://api.themoviedb.org/3/trending/all/week?api_key=09df8f20c2dbf1dce6dd61c0a06c350c&page="+pageNum)
        .then((res)=>{
          
          setMovies(res.data.results);
          let oldFav = localStorage.getItem("imdb")
          oldFav = JSON.parse(oldFav)
          setFavourites([...oldFav])
         
        })
    })()

  },[pageNum])
  
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
                <div 
                onMouseOver={
                  ()=>{showEmoji(movie.id)}
                }
                onMouseLeave={
                  ()=>{hideEmoji(movie.id)}
                }
                key={movie.id} className="w-[150px] h-[30vh] md:h-[40vh] md:w-[180px] m-4 rounded-xl hover:scale-110 duration-300 border-4 
           bg-center bg-cover flex items-end relative"
           style={{
            backgroundImage:`url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`
           }}
           >

            <div className='p-2 bg-gray-800 absolute top-2 right-2 rounded-xl' style={{
              display:hovered==movie.id?"block":"none"
            }}>
               
              {
                
                favourites.find((m)=>m.id == movie.id)? <div className='text-xl' onClick={()=>{removeFromFav(movie)}}>❌</div> : <div className='text-xl' onClick={()=>{
                  addToFav(movie)
                }}>😍</div> 
                   }

           

            </div>

            <div className='font-bold text-white bg-gray-900 p-4 bg-opacity-40 text-center w-full font-bold rounded-b-xl'>{movie.title||movie.name}</div>

          </div> 
              )
            })
          }

           
            </div>

            <Pagination
            pageNum={pageNum}
            onPrev={onPrev}
            onNext={onNext}
            ></Pagination>
    </div>
  )
}

export default Movies