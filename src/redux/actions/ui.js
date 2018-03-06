

import * as actions from "../consts/action-types";
import * as Strings from "../../utils/strings";

export const startNetwork = () => ({
    type: actions.START_NETWORK,
});

export const endNetwork = () => ({
    type: actions.END_NETWORK,
});

export const showGenericError = () => ({
   type: actions.GENERIC_ERROR,
    payload: {
       title: Strings.t('generic_error'),
        actionButton: {
           title: Strings.t('retry'),
            onPress: () => {
            },
        }
    }
});