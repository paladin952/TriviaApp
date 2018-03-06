import React from 'react';
import {connect} from "react-redux";
import {ScrollView, Text, View} from "react-native";
import {Button} from "native-base";
import {NavigationActions} from 'react-navigation'

class ResultPage extends React.Component {

    render() {
        let questionsRows = [];

        return (
            <ScrollView>
                <Text>
                    {Strings.t('you_scored', {score: this.props.score, numberOfQuestions: this.props.numberOfQuestions})}
                </Text>

                {questionsRows}

                <Button rounded
                        style={styles.button}
                        onPress={() => {
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
        genericError: state.ui.genericError
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchQuestions: () => dispatch(actions.fetchQuestions())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);