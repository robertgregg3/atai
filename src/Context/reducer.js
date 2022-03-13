export const initialState = {
    user: null,
    data: [],
    displayName: ''
}

const reducer = (state, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.user,
                displayName: action.displayName
            };
            case "SET_DATA":
                return {
                    ...state,
                    data: action.data
                }
                default:
                    return state;
    }
};

export default reducer;
