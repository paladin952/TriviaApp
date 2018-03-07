import React from 'react';
import * as actions from "../consts/action-types";
import axios from "axios";
import {endNetwork, hideGenericError, hideNetworkError, showGenericError, showNetworkError, startNetwork} from "../actions/ui";

const api = ({dispatch, getState}) => next => action => {

    if (action.type !== actions.API) {
        return next(action);
    }

    const {url, success, failure, method, data} = action.payload;
    dispatch(startNetwork());
    dispatch(hideGenericError());
    dispatch(hideNetworkError());
    axios({
        url: url,
        method: method,
        data: data
    })
        .then(response => response.data.results)
        .then(data => {
            dispatch(success(data));
            dispatch(endNetwork());
        })
        .catch(err => {
            dispatch(failure(err));
            dispatch(endNetwork());
        })

};

export default api;
