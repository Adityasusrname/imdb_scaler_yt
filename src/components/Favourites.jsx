import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'


function Favourites() {

  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation', 35: 'Comedy',
    80: 'Crime', 99: 'Documentary',
    18: 'Drama', 10751: 'Family',
    14: 'Fantasy', 36: 'History',
    27: 'Horror',
    10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller',
    10752: 'War',
    37: 'Western'
  }
  const [curGenre,setCurGenre] = useState('All Genres')
  const [favourites,setFavourites] = useState([])
  const [genres,setGenres] = useState([])
  const [rating,setRating] = useState(0)
  const [popularity,setPopularity] = useState(0)
  const [search,setSearch] = useState("")
  const [rows,setRows] = useState(5)
  const [curPage,setCurPage] = useState(1)


  const removeFromFav = (movie)=>{

    const filteredFav = favourites.filter((element)=>{
      return element.id != movie.id
    })
    
    setFavourites(filteredFav)
    localStorage.setItem("imdb",JSON.stringify(filteredFav))
}

useEffect(()=>{
  let temp = favourites.map((movie)=>genreids[movie.genre_ids[0]])
  temp=new Set(temp)
  setGenres(["All Genres",...temp])
},[favourites])

  useEffect(()=>{
    let oldFav = localStorage.getItem("imdb")
    oldFav = JSON.parse(oldFav)
    if(oldFav!=null)
    setFavourites([...oldFav])
  },[])


  let filteredMovies = []

  filteredMovies = curGenre == "All Genres"?favourites:favourites.filter((movie)=>genreids[movie.genre_ids[0]]==curGenre)

  if(rating==1){
     filteredMovies = filteredMovies.sort(function(objA,objB){
      return objA.vote_average - objB.vote_average
     })
  }
  else if(rating==-1){
    filteredMovies = filteredMovies.sort(function(objA,objB){
      return objB.vote_average - objA.vote_average
     })
  }


  if(popularity==1){
    filteredMovies = filteredMovies.sort(function(objA,objB){
     return objA.popularity - objB.popularity
    })
 }
 else if(popularity==-1){
   filteredMovies = filteredMovies.sort(function(objA,objB){
     return objB.popularity - objA.popularity
    })
 }
 
 filteredMovies = filteredMovies.filter((movie)=>(movie.title || movie.name).toLowerCase().includes(search.toLowerCase()))


 let maxPage = Math.ceil(filteredMovies.length/rows)
 let si = (curPage-1)*rows
 let ei = Number(si) + Number(rows)


 filteredMovies = filteredMovies.slice(si,ei)

 let onPrev = ()=>{
  if(curPage>1){
    setCurPage(curPage-1)
  }
 }

 let onNext = ()=>{
  if(curPage<maxPage){
    setCurPage(curPage+1)
  }
 }

  return (
    <>
  
     <div className='mt-6 flex space-x-2 justify-center'>

     {
      genres.map((genre)=>{
        return (
          <button className={ curGenre!=genre?'p-1 px-2 bg-gray-400 rounded-lg text-lg font-bold text-white hover:bg-blue-400'
        :
        'p-1 px-2 bg-blue-400 rounded-lg text-lg font-bold text-white'} onClick={()=>{setCurPage(1);setCurGenre(genre)}}>{genre}</button>
        )
      })
    }
     </div>
    <div className='mt-4 flex justify-center space-x-2'>
      <input type="text" placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)} className='border-2 py-1 px-2 text-center'/>
      <input type="number" value={rows} onChange={(e)=>setRows(e.target.value)} className='border-2 py-1 px-2 text-center' />
    </div>
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
  <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">
          <div className='flex'>
        <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" class="mr-2 cursor-pointer" onClick={()=>{setPopularity(0); setRating(-1)}}></img>
        <div>Rating</div>
        <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" class="ml-2 mr-2 cursor-pointer" onClick={()=>{setPopularity(0);setRating(1)}}></img>
        </div>
        </th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900"> <div className='flex'>
        <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" class="mr-2 cursor-pointer" onClick={()=>{setRating(0);setPopularity(-1)}}></img>
        <div>Popularity</div>
        <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" class="ml-2 mr-2 cursor-pointer" onClick={()=>{setRating(0);setPopularity(1)}}></img>
        </div></th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Genre</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Remove</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
      {
        filteredMovies.map((movie)=>{
        
          return(
            <tr class="hover:bg-gray-50">
            <th class="flex px-6 py-4 font-normal text-gray-900 items-center space-x-2">
             
                <img
                  class="md:h-[10rem] md:w-[10rem] object-fit"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                />
               
           
                <div class="font-medium text-gray-700 text-sm">{movie.title || movie.name}</div>
              
              
            </th>
            <td class="px-6 py-4 pl-12">
               {movie.vote_average.toFixed(2)}
            </td>
            <td class="px-6 py-4 pl-12">{movie.popularity.toFixed(2)}</td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <span
                  class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                >
                    {genreids[movie.genre_ids[0]]}
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
            <span
                  class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-red-600 hover:cursor-pointer" onClick={()=>{removeFromFav(movie)}}
                >
                 Delete
                </span>
            </td>
          </tr>
          )
        })
      }
      
 </tbody>
  </table>
</div>
    <Pagination pageNum={curPage} onPrev={onPrev} onNext={onNext}></Pagination>
    </>
  
  )
}



export default Favourites