import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {useContext} from "react";
import {Category} from "../context/CategoryContext";


function HeaderDropdown() {
    const categories = useContext(Category);
  return (
      <div className="header-dropdown">
        <Link to="/categories/Children Book" className="Categories">Categories <FontAwesomeIcon icon={faCaretDown} style={{color: "#ffffff"}} /></Link>
        <ul>
         {categories.map((item) =>
             <li key={item.categoryId}>
                <Link
                    to={`/categories/${item.name}`}
                    onClick={() => localStorage.setItem('lastCat', item.name)}
                >
                 {item.name}</Link>
             </li>)
         }
        </ul>
</div>

)
}
export default HeaderDropdown

