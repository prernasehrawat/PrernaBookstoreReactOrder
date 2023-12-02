import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import {useContext} from "react";
import {CartStore} from "../context/CartContext";
import {CartTypes} from "../reducers/CartReducer";

const bookImageFileName =  (book:BookItem) => {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};

function CategoryBookListItem(props:BookItem) {
    const {dispatch } = useContext(CartStore);
    function addToCart(){
        dispatch( {type: CartTypes.ADD,
            item: props,
            id: props.bookId
        });
    }
return (
  // <section className="category-page">

  <li className="book">
      <div className="book-rel">
      <img className="book-image" src={require('../assets/images/books/' + bookImageFileName(props))}  alt="book.title"/>
          { props.isPublic &&
          <button className="read-now-button"> <FontAwesomeIcon icon={faReadme} style={{color: "#ffffff"}} /> Read Now</button>
          }
      </div>
    <div className="book-info">
    <div className="book-info">{props.title }</div>
    <div className="book-info">{ props.author }</div>
    <div className="book-info">${ (props.price ).toFixed(2) }</div>
        <button onClick={addToCart} className="addtocart">Add to Cart</button>

    </div>
  </li>


)
}
export default CategoryBookListItem;
