import * as actions from "../consts/action-types";

let initialState = {
    loading: true,
    genericError: false,
    networkError: false
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.START_NETWORK:
            return {...state, loading: true};

        case actions.END_NETWORK:
            return {...state, loading: false};

        case actions.SHOW_GENERIC_ERROR:
            return {...state, genericError: true};

        case actions.HIDE_GENERIC_ERROR:
            return {...state, genericError: false};

        case actions.SHOW_NETWORK_ERROR:
            return {...state, networkError: true};

        case actions.HIDE_NETWORK_ERROR:
            return {...state, networkError: false};


        default:
            return state;
    }
};

export default uiReducer;