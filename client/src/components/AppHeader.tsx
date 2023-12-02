import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css';
import '../assets/css/AppHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {CatProp} from "../types";
import {useContext} from "react";
import {CartStore} from "../context/CartContext";
function AppHeader(){
    const {cart}= useContext(CartStore);
    const totalQuantity = cart.reduce((total, item) => total+ item.quantity, 0);
function HandleClick(){

}
return(

  <header className="full-header" style={{backgroundColor:"rgba(69, 150, 83, 100%)"}} >
    <section className="top-header">
      <section className="bookstore-logo">
      <Link to="/">
        <img
            src={require('../assets/images/site/BookOasis Logo.png')}
          // src={require('E:\\WebDev\\CS5244\\Images\\BookOasis Logo.png')}
          alt="Book Oasis Logo"
          // width="150px"
          // height="auto"
        />
      </Link>
    </section>
    <section className="title-and-search-bar">
      <h1>
        {/*<Link to="/" className="text-logo"> xx </Link>*/}
      </h1>
      <form action="">
          <div className="title-and-search-bar" >

          <input type="text" placeholder="search here.." className="search-bar" style={{ backgroundColor:'white', fontWeight: 'bold' }}/>
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{position:"relative", right:"45px", top:"-7px", color:"black" }}/>
        {/*<input type="submit" className="button search-button" value="Search" />*/}
              </div>
      </form>
    </section>
    <section className="like-cart-login">
        <Link to="/cart" className="button">
            <FontAwesomeIcon icon={faCartShopping} style={{color: "#0a0a0a"}} />
             {totalQuantity}
        </Link>
       <button className="login-button" onClick={HandleClick} > Hi! Prerna</button>
    </section>
    </section>
      <section className="bottom-header" style={{ color:"white"}}>
          <Link to="/" className="Home">Home</Link>

          <button className="Categories">
              <HeaderDropdown />
          </button>

          <Link to="/" className="Arrivals">Arrivals</Link>
          <Link to="/" className="Bloga">Blogs</Link>
      </section>
  </header>
)
}
export default AppHeader;

