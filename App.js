import React, {Component} from 'react';

import {StackNavigator} from 'react-navigation';
import MenuPage from "./src/ui/pages/menu-page";
import QuestionPage from "./src/ui/pages/question-page";
import ResultPage from "./src/ui/pages/result-page";
import {Provider} from "react-redux";
import store from "./src/redux/store";
import colors from "./src/utils/colors";

console.disableYellowBox = true;

const StackNav = StackNavigator({
    Menu: {
        screen: MenuPage, navigationOptions: {
            header: null
        }
    },
    Questions: {
        screen: QuestionPage,
        navigationOptions: {
            headerStyle: {
                backgroundColor: colors.header
            },
            headerTintColor: colors.white,
        }
    },
    ResultPage: {
        screen: ResultPage,
        navigationOptions: {
            header: null
        }
    }
});


const App = () => (
    <Provider store={store}>
        <StackNav/>
    </Provider>
);

export default App;