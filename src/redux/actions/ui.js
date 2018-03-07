

import * as actions from "../consts/action-types";
import * as Strings from "../../utils/strings";

export const startNetwork = () => ({
    type: actions.START_NETWORK,
});

export const endNetwork = () => ({
    type: actions.END_NETWORK,
});

export const showGenericError = () => ({
   type: actions.SHOW_GENERIC_ERROR,
});

export const hideGenericError = () => ({
    type: actions.HIDE_GENERIC_ERROR,
});

export const showNetworkError = () => ({
    type: actions.SHOW_NETWORK_ERROR,
});

export const hideNetworkError = () => ({
    type: actions.HIDE_NETWORK_ERROR,
});