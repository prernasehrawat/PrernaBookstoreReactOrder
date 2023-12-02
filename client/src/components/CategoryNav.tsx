import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import {Link, useParams} from "react-router-dom";
import {useContext, useState} from "react";
import {Category} from "../context/CategoryContext";

function CategoryNav() {
    const {id} = useParams();
    const categories = useContext(Category);
  return (
  <nav className="category-column">
    {/*<section className="category-nav">*/}
        <div className="categories-color" style={{ marginTop: "10px", marginBottom: "10px", paddingTop: "10px", paddingBottom: "10px"}}>CATEGORIES</div>
          {
              categories.length>0 && categories.map((item) => (
                  <div key={item.categoryId} className="categories">
                      <Link
                          to={`/categories/${item.name}`}
                          className={item.name === id ? 'active' : ''}
                          onClick={() => localStorage.setItem('lastCat', item.name)}
                      >
                          {item.name}
                      </Link>
                  </div>
              ))
          }

  </nav>
)
}

export default CategoryNav;

