import * as actions from "../consts/action-types";
import * as Constants from "../../utils/constants";
import {showGenericError} from "./ui";

export const fetchQuestions = () => ({
    type: actions.API,
    payload: {
        url: Constants.SERVER_API,
        method: 'GET',
        success: (questions) => {
            return setQuestions(questions)
        },
        failure: (err) => {
            return showGenericError()
        }

    }
});

export const setQuestions = (payload) => ({
    type: actions.SET_QUESTIONS,
    payload: payload
});