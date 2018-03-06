import React from 'react';
import {connect} from "react-redux";
import {ScrollView, Text, View} from "react-native";
import {Button} from "native-base";
import {NavigationActions} from 'react-navigation'
import * as questionActions from "../../redux/actions/questions";

class ResultPage extends React.Component {

    render() {
        return (
            <ScrollView>
                <Text>
                    {Strings.t('you_scored', {score: this.props.score, numberOfQuestions: this.props.numberOfQuestions})}
                </Text>

                {this.props.answered}

                <Button rounded
                        style={styles.button}
                        onPress={() => {
                            this.props.reset();
                            this.props.navigation.dispatch(NavigationActions.reset(
                                {
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({routeName: 'Details'})
                                    ]
                                }));
                        }}
                >
                    <Text>{Strings.t('menu_begin_button')}</Text>
                </Button>
            </ScrollView>
        );
    }

}


const mapStateToProps = state => {
    return {
        loading: state.ui.loading,
        genericError: state.ui.genericError,
        answered: state.questions.answered,
        correctCounter: state.questions.correctCounter
    }
};
const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(questionActions.reset())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);