import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"
import { useContext, useEffect } from "react";
import {CategoryItem} from "./types";
import {Category} from "./context/CategoryContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";

function App() {
    const categories: CategoryItem[] = useContext<CategoryItem[]>(Category);
    const lastCat = localStorage.getItem('lastCat');

    useEffect(() => {
        if (!lastCat) {
            localStorage.setItem('lastCat', categories.length > 0 ? categories[0].name : 'Children Book');
        }
    }, [categories, lastCat]);

    return (
        <Router basename={"/PrernaBookstoreReactOrder"}>
            <AppHeader/>
            <Routes>
                <Route path="/" element={<Home catList={categories}/>}/>
                <Route path="/categories" element={<CategoryBookList/>}>
                    <Route path=":id" element={<CategoryBookList/>}/>
                </Route>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="*" element={<div>Page Not Found</div>}/>
            </Routes>
            <AppFooter/>

        </Router>
    );
}
export default App;