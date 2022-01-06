const INITIAL_STATE = {
    id: null,
    username: '',
    email: '',
    role: '',
    status: '',
    cart: []
}
export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log(`DATA DARI ACTION PAYLOAD`, action.payload)
            return { ...state, ...action.payload }
        case "UPDATE_USER_CART":
            console.log(`DATA UPDATE USER CART`, action.payload)
            return { ...state, cart: action.payload }
        
        // case "REGIS_SUCCESS":
        //     console.log(`DATA REGIS`, action.payload)
        //     return { ...state, ...action.payload }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}