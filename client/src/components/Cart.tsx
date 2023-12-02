
import  "../assets/css/CartTable.css";
import  "../assets/css/cart.css";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import CartTable from "./CartTable";
import {CartStore} from "../context/CartContext";
import EmptyCart from "./EmptyCart";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";


function Cart() {
    const { cart } = useContext(CartStore);
    const navigate = useNavigate();
    const lastCat = localStorage.getItem('lastCat');

    return (
        <div className="trial">
            <div className="table">

            {cart.length > 0 ? (
                <div className='col1'>
                    <h1>Cart Page</h1>

                    <button className="Continue-shopping" onClick={() => navigate(`/categories/${lastCat}`)}>
                        &#8592; Continue Shopping
                    </button>

                    <button className="Checkout">
                        <Link to="/checkout" style={{ fontWeight:"bold"}}>
                            CHECKOUT
                            <FontAwesomeIcon icon={faCartShopping} style={{ color: "white"}} />
                        </Link>
                    </button>
                    <CartTable />

                </div>
            //     <div className="summary">
            //    <button className="Checkout"><Link to="/checkout">Proceed to Checkout</Link> </button>
            // </div>
            )

                : (<EmptyCart />)
            }


            </div>

        </div>
    );
}

export default Cart;