import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams()

    return (
        <Fragment>
            <div className="productDetail">

            </div>
        </Fragment>
    );
};

export default ProductDetail;