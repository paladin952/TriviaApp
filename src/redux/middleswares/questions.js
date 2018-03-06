import * as actions from "../consts/action-types";
import {incrementCorrectCounter, setAnswer, setCurrentIndex} from "../actions/questions";

const questionsMiddleware = ({dispatch, getState}) => next => action => {
    if (action.type !== actions.ANSWER_QUESTION) {
        return next(action);
    }

    let {index, response, item} = action.payload;

    let questions = getState().questions.questions;
    let correctAnswer = questions[index].correct_answer === "True";
    if (correctAnswer === response) {
        dispatch(setAnswer(item, index, true));
        dispatch(incrementCorrectCounter());
    } else {
        dispatch(setAnswer(item, index, false));
    }
    if (index < questions.length - 1) {
        console.warn("hereeee", index);
        dispatch(setCurrentIndex(index + 1))
    }
};

export default questionsMiddleware;