import * as actions from "../consts/action-types";

let initialData = {questions: []};

const questionsReducer = (state = initialData, action) => {
    switch (action.type) {
        case actions.SET_QUESTIONS:
            console.warn('in reducer', action.payload);
            return {...state, questions: action.payload};

        default:
            return state;
    }
};

export default questionsReducer;