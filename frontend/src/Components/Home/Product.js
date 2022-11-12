import React from 'react';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
    const { name, price, images, numOfReviews } = product

    const options = {
        edit: false,
        value: product.ratings,
        size: window.innerWidth < 600 ? 20 : 15,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        isHalf: true
    };


    return (
        <Link className='productCard' to={product._id}>
            <img src={images} alt="" />

            <p>{name}</p>
            <div>
                <ReactStars {...options} />{" "}
                <span className="productCardSpan">
                    {" "}
                    ({numOfReviews} Reviews)
                </span>
            </div>
            <span>{`₹${price}`}</span>
        </Link>
    );
};

export default Product;