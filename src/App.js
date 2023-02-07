import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Pagination from './components/Pagination';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Favourites from './components/Favourites';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <>

    <BrowserRouter>

    <NavBar></NavBar>

    <Routes>
   
   <Route path="/" element={
    <>
      <Banner></Banner>
    <Movies></Movies>
    <Pagination></Pagination>
    </>
   }></Route>

   <Route path="/fav" element={

    <Favourites/>

   }></Route>

   <Route path="*" element={<PageNotFound/>}></Route>
    
    </Routes>
     
   
  

    </BrowserRouter>
   
  


    </>
   
  );
}

export default App;
