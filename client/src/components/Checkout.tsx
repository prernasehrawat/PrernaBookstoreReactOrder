import  "../assets/css/Checkout.css";
import React, {ChangeEvent, useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { isCreditCard, isMobilePhone, isvalidEmail, getBookImageUrl } from "../services/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { useNavigate } from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import { CustomerForm, months, OrderDetails, years } from "../types";
import {CartStore} from "../context/CartContext";
import api from "../services/api";
import EmptyCart from "./EmptyCart";

type RequestStatus = '' | 'idle' | 'processing' | 'success' | 'error' | 'unexpected';
function PaymentForm() {
    const { cart, dispatch } = useContext(CartStore);
    const navigate = useNavigate();
    const lastCategory = localStorage.getItem('lastCategory');

    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ccNumberError, setCcNumberError] = useState("");

    const [formData, setFormData] = useState({ name: "", address:"", phone:"", email: "", ccNumber: "", ccExpiryMonth: 1, ccExpiryYear: yearFrom(0) });

    function isValidForm() {
        if (formData.name.length < 4 || formData.name.length > 45) {
            return false;
        }
        if (formData.address.length < 10 || formData.address.length > 100) {
            return false;
        }
        if (!isMobilePhone(formData.phone)) {
            return false;
        }
        if (!isvalidEmail(formData.email)) {
            return false;
        }
        if (!isCreditCard(formData.ccNumber)) {
            return false;
        }
        return true;
    }

    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }

    const messageTuple = Object.freeze({
        IDLE: 'idle',
        PROCESSING: 'processing',
        SUCCESS: 'success',
        ERROR: 'error',
        UNEXPECTED: 'unexpected'
    });

    type RequestStatus = '' | 'idle' | 'processing' | 'success' | 'error' | 'unexpected';
    const [buttonClicked, setButtonClicked] = useState(false);
    const [requestStatus, setRequestStatus] = useState<RequestStatus>(messageTuple.IDLE);
    const [networkError, setNetworkError] = useState(true);
    const [CcExpiryError, setCcExpiryError] = useState("");

    const getButtonMessage = (): string => {
        switch (requestStatus) {
            case 'idle':
                return '';
            case 'error':
                return 'Please fix the errors above and try again.';
            case 'processing':
                return 'Processing...';
            case 'success':
                return 'Order placed!';
            case 'unexpected':
                return 'An unexpected error occurred, please try again.';
            default:
                return 'CONFIRM ORDER';
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (requestStatus === messageTuple.ERROR || requestStatus === messageTuple.UNEXPECTED) {
            timer = setTimeout(() => {
                setButtonClicked(false);
                setRequestStatus(messageTuple.IDLE);
            }, 2000);
        }

        if (!networkError) {
            timer = setTimeout(() => {
                navigate(`/confirmation`);
            }, 2000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [requestStatus, networkError]);

    const handleOrderSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!isValidForm()) {
            setButtonClicked(false);
            setRequestStatus(messageTuple.ERROR);
            return;
        }

        const orders = await placeOrder({ ...formData, phone: formData.phone.replace(/[^\d]/g, ''), ccNumber: formData.ccNumber.replace(/[^\d]/g, '') });
        if (orders) {
            setButtonClicked(true);
            setRequestStatus(messageTuple.PROCESSING);
        }
    }

    const placeOrder = async (customerForm: CustomerForm) => {
        setButtonClicked(true);
        setRequestStatus(messageTuple.PROCESSING);
        const order = { customerForm, cart: { itemArray: cart } };

        const orders = JSON.stringify(order);
        const orderDetails: OrderDetails = await api.post('/orders', orders, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                dispatch({ type: CartTypes.CLEAR });
                setTimeout(() => {
                    setNetworkError(false);
                }, 2000);
                return response.data;
            })
            .catch((error) => {
                console.error(error);
                setTimeout(() => {
                    setRequestStatus(messageTuple.UNEXPECTED);
                    setNetworkError(true);
                }, 2000);
            });

        return orderDetails;
    }

    const handlePhoneNumberChange = (value: string, previousValue: string) => {
        // return nothing if no value
        if (!value) return value;

        // only allows 0-9 inputs
        const currentValue = value.replace(/[^\d]/g, '');
        const cvLength = currentValue.length;

        if (!previousValue || value.length > previousValue.length) {

            // returns: "x", "xx", "xxx"
            if (cvLength < 4) return currentValue;

            // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
            if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

            // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
            return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
        }

        return currentValue;
    };
    function cc_format(value: string) {
        const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
        const onlyNumbers = value.replace(/[^\d]/g, '');

        return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
            [$1, $2, $3, $4].filter(group => !!group).join(' ')
        );
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (value.length < 4 || value.length > 45) {
                    setNameError("Invalid name!");
                }
                else {
                    setNameError("");
                }
                break;
            case 'address':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (value.length < 10 || value.length > 100) {
                    setAddressError("Invalid address!");
                } else {
                    setAddressError("");
                }
                break;
            case 'phone':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: handlePhoneNumberChange(value, prevFormData.phone) }));
                if (isMobilePhone(value)) {
                    setPhoneError("");
                } else {
                    setPhoneError("Invalid phone number!");
                }
                break;
            case 'email':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (isvalidEmail(value)) {
                    setEmailError("");
                } else {
                    setEmailError("Invalid email address!");
                }
                break;
            case 'ccNumber':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: cc_format(value) }));
                if (isCreditCard(value)) {
                    setCcNumberError("");
                } else {
                    setCcNumberError("Invalid card number!");
                }
                break;
            case 'ccExpiryMonth':
            case 'ccExpiryYear':
                setFormData((prevFormData) => ({...prevFormData, [name]:parseInt(value,10)}));

                if(name === 'ccExpiryMonth' && formData.ccExpiryYear) {
                    const currentYear = new Date().getFullYear();
                    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
                    const selectedYear = formData.ccExpiryYear;
                    const selectedMonth = parseInt(value, 10);

                    // If selected year is less than current year
                    // or if it's the current year and selected month is before the current month
                    if(selectedYear < currentYear || (selectedYear === currentYear && selectedMonth < currentMonth)) {
                        setCcExpiryError('The expiration date has already passed.');
                    } else {
                        setCcExpiryError('');
                    }
                }

                if(name === 'ccExpiryYear' && formData.ccExpiryMonth) {
                    const currentYear = new Date().getFullYear();
                    const currentMonth = new Date().getMonth() + 1;
                    const selectedYear = parseInt(value, 10);
                    const selectedMonth = formData.ccExpiryMonth;

                    if(selectedYear < currentYear || (selectedYear === currentYear && selectedMonth < currentMonth)) {
                        setCcExpiryError('The expiration date has already passed.');
                    } else {
                        setCcExpiryError('');
                    }
                }
                break;
            // case 'ccExpiryMonth':
            //     setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value,10)}));
            //     break;
            // case 'ccExpiryYear':
            //     setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value,10)}));
            //     break;
            default:
                break;
        }
    }

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalCost = cart.reduce((acc, currentItem) => acc + (currentItem.quantity * currentItem.book.price), 0);
    const tax = totalCost === 0 ? 0 : (totalQuantity * 0.06).toFixed(2);

    return (
        <div className="form-container" style={{}}>
            <h2 style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Shipping Info</h2>

            <form onSubmit={handleOrderSubmit}>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="fname">Full Name</label>
                        <input type="text" size={20} id="fname" name="name" placeholder="Your name.."
                               style={{ backgroundColor:' #a8dea8', fontWeight: 'bold' }}
                               value={formData.name}
                               onChange={handleInputChange}
                        />
                        {nameError && <div className="error">{nameError}</div>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="lname">Address</label>
                        <input type="text" id="address" name="address" placeholder="Billing Address.."
                               style={{ backgroundColor:' #a8dea8', fontWeight: 'bold' }}
                               value={formData.address}
                               onChange={handleInputChange}
                        />
                        {addressError && <div className="error" >{addressError}</div>}
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" id="phone" name="phone" placeholder="Your phone.."
                               style={{ backgroundColor:' #a8dea8', fontWeight: 'bold' }}
                               value={formData.phone}
                               onChange={handleInputChange}
                        />
                        {phoneError && <div className="error">{phoneError}</div>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" placeholder="Your email.."
                               style={{ backgroundColor:' #a8dea8', fontWeight: 'bold' }}
                               value={formData.email}
                               onChange={handleInputChange}
                        />
                        {emailError && <div className="error">{emailError}</div>}
                    </div>

                </div>

                    <div className="form-row-card-expiry-row">
                        <div className="form-field">
                            <label htmlFor="ard-number">Card</label>
                            <input type="text" id="card-number" name="ccNumber" placeholder="1234-5678-9012-3456"
                                   style={{ backgroundColor:' #a8dea8', fontWeight: 'bold' }}
                                value={formData.ccNumber}
                                onChange={handleInputChange}
                            />
                            {ccNumberError && <div className="error">{ccNumberError}</div>}
                        </div>
                        <div className="form-field expiry-date">
                            <label htmlFor="month">Month</label>
                            <select
                                id="month"
                                name="ccExpiryMonth"
                                style={{ backgroundColor:' #a8dea8', fontWeight: 'bold' , color:"black"}}
                                value={formData.ccExpiryMonth}
                                onChange={handleInputChange}
                            >
                                {
                                    months.map((month, i) => (
                                        <option key={i} value={i+1}>
                                            { month }
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="form-field expiry-date expiry-year">
                            <label htmlFor="year">Year</label>
                            <select
                                id="year"
                                name="ccExpiryYear"
                                style={{ backgroundColor:' #a8dea8', fontWeight: 'bold' , color:"black"}}
                                value={formData.ccExpiryYear}
                                onChange={handleInputChange}
                            >
                                {
                                    years.map((year, i) => (
                                        <option key={i} value={yearFrom(year)}>
                                            { yearFrom(year) }
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                {/*<div className="error-msg" >*/}
                {/*ERROR MESSAGE*/}
                {/*</div>*/}
                {CcExpiryError && <div className="expiry-error"> {CcExpiryError}</div>}


                <div className="input-group">
                    <label htmlFor="subtotal">Subtotal({totalQuantity})</label>
                    <input type="text" id="subtotal" name="subtotal" readOnly value={totalCost} style={{ backgroundColor:' #a8dea8', fontWeight: 'bold' }}/>
                </div>
                <div className="input-group">
                    <label htmlFor="surcharge">Surcharge</label>
                    <input type="text" id="surcharge" name="surcharge" readOnly value={tax} style={{ backgroundColor:' #a8dea8', fontWeight: 'bold' }}/>
                </div>
                <div className="input-group">
                    <label htmlFor="total">Total (USD)</label>
                    <input type="text" id="total" name="total" readOnly value={Number(totalCost) + Number(tax)} style={{ backgroundColor:' #a8dea8' , fontWeight: 'bold'}} />
                </div>
                <div style={{ textAlign: 'center' }}>
                <button
                    type="submit"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '15px 23px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >Confirm Order</button>
                    &nbsp; &nbsp;
                    {getButtonMessage()}
                </div>
            </form>
        </div>
    );
}

function OrderPage() {
const { cart, dispatch } = useContext(CartStore);


    // Function to format price as currency
    const formatPrice = (price: number) => {
        return `$${price.toFixed(2)}`;
    };

    return (
        <div className="order-summary-container">
            <h2 style={{  textAlign: 'center', color:'black' }}>Order Summary</h2>
            <div className="order-items">
                {cart.map((item, index) => (
                    <div className="item-details">
                    <div className="order-item" key={index}>
                        <div >
                            <img
                                src={getBookImageUrl(item.book)}
                                alt="Book Oasis Logo"
                                style={{ maxWidth: '100px', height: 'auto' }}
                            />
                        </div>
                        <div className="headings">
                            <span className="item-name">Title: {item.book.title}</span>
                            <span className="item-artist">Author: {item.book.author}</span>
                            <span className="item-quantity">Quantity: {item.quantity}</span>
                        </div>
                            <div className="checkhout-chevron">
                                <button onClick={() => dispatch({ type: CartTypes.REMOVE, item: item.book, id: item.id })}><i className="fas fa-chevron-right"><FontAwesomeIcon icon={faMinusCircle} /></i></button>
                                <div className="item-price">{formatPrice(item.book.price)}</div>
                                <button onClick={() => dispatch({ type: CartTypes.ADD, item: item.book, id: item.id })}><i className="fas fa-chevron-right"><FontAwesomeIcon icon={faPlusCircle} /></i></button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
// function CheckoutPage() {
//     const { cart } = useContext(CartStore);
//     return (
//         <div className="checkout-page-container">
//             {
//                 cart.length > 0
//                     ?
//                     <div >
//                         <PaymentForm />
//                         <OrderPage />
//                     </div>
//                     :   <div >
//                         (<EmptyCart />)
//                     </div>
//             }
//         </div>
//     );
// }
//
// export default CheckoutPage;
function Checkout() {
    const { cart } = useContext(CartStore);
    return (
        <div className="checkout-page-container">
            { cart.length>0 ?
                <div className="align-div">
                    <PaymentForm />
                    <OrderPage />
                </div>
                : <div>
                    (<EmptyCart/>)
                </div>
            }
        </div>
    );
}
export default Checkout;
