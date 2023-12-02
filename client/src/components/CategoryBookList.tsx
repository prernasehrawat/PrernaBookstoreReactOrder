import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import { BookItem } from "../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function CategoryBookList() {
    const {id} = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        api.get(`/categories/name/${id}/books`)
            .then(response => setBooks(response.data))
            .catch(err => console.error(err)); // .catch(console.error)- shortcut
    }, [id]);
  return (
      <div className="category-page">
          <CategoryNav />
          <ul className="book-boxes">
              {books.map((book:BookItem) => (
                  <CategoryBookListItem
                      key={book.bookId}
                      bookId={book.bookId}
                      isPublic={book.isPublic}
                      price={book.price}
                      title={book.title}
                      author={book.author}
                      categoryId={book.categoryId}
                      description={book.description}
                      isFeatured={book.isFeatured}
                      rating={book.rating}
                  />)
              )}
          </ul>
      </div>
)
}
export default CategoryBookList;
