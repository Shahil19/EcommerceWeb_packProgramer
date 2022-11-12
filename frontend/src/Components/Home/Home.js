import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg"
import "./Home.css"
import Product from './Product';
import top1 from "../../ecommerce images/top1.jpg"
import MetaData from '../Layout/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from '../../actions/productAction';
import Loader from '../Layout/Loader/Loader';

const Home = () => {
    const dispatch = useDispatch()
    const { products, loading, productCount } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllProduct())
    }, [dispatch])

    return (
        <Fragment>
            {
                loading ? <Loader /> : <Fragment>

                    {/*------- page Title ---------*/}
                    <MetaData title="Home page" />

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

                        {
                            products && products.map(product => (
                                <Product
                                    key={product._id}
                                    product={product} />
                            ))
                        }
                    </div>
                </Fragment>
            }
        </Fragment>
    );
};

export default Home;