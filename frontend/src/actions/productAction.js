import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR } from "../constants/productConstant"
import axios from "axios"

export const getAllProduct = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        })

        const { data } = await axios.get("http://localhost:4000/api/v1/products")

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data
        })
    }
}

// Clearing Errors
export const clearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    })
}