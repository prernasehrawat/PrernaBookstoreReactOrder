import {createContext, ReactNode, useEffect, useState} from "react";
import {CategoryItem} from "../types";
import api from "../services/api";


export const Category = createContext<CategoryItem[] | []>([]);   // creates a context called Category
Category.displayName = 'CategoryContext';


interface CategoryContextProps{
    children: ReactNode;

}
function CategoryContext ({ children }: CategoryContextProps)  {
    // cut/paste the categories code here from the App component
    const [categories, setCategories]  = useState([]);

    useEffect(() => {
        api.get('/categories')
            .then((response ) => setCategories(response.data))
            .catch((error) => console.log (error))
    }, []);


    return (
        <Category.Provider value ={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;