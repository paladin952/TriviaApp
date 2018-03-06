import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import api from "./middleswares/api";
import ui from "./reducers/ui";
import questions from "./reducers/questions";
import multi from "./middleswares/multi";
import error from "./middleswares/error";


const store = createStore(
    combineReducers({
        ui,
        questions
    }), compose(
        applyMiddleware(
            api,
            multi,
            error
        )
    )
);

window.store = store;
export default store;