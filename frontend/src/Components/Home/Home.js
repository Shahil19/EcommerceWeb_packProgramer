import React, { Fragment } from 'react';
import { CgMouse } from "react-icons/cg"
import "./Home.css"
import Product from './Product';
import top1 from "../../ecommerce images/top1.jpg"

const Home = () => {

    const product = {
        name: "Yellow T-shirt",
        price: 2000,
        images: [{ url: top1 }],
        _id: "anfkdnfdk",
        numOfReviews: 4
    }
    return (
        <Fragment>
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h1 className="homeHeading">Featured Products</h1>

            <div className="container" id="container">
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />

                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </Fragment>
    );
};

export default Home;