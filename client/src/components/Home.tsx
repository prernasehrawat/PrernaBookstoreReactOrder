
// import '../assets/css/global.css';

import '../assets/css/Home.css';
import image1 from '../assets/images/books/rich.jpeg';
import image2 from '../assets/images/books/atomic habit.jpeg';
import image3 from '../assets/images/books/scrt1.jpg';
import {Link} from "react-router-dom";
import {CatProp} from "../types";


function Home(props: CatProp ) {
    return (
        <div className="middle-section" style={{background:"black"}}>
            <div className="middle-left">
                <div className="bestseller-image">
                {/*<HomeCategoryList />*/}
                <img src={image1}
                    alt="Rich Dad Poor Dad"
                    width="190px"
                    height="230px"
                     className="image-transition"
                />
                <img src={image2}
                    alt="Atomic Habits"
                    width="190px"
                    height="230px"
                     className="image-transition"
                />
                <img src={image3}
                    alt="Secret"
                    width="190px"
                    height="230px"
                     className="image-transition"
                />
                </div>
                <div className="left-write-up-best" style={{color: "white"}}>
                    <p>Our Best Sellers</p>
                </div>
                <div className="left-write-up-discover" style={{color: "white", fontSize: "23px"}}>
                    <p>Discover, Dream and Dive into a Book</p>
                </div>
            </div>
            <section className="middle-right" style={{color: "white"}}>
            <div className="welcome-text">
                <h3>Welcome to Book Oasis</h3>
                <h5>New Ways  to Explore Books</h5>
                <h5>Read Reviews, Find New Books, Collect Quotes</h5>
                <h5>Take some time and explore the code.</h5>
            </div>
            <div className="shop-now">
                <button className="shop-now-button"><Link to={`/categories/${props.catList.length > 0 ? props.catList[0].name : 'Fiction'}`}>SHOP NOW!</Link></button>
            </div>

            </section>

        </div>
    )
}


export default Home;


