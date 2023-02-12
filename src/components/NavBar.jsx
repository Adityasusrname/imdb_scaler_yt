import React from 'react';
import Logo from '../logo.png';
import {Link} from "react-router-dom";

function NavBar(){
    return(
        <div className="border
        flex items-center
        space-x-8
        pl-12 py-4
        ">
            <img src={Logo} width="80px" height="80px"/>
            <Link to="/" className="font-bold text-xl text-blue-400">Movies</Link>
            <Link to="/fav" className="font-bold text-xl text-blue-400">Favourites</Link>
        </div>
    )
}

export default NavBar