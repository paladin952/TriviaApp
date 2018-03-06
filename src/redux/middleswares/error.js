import React from 'react';
import * as actions from "../consts/action-types";
// import Snackbar from 'react-native-snackbar';

const api = ({dispatch, getState}) => next => action => {

    // if (action.type !== actions.GENERIC_ERROR) {
        return next(action);
    // }
    // a.a;
    // let {title, actionButton} = action.payload;
    // Snackbar.show({
    //     title: title,
    //     duration: Snackbar.LENGTH_INDEFINITE,
    //     actionButton
    // });

};

export default api;