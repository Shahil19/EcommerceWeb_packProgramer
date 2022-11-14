import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERROR, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from "../constants/productConstant"

export const productsReducer = (state = { products: ["hh"] }, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount
            }

        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
                ...state
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
};


export const productDetailReducer = () => async (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                loading: true
            }

        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }

        case PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return {
                ...state
            }
    }
}