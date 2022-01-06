const INITIAL_STATE = {
    articleList: []
}
export const articleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case "UPDATE_ARTICLE":
            console.log("DATA ARTICLE USER REDUCER",action.payload)
            return { ...state, articleList: action.payload }
        default:
            return state
    }
}