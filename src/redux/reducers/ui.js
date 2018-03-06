import * as actions from "../consts/action-types";

let initialState = {
    loading: true
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.START_NETWORK:
            return {...state, loading: true};

        case actions.END_NETWORK:
            return {...state, loading: false};

        case actions.GENERIC_ERROR:
            return {...state, genericError: true};

        default:
            return state;
    }
};

export default uiReducer;