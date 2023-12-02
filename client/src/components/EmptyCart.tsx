import  "../assets/css/CartTable.css";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Category} from "../context/CategoryContext";

// function  EmptyCart(){
//     return(
//     <h1>Your Cart is Empty </h1>
//     )
// }


function EmptyCart() {
    const categories = useContext(Category);

    return (
        <div className="empty-cart-container">
            <img
                src={require('../assets/images/site/cartimg.png')}
                alt="Empty Cart Illustration"
                className="empty-cart-image"
            />
            <h2>Your Cart is Empty</h2>
            <p>It looks like you haven't added any items to your cart yet. Start shopping!</p>
            <div className="shop-now">
                <button className="shop-now-button"><Link to={`/categories/${categories.length > 0 && categories[0].name}`}>SHOP NOW!</Link></button>
            </div>
        </div>
    );
}

export default EmptyCart;


