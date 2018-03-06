import * as actions from "../consts/action-types";

let initialData = {questions: [], answered: [], correctCounter: 0};

const questionsReducer = (state = initialData, action) => {
    switch (action.type) {
        case actions.SET_QUESTIONS:
            return {...state, questions: action.payload};

        case actions.SET_ANSWER:
            return {...state, answered: [...state.answered, action.payload]};

        case actions.INCREMENT_CORRECT_COUNTER:
            console.warn('INCREMENT_CORRECT_COUNTER', state.answered);
            return {...state, correctCounter: state.correctCounter + 1};

        case action.RESET:
            return {...state, answered: [], correctCounter: 0};

        default:
            return state;
    }
};

export default questionsReducer;