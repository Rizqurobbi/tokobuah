const INITIAL_STATE = {
    product: []
}

export const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_PRODUCTS":
            console.log("cek product", action.payload)
            return { ...state, product: action.payload };
        default:
            return state;
    }
}