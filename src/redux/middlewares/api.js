import React from 'react';
import * as actions from "../consts/action-types";
import * as axios from "axios";
import {endNetwork, showGenericError, startNetwork} from "../actions/ui";

const api = ({dispatch, getState}) => next => action => {

    if (action.type !== actions.API) {
        return next(action);
    }

    const {url, success, failure} = action.payload;
    dispatch(startNetwork());
    axios.get(url)
        .then(response => response.data.results)
        .then(data => {
            dispatch(success(data));
            dispatch(endNetwork());
            // dispatch(failure(data));
        })
        .catch(err => {
            dispatch(endNetwork());
            dispatch(failure(err));
        })

};

export default api;
