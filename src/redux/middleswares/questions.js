import * as actions from "../consts/action-types";
import {incrementCorrectCounter, setAnswer} from "../actions/questions";

const questionsMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    if (action.type === actions.ANSWER_QUESTION) {
        let {index, response, item} = action.payload;

        let correctAnswer = getState().questions.questions[index].correct_answer === "True";
        if (correctAnswer === response) {
            dispatch(setAnswer(item, index, true));
            dispatch(incrementCorrectCounter());
        } else {
            dispatch(setAnswer(item, index, false));
        }
    }

};

export default questionsMiddleware;