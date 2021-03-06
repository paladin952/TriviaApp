import * as actions from "../consts/action-types";
import * as Constants from "../../utils/constants";
import {showGenericError, showNetworkError} from "./ui";

export const fetchQuestions = () => ({
    type: actions.API,
    payload: {
        url: Constants.SERVER_API,
        method: 'GET',
        success: (questions) => {
            return setQuestions(questions)
        },
        failure: (err) => {
            if(!err.status) {
                return showNetworkError();
            } else {
                return showGenericError()
            }
        }

    }
});

export const setQuestions = (payload) => ({
    type: actions.SET_QUESTIONS,
    payload: payload
});

export const answer = (response, item, index) => ({
    type: actions.ANSWER_QUESTION,
    payload: {
        item: item,
        response: response,
        index: index
    }
});

export const setAnswer = (item, index, isCorrect) => ({
    type: actions.SET_ANSWER,
    payload: {
        item: item,
        isCorrect: isCorrect,
        index: index
    }
});

export const incrementCorrectCounter = () => ({
    type: actions.INCREMENT_CORRECT_COUNTER,
});

export const reset = () => ({
    type: actions.RESET,
});

export const setCurrentIndex = (index) => ({
    type: actions.SEW_CURRENT_INDEX,
    payload: index
});