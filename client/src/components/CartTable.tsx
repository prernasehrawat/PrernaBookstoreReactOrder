import  "../assets/css/CartTable.css";
import React from "react";
import {BookItem, ShoppingCartItem} from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faMinusCircle} from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {CartStore} from "../context/CartContext";
import {CartTypes} from "../reducers/CartReducer";
import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";



const getBookImageUrl = function (book: BookItem): string {
    let filename = book.title.toLowerCase();
    filename = filename.replace(/ /g, "-");
    filename = filename.replace(/'/g, "");
    filename = filename + ".gif";
    try {
        return require('../assets/images/books/' + filename);
    } catch (_) {
        return require('../assets/images/books/dune.gif');
    }
};
function CartTable() {
    const { cart, dispatch } = useContext(CartStore);
    const navigate = useNavigate();

    const addBookToCart = (book:BookItem) =>{
        dispatch({type: CartTypes.ADD, item:book, id:book.bookId});
    };
    const removeBookFromCart = (book: BookItem) => {
        dispatch({type: CartTypes.REMOVE, item:book, id:book.bookId});
    };
    const clearCart = ()=>{
        dispatch({type:CartTypes.CLEAR })
    };
    const subtotalQuantity = cart.reduce((total, cartItem) =>
        total + cartItem.quantity, 0);
    const subtotalAmount = cart.reduce((total, cartItem) =>
        total + cartItem.book.price * cartItem.quantity, 0);


    return (
        <div className="cart-page" >
            <div className="cart-table" >
            {/*    <div className="cart-table" style={{ border: '1px solid #ccc', padding: '10px' }}>*/}
                <ul className="cart2">
                    <li className="table-heading">
                        <div className="heading-book">Book</div>
                        <div className="heading-price">Price   /   Quantity</div>
                        <div className="heading-subtotal">Amount</div>
                    </li>
                    {
                        cart.length?
                            cart.map(cartitem =>(
                                <React.Fragment key={cartitem.id}>
                                <li>
                        <div className="cart-book-image">
                            <img
                                src={getBookImageUrl(cartitem.book)}
                                alt="prerna"
                                className="rect narrow-rect"/>
                        </div>
                        <div className="cart-book-title">{cartitem.book.title}</div>
                        <div className="cart-book-price">${cartitem.book.price}</div>
                        <div className="cart-book-quantity">
                            <button className="icon-button inc-button"
                                onClick={() => removeBookFromCart(cartitem.book)}>
                                <i className="fas fa-chevron-right">  <FontAwesomeIcon icon={faMinusCircle} /></i>
                            </button>
                            <span className="quantity">{cartitem.quantity}</span>&nbsp;
                            <button className="icon-button inc-arrow-button"
                            onClick={()=> addBookToCart(cartitem.book)}>
                                <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle} /></i>
                            </button>
                        </div>
                        <div className="cart-book-subtotal">${cartitem.book.price* cartitem.quantity}</div>
                    </li>
                            <li className="line-sep"></li>
                                </React.Fragment>
                                ))
                            :
                            <h1>Emptyy Cart</h1>
                    }
                </ul>

                {/*<div className="checkout-buttons">*/}
                {/*<button className="Clear-cart" onClick={clearCart} >Clear Cart</button>*/}
                {/*<button className="Checkout">*/}
                {/*    <Link to="/checkout">*/}
                {/*        Proceed to Checkout*/}
                {/*        <FontAwesomeIcon icon={faCartShopping} style={{color: "#0a0a0a"}} />*/}
                {/*    </Link>*/}
                {/*</button>*/}
                </div>
                {cart.length > 0 && (


                    <div className="subtotal-section">
                        <div className="subtotal-label">Subtotal:</div>
                        <div className="subtotal-values">
                            <span className="subtotal-quantity">{subtotalQuantity}</span>
                            <span className="subtotal-amount">${subtotalAmount}</span>
                        </div>
                    </div>
                )}

            <div className="checkout-buttons">
                <button className="Clear-cart" onClick={clearCart} >Clear Cart</button>

                {/*<button className="Checkout">*/}
                {/*    <Link to="/checkout">*/}
                {/*        Proceed to Checkout*/}
                {/*        <FontAwesomeIcon icon={faCartShopping} style={{color: "#0a0a0a"}} />*/}
                {/*    </Link>*/}
                {/*</button>*/}
            </div>

            </div>
            // <div className="checkout-buttons">
            //     <button className="Clear-cart" onClick={clearCart} >Clear Cart</button>
            //    <button className="Checkout">
            //         <Link to="/checkout">
            //             Proceed to Checkout
            //            <FontAwesomeIcon icon={faCartShopping} style={{color: "#0a0a0a"}} />
            //        </Link>
            //    </button>
            // </div>



    )
}

export default CartTable;

