import axios from "axios"
import { API_URL } from "../../helper"

export const getProductAction = (search, minimum, maximum) => {
    console.log("SIUUU",search,minimum,maximum)
    return async (dispatch) => {
        try {
            let res;
            if (search) {
                res = await axios.get(`${API_URL}/products?nama=${search}`)
            } else if (minimum, maximum) {
                res = await axios.get(`${API_URL}/products?harga_gte=${minimum}&harga_lte=${maximum}`)
            } else {
                res = await axios.get(`${API_URL}/products`)
            }
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const sortingProduct = (sort) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/products?_sort=${sort.field}&_order=${sort.sortType}`)
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: res.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}